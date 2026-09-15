#define ANIM_SPEED 0.025
#define PIXEL_COUNT 480.0
#define BUMP_FACTOR 0.001
 
uniform float time;
uniform vec3 res;
uniform float yOffset;
uniform vec3 defaultCol;

vec3 permute(vec3 pt) {
    return mod(((pt*34.0)+1.0)*pt, 289.0);
}

float simplex(vec2 pt) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,-0.577350269189626, 0.024390243902439);
    vec2 i       = floor(pt + dot(pt, C.yy));
    vec2 x0      = pt - i + dot(i, C.xx);
    vec2 i1      = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12     = x0.xyxy + C.xxzz - vec4(i1, 0.0, 0.0);
    i = mod(i, 289.0);
    
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m*m*m*m;
    
    vec3 x  = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

vec2 warp(vec2 pt) {
    vec2 o;
    float S = 0.0;
    
    for (int i = 0; i < 4; i++) {
        float X = pow(2.0, -float(i+1));
        S += X;
        o += simplex(pt + time * ANIM_SPEED);
        o += cos(pt.yx*3.0 + vec2(time*ANIM_SPEED*2.0, 1.57))/3.0 + sin(pt.yx + time*ANIM_SPEED*2.0 + vec2(1.57, 0.0))/2.0;
        pt = mat2(0.8, 0.6, -0.6, 0.8)*pt*2.0;
    }
    o /= S;
    return mod(o, 2.0) - 1.0;
}

float bump(vec2 pt) {
    return length(warp(pt))*0.7071;
}

vec3 smoothFract(vec3 x) {
    x = fract(x);
    return min(x, x*(1.0-x)*12.0);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5*res.xy) / res.y;
    uv = floor(uv * PIXEL_COUNT) / PIXEL_COUNT;
    vec3 surfacePos = vec3(uv, 0.0);
    vec3 rayOrigin  = normalize(vec3(uv, 1.0));
    vec3 lightPos   = vec3(0.0, -1.0, -1.0);
    vec3 normal     = vec3(0.0, 0.0, -1.0);
    vec2 epsilon    = vec2(5.0/res.y, 0.0);

    float f  = bump(surfacePos.xy + vec2(0.0, yOffset));
    float fx = (bump(surfacePos.xy - epsilon.xy + vec2(0.0, yOffset)) - f)/epsilon.x;
    float fy = (bump(surfacePos.xy - epsilon.yx + vec2(0.0, yOffset)) - f)/epsilon.x;

    normal = normalize(normal + vec3(fx, fy, 0.0)*BUMP_FACTOR);
    
    vec3 lightDir   = lightPos - surfacePos;
    float lightDist = max(length(lightDir), 0.0001);
    lightDir /= lightDist;
    float diffuse  = max(dot(normal, lightDir), 0.0);
    float specular = pow(max(dot(reflect(-lightDir, normal), -rayOrigin), 0.0), 8.0);
    vec3 texCol    = smoothFract(warp(surfacePos.xy + vec2(0.0, yOffset)).xyy) * 0.1 + 0.2;
    diffuse = pow(diffuse, 2.0) * 0.667 + pow(diffuse, 8.0) * 0.333;

    vec3 col = texCol*(diffuse*defaultCol*16.0 + 0.5) + vec3(0.2, 0.6, 1.0)*specular*2.0;
    gl_FragColor = vec4(sqrt(clamp(col, 0.0, 1.0)), 1.0);
}