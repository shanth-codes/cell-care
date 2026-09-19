/**
 * CELL CARE - Apple Precision Interactive Liquid Logo Engine
 * High-Contrast Liquid Titanium & Silver Chrome Physics
 * Adapted from collidingScopes/liquid-logo
 */

(function () {
    'use strict';

    const canvas = document.getElementById('liquid-apple-canvas');
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
        antialias: true,
        alpha: true,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        premultipliedAlpha: false,
        powerPreference: "high-performance"
    });

    if (!gl) {
        console.warn('WebGL not supported');
        return;
    }

    const vsSource = `
        attribute vec2 aVertexPosition;
        void main() {
            gl_Position = vec4(aVertexPosition, 0.0, 1.0);
        }
    `;

    const fsSource = `
        precision highp float;

        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform float u_mouseStrength;

        // collidingScopes parameters
        uniform float u_speed;
        uniform float u_iterations;
        uniform float u_scale;
        uniform float u_dotFactor;
        uniform float u_vOffset;
        uniform float u_intensityFactor;
        uniform float u_expFactor;
        uniform vec3 u_colorFactors;
        uniform float u_colorShift;
        uniform float u_dotMultiplier;
        uniform float u_noiseIntensity;

        uniform sampler2D u_logoTexture;
        uniform float u_logoScale;
        uniform float u_logoInteractStrength;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

        float snoise(vec3 v) {
            const vec2 C = vec2(1.0/6.0, 1.0/3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

            vec3 i  = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);

            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);

            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;

            i = mod289(i);
            vec4 p = permute(permute(permute(
                      i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;

            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);

            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);

            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);

            vec4 s0 = floor(b0) * 2.0 + 1.0;
            vec4 s1 = floor(b1) * 2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));

            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);

            vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;

            vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }

        float detectEdges(vec2 uv, float threshold) {
            float dx = 1.5 / u_resolution.x;
            float dy = 1.5 / u_resolution.y;
            
            vec4 center = texture2D(u_logoTexture, uv);
            vec4 left = texture2D(u_logoTexture, uv - vec2(dx, 0.0));
            vec4 right = texture2D(u_logoTexture, uv + vec2(dx, 0.0));
            vec4 top = texture2D(u_logoTexture, uv - vec2(0.0, dy));
            vec4 bottom = texture2D(u_logoTexture, uv + vec2(0.0, dy));
            
            float diff = length(center - left) + length(center - right) + 
                         length(center - top) + length(center - bottom);
            return smoothstep(0.0, threshold, diff);
        }

        vec4 liquidMetalEffect(vec4 color, float edge, float time) {
            float highlight = pow(0.5 + 0.5 * sin(time * 0.8 + edge * 6.0), 8.0) * edge;
            vec4 metallic = vec4(
                color.r + highlight * 0.45,
                color.g + highlight * 0.38,
                color.b + highlight * 0.52,
                color.a
            );
            return clamp(metallic, 0.0, 1.0);
        }

        void main() {
            vec2 r = u_resolution;
            vec2 FC = gl_FragCoord.xy;
            float time = u_time * u_speed;

            vec2 uv = FC.xy / r;
            vec2 logoUV = (uv - 0.5) / u_logoScale + 0.5;
            logoUV.y = 1.0 - logoUV.y;

            if (logoUV.x < 0.0 || logoUV.x > 1.0 || logoUV.y < 0.0 || logoUV.y > 1.0) {
                discard;
            }

            vec4 logoColor = texture2D(u_logoTexture, logoUV);
            if (logoColor.a < 0.15) {
                discard;
            }

            float edge = detectEdges(logoUV, 0.22) * u_logoInteractStrength;

            vec2 p = (FC.xy * 2.0 - r) / r.y;
            vec2 l = vec2(0.0);
            float dotP = dot(p, p);
            l.x += abs(u_dotFactor - dotP) * u_dotMultiplier;

            float edgeInfluence = edge * 18.0;
            vec2 v = p * (1.0 - l.x) / u_scale;
            v += vec2(sin(edge * 10.0), cos(edge * 8.0)) * edgeInfluence;

            // Interactive mouse ripple
            vec2 mouseNorm = (u_mouse * 2.0 - r) / r.y;
            mouseNorm.y = -mouseNorm.y;
            float distMouse = length(p - mouseNorm);
            vec2 mouseRipple = normalize(p - mouseNorm + 0.0001) * exp(-distMouse * 3.5) * u_mouseStrength;
            v += mouseRipple * 0.8;

            float flowNoise = snoise(vec3(p * 2.2, time * 0.15)) * u_noiseIntensity;
            v += vec2(flowNoise, flowNoise * 0.7);

            vec4 o = vec4(0.0);
            for (float i = 0.0; i < 16.0; i++) {
                if (i >= u_iterations) break;
                float idx = i + 1.0;
                vec2 offset = cos(v.yx * idx + vec2(0.0, idx) + time) / idx + u_vOffset;
                if (edge > 0.08) {
                    offset *= 1.0 + edge * 3.5;
                }
                v += offset;
                o += (sin(vec4(v.x, v.y, v.y, v.x)) + 1.0) * abs(v.x - v.y) * u_intensityFactor;
            }

            if (u_colorShift > 0.0) {
                o = o.wxyz * u_colorShift + o * (1.0 - u_colorShift);
            }

            // Liquid wave field for organic fluid surface motion
            float wave = 0.5 + 0.5 * (sin(v.x * 2.2 + time * 0.9) * cos(v.y * 1.8 - time * 0.7));
            
            // Dynamic mouse ripple pulse
            float mouseWave = sin(distMouse * 16.0 - time * 5.0) * exp(-distMouse * 3.5) * u_mouseStrength;
            wave = clamp(wave + mouseWave * 0.35, 0.0, 1.0);

            // High-End Liquid Silver Chrome Palette (Liquid Mercury / Polished Apple Metal)
            vec3 deepChrome     = vec3(0.20, 0.22, 0.26);   // Deep mercury shadow - crisp silhouette contrast
            vec3 liquidSilver   = vec3(0.68, 0.72, 0.78);   // Sleek metallic silver midtones
            vec3 platinumSilver = vec3(0.88, 0.92, 0.97);   // Brilliant platinum fluid gleam
            vec3 specularPeak   = vec3(1.00, 1.00, 1.00);   // Pure mirror chrome crest reflection

            // Smooth transition from deep chrome shadow to polished silver
            vec3 finalRgb = mix(deepChrome, liquidSilver, smoothstep(0.12, 0.85, wave));

            // Fluid specular liquid reflection across the ripples
            float specular = pow(wave, 4.0);
            finalRgb += platinumSilver * (specular * 0.50);

            // Precision specular glint on sharpest fluid crests
            float glint = pow(wave, 12.0);
            finalRgb += specularPeak * (glint * 0.40);

            // Razor-sharp 3D metallic chrome contour bevel around Apple logo silhouette
            float rim = pow(edge, 1.6);
            finalRgb += vec3(0.85, 0.90, 0.98) * (rim * 0.55);

            gl_FragColor = vec4(clamp(finalRgb, 0.0, 1.0), logoColor.a);
        }
    `;

    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1.0,  1.0,
         1.0,  1.0,
        -1.0, -1.0,
         1.0, -1.0,
    ]), gl.STATIC_DRAW);

    const aVertexPositionLocation = gl.getAttribLocation(program, 'aVertexPosition');

    const uniforms = {
        resolution: gl.getUniformLocation(program, 'u_resolution'),
        time: gl.getUniformLocation(program, 'u_time'),
        mouse: gl.getUniformLocation(program, 'u_mouse'),
        mouseStrength: gl.getUniformLocation(program, 'u_mouseStrength'),
        speed: gl.getUniformLocation(program, 'u_speed'),
        iterations: gl.getUniformLocation(program, 'u_iterations'),
        scale: gl.getUniformLocation(program, 'u_scale'),
        dotFactor: gl.getUniformLocation(program, 'u_dotFactor'),
        vOffset: gl.getUniformLocation(program, 'u_vOffset'),
        intensityFactor: gl.getUniformLocation(program, 'u_intensityFactor'),
        expFactor: gl.getUniformLocation(program, 'u_expFactor'),
        colorFactors: gl.getUniformLocation(program, 'u_colorFactors'),
        colorShift: gl.getUniformLocation(program, 'u_colorShift'),
        dotMultiplier: gl.getUniformLocation(program, 'u_dotMultiplier'),
        noiseIntensity: gl.getUniformLocation(program, 'u_noiseIntensity'),
        logoTexture: gl.getUniformLocation(program, 'u_logoTexture'),
        logoScale: gl.getUniformLocation(program, 'u_logoScale'),
        logoInteractStrength: gl.getUniformLocation(program, 'u_logoInteractStrength')
    };

    // Refined Liquid Silver Chrome Preset
    const currentPreset = {
        name: 'Liquid Silver Chrome',
        speed: 0.45,
        iterations: 14,
        scale: 2.6,
        dotFactor: 0.04,
        vOffset: 5.1,
        intensityFactor: 0.08,
        expFactor: 0.25,
        redFactor: 0.8,
        greenFactor: 0.6,
        blueFactor: 0.7,
        colorShift: 0.0,
        dotMultiplier: 0.22,
        noiseIntensity: 1.1,
        logoScale: 0.88,
        logoInteractStrength: 0.45
    };

    // Texture handling
    let logoTexture = null;
    let isTextureLoaded = false;

    function createSquareTexture(image) {
        const origW = image.width;
        const origH = image.height;
        const aspect = origW / origH;

        const maxDim = 1024;
        let targetW, targetH;
        if (origW >= origH) {
            targetW = Math.min(origW, maxDim);
            targetH = Math.round(targetW / aspect);
        } else {
            targetH = Math.min(origH, maxDim);
            targetW = Math.round(targetH * aspect);
        }

        targetW = Math.max(Math.floor(targetW / 4) * 4, 4);
        targetH = Math.max(Math.floor(targetH / 4) * 4, 4);

        const squareSize = Math.ceil(Math.max(targetW, targetH) / 4) * 4;
        const offsetX = Math.floor((squareSize - targetW) / 2);
        const offsetY = Math.floor((squareSize - targetH) / 2);

        const offCanvas = document.createElement('canvas');
        offCanvas.width = squareSize;
        offCanvas.height = squareSize;
        const ctx = offCanvas.getContext('2d');
        ctx.clearRect(0, 0, squareSize, squareSize);
        ctx.drawImage(image, offsetX, offsetY, targetW, targetH);

        // Safety clear 3px outer border to prevent any stray edge lines or texture wrapping
        ctx.clearRect(0, 0, squareSize, 3);
        ctx.clearRect(0, squareSize - 3, squareSize, 3);
        ctx.clearRect(0, 0, 3, squareSize);
        ctx.clearRect(squareSize - 3, 0, 3, squareSize);

        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, offCanvas);

        return tex;
    }

    const img = new Image();
    img.onload = function () {
        logoTexture = createSquareTexture(img);
        isTextureLoaded = true;
    };
    img.onerror = function () {
        console.error('Failed to load logo image');
    };

    img.src = window.APPLE_LOGO_DATA_URI || 'assets/apple-logo.png';

    // Interactive mouse / touch handling
    let mouseX = 0;
    let mouseY = 0;
    let mouseStrength = 0;
    let targetStrength = 0;

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
        mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
        targetStrength = 1.0;
    });

    canvas.addEventListener('mouseleave', () => {
        targetStrength = 0.0;
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!e.touches[0]) return;
        const rect = canvas.getBoundingClientRect();
        mouseX = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width);
        mouseY = (e.touches[0].clientY - rect.top) * (canvas.height / rect.height);
        targetStrength = 1.2;
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
        targetStrength = 0.0;
    });

    canvas.addEventListener('click', () => {
        targetStrength = 1.6; // ripple burst on click
    });

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const size = Math.round(canvas.clientWidth * dpr);
        if (size > 0 && (canvas.width !== size || canvas.height !== size)) {
            canvas.width = size;
            canvas.height = size;
            gl.viewport(0, 0, size, size);
        }
    }

    window.addEventListener('resize', resize);
    resize();

    const startTime = performance.now();

    function render() {
        resize();

        if (!isTextureLoaded) {
            requestAnimationFrame(render);
            return;
        }

        const currentTime = (performance.now() - startTime) * 0.001;
        mouseStrength += (targetStrength - mouseStrength) * 0.08;

        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        gl.useProgram(program);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(aVertexPositionLocation);
        gl.vertexAttribPointer(aVertexPositionLocation, 2, gl.FLOAT, false, 0, 0);

        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.time, currentTime);
        gl.uniform2f(uniforms.mouse, mouseX, mouseY);
        gl.uniform1f(uniforms.mouseStrength, mouseStrength);

        gl.uniform1f(uniforms.speed, currentPreset.speed);
        gl.uniform1f(uniforms.iterations, currentPreset.iterations);
        gl.uniform1f(uniforms.scale, currentPreset.scale);
        gl.uniform1f(uniforms.dotFactor, currentPreset.dotFactor);
        gl.uniform1f(uniforms.vOffset, currentPreset.vOffset);
        gl.uniform1f(uniforms.intensityFactor, currentPreset.intensityFactor);
        gl.uniform1f(uniforms.expFactor, currentPreset.expFactor);
        gl.uniform3f(uniforms.colorFactors, currentPreset.redFactor, currentPreset.greenFactor, currentPreset.blueFactor);
        gl.uniform1f(uniforms.colorShift, currentPreset.colorShift);
        gl.uniform1f(uniforms.dotMultiplier, currentPreset.dotMultiplier);
        gl.uniform1f(uniforms.noiseIntensity, currentPreset.noiseIntensity);

        gl.uniform1f(uniforms.logoScale, currentPreset.logoScale);
        gl.uniform1f(uniforms.logoInteractStrength, currentPreset.logoInteractStrength);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, logoTexture);
        gl.uniform1i(uniforms.logoTexture, 0);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
})();
