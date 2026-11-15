struct Params {
  res: vec2f,
  mouse: vec2f,
  time: f32,
  ink: vec4f,
  glow: vec4f,
}
@group(0) @binding(0) var<uniform> params: Params;

const PI: f32 = 3.14159265;

fn rotY(a: f32) -> mat3x3f {
  let c = cos(a); let s = sin(a);
  return mat3x3f(vec3f(c, 0.0, -s), vec3f(0.0, 1.0, 0.0), vec3f(s, 0.0, c));
}
fn rotX(a: f32) -> mat3x3f {
  let c = cos(a); let s = sin(a);
  return mat3x3f(vec3f(1.0, 0.0, 0.0), vec3f(0.0, c, s), vec3f(0.0, -s, c));
}

// (3,2) torus knot, the trefoil: two strands winding around a torus.
fn knot(p: vec3f) -> vec2f {
  let a = atan2(p.z, p.x);
  let q = vec2f(length(p.xz) - 1.0, p.y);
  var d = 1e9;
  var phase = 0.0;
  for (var k = 0; k < 2; k++) {
    let ang = (a + 2.0 * PI * f32(k)) * 1.5;
    let c = vec2f(cos(ang), sin(ang)) * 0.42;
    let dk = length(q - c) - 0.15;
    if (dk < d) { d = dk; phase = a + 2.0 * PI * f32(k); }
  }
  return vec2f(d * 0.5, phase);
}

fn scene(p: vec3f) -> vec2f {
  let t = params.time * 0.18;
  let m = rotX(0.55 + params.mouse.y * 0.35) * rotY(t + params.mouse.x * 0.6);
  return knot(m * p);
}

fn normalAt(p: vec3f) -> vec3f {
  let e = vec2f(1.0, -1.0) * 0.0015;
  return normalize(
    e.xyy * scene(p + e.xyy).x + e.yyx * scene(p + e.yyx).x +
    e.yxy * scene(p + e.yxy).x + e.xxx * scene(p + e.xxx).x);
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let aspect = params.res.x / max(params.res.y, 1.0);
  var sp = (uv - 0.5) * 2.0;
  sp.y = -sp.y;
  sp.x *= aspect;
  let ro = vec3f(0.0, 0.0, 4.7);
  let rd = normalize(vec3f(sp, -2.4));

  var dist = 0.0;
  var hit = false;
  var res = vec2f(0.0);
  for (var i = 0; i < 128; i++) {
    res = scene(ro + rd * dist);
    if (res.x < 0.0008) { hit = true; break; }
    dist += res.x;
    if (dist > 8.0) { break; }
  }

  // soft halo behind the knot
  let halo = (1.0 - smoothstep(0.15, 0.95, length(sp))) * 0.09;
  if (!hit) {
    let a = halo * params.glow.a;
    return vec4f(params.glow.rgb * a, a);
  }

  let p = ro + rd * dist;
  let n = normalAt(p);
  let l = normalize(vec3f(0.6, 0.8, 0.5));
  let diff = max(dot(n, l), 0.0);
  let fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
  let spec = pow(max(dot(reflect(-l, n), -rd), 0.0), 28.0);

  // cord bands travelling along the strand, like knots on a khipu cord
  let band = smoothstep(0.82, 0.98, sin(res.y * 14.0 - params.time * 1.4));

  var col = params.ink.rgb * (0.16 + 0.62 * diff);
  col += params.glow.rgb * (fres * 0.85 + band * 0.35);
  col += vec3f(spec * 0.5);
  return vec4f(col, 1.0);
}
