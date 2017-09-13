CloudShader = 
{
    vertexShader: `
        precision highp float;
        varying vec2 vUv;
        varying vec3 vecNormal;
        varying vec3 vNormal;
        varying float fadeOff;
        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            vec4 worldPos = modelMatrix * vec4(position, 1.0);
            vecNormal = (modelViewMatrix * vec4(normal, 0.0)).xyz;
            vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
            vec3 I = worldPos.xyz - cameraPosition;
            fadeOff = abs(dot( normalize( I ), worldNormal ));
            vUv = uv;
            vNormal = normal;
        }
    `,

    fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        varying vec3 vecNormal;
        varying vec3 vNormal;
        varying float fadeOff;
        uniform float intensity;
        uniform sampler2D normalMap;
        uniform mat4 modelViewMatrix;

        struct PointLight {
            vec3 color;
            vec3 position; // light position, in camera coordinates
            float distance; // used for attenuation purposes. Since
                          // we're writing our own shader, it can
                          // really be anything we want (as long as
                          // we assign it to our light in its
                          // "distance" field
        };
         
        uniform PointLight pointLights[NUM_POINT_LIGHTS];

        void main()
        {
            vec3 lightDirection = vec3(0.0, 0.0, 1.0);
            for(int l = 0; l < NUM_POINT_LIGHTS; l++) 
            {
                lightDirection = normalize(pointLights[l].position);
            }

            vec3 normal = texture2D(normalMap, vUv).xyz;
            vec3 vecNormal2 = (modelViewMatrix * vec4(normal, 0.0)).xyz;
            float shading = abs(dot(lightDirection, vecNormal2));
            
            vec2 uv = vUv - vec2(0.5, 0.5);
            float dist = 1.0 - step(0.5, sqrt(dot(uv, uv)));
            gl_FragColor = vec4(shading, shading, shading, fadeOff * dist);
        }
    `
};

