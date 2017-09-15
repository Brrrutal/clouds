CloudShader = 
{
    vertexShader: `
        precision highp float;
        varying vec2 vUv;
        varying vec3 wsNormal;
        varying vec3 wsLightPosition;
        varying vec3 wsViewDirection;
        varying float fadeOff;
        uniform vec3 lightPosition;
        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
            vec3 I = worldPos.xyz - cameraPosition;
            fadeOff = abs(dot( normalize( I ), worldNormal ));
            fadeOff = pow(fadeOff, 1.5);
            vUv = uv;
            wsNormal = worldNormal;
            wsLightPosition = normalize(lightPosition);
            wsViewDirection = normalize(-I);
        }
    `,

    fragmentShader: `
        #extension GL_OES_standard_derivatives : enable
        precision highp float;
        varying vec2 vUv;
        varying vec3 wsNormal;
        varying vec3 wsLightPosition;
        varying vec3 wsViewDirection;
        varying float fadeOff;
        uniform float intensity;
        uniform sampler2D normalMap;

        mat3 cotangent_frame( vec3 N, vec3 p, vec2 uv )
        {
            // get edge vectors of the pixel triangle
            vec3 dp1 = dFdx( p );
            vec3 dp2 = dFdy( p );
            vec2 duv1 = dFdx( uv );
            vec2 duv2 = dFdy( uv );

            // solve the linear system
            vec3 dp2perp = cross( dp2, N );
            vec3 dp1perp = cross( N, dp1 );
            vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;
            vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;

            // construct a scale-invariant frame 
            float invmax = inversesqrt( max( dot(T,T), dot(B,B) ) );
            return mat3( T * invmax, B * invmax, N );
        }

        void main()
        {
            vec3 normalTex = texture2D(normalMap, vUv).xyz * 2.0 - 1.0;
            mat3 tbn = cotangent_frame(wsNormal, -wsViewDirection, vUv);
            vec3 pnormal = normalize(tbn * normalTex);
            float shading = max(dot(pnormal, wsLightPosition), 0.0);
            vec3 color = vec3(shading, shading, shading);
            
            vec2 uv = vUv - vec2(0.5, 0.5);
            float dist = 1.0 - step(0.5, sqrt(dot(uv, uv)));
            gl_FragColor = vec4(color, dist * fadeOff);
        }
    `
};

