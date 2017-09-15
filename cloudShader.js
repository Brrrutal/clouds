CloudShader = 
{
    vertexShader: `
        precision highp float;
        varying vec2 vUv;
        varying vec3 wsNormal;
        varying vec3 wsLightPosition;
        varying float fadeOff;
        uniform vec3 lightPosition;
        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
            vec3 I = worldPos.xyz - cameraPosition;
            fadeOff = abs(dot( normalize( I ), worldNormal ));
            vUv = uv;
            wsNormal = worldNormal;
            wsLightPosition = normalize(lightPosition);
        }
    `,

    fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        varying vec3 wsNormal;
        varying vec3 wsLightPosition;
        varying float fadeOff;
        uniform float intensity;
        uniform sampler2D normalMap;

        void main()
        {
            vec3 wsNormal2 = texture2D(normalMap, vUv).xyz;
            float shading = max(dot(wsNormal2, wsLightPosition), 0.0);
            vec3 color = vec3(shading, shading, shading);
            
            vec2 uv = vUv - vec2(0.5, 0.5);
            float dist = 1.0 - step(0.5, sqrt(dot(uv, uv)));
            gl_FragColor = vec4(color, dist * fadeOff);
        }
    `
};

