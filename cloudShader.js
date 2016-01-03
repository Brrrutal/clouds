CloudShader = 
{
    vertexShader: 
    [
        "varying vec2 vUv;",
        "void main()",
        "{",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
            "vUv = uv;",
        "}"
    ].join("\n"),

    fragmentShader: 
    [
        "varying vec2 vUv;",
        "uniform float intensity;",
        "void main()",
        "{",
            "vec2 uv = vUv - vec2(0.5, 0.5);",
            "float dist = 1.0 - step(0.5, sqrt(dot(uv, uv)));",
            "gl_FragColor = vec4(intensity, intensity, intensity, dist);",
        "}"
    ].join("\n")
};

