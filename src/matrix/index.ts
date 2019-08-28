type Mat4 = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number,
  number, number, number, number
];

type Vec4 = [number, number, number, number];

class Vector4 {
  elements: Float32Array;
  constructor(vec4: Vec4) {
    this.elements = new Float32Array(vec4);
  }
}

class Matrix4 {
  private elements: Float32Array;
  private constructor(mat4: Mat4) {
    this.elements = new Float32Array(mat4);
  }

  create(mat4: Mat4) {
    return new Matrix4(mat4);
  }

  copy() {
    return new Matrix4(Array.from(this.elements) as Mat4);
  }

  indentity() {
    this.elements[0] = 1;
    this.elements[1] = 0;
    this.elements[2] = 0;
    this.elements[3] = 0;
    this.elements[4] = 0;
    this.elements[5] = 1;
    this.elements[6] = 0;
    this.elements[7] = 0;
    this.elements[8] = 0;
    this.elements[9] = 0;
    this.elements[10] = 1;
    this.elements[11] = 0;
    this.elements[12] = 0;
    this.elements[13] = 0;
    this.elements[14] = 0;
    this.elements[15] = 1;
    return this;
  }

  multiply(mat4: Mat4) {
    const a = this.elements;
    const b = new Float32Array(mat4);

    this.elements[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
    this.elements[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
    this.elements[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
    this.elements[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

    this.elements[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
    this.elements[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
    this.elements[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
    this.elements[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

    this.elements[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
    this.elements[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
    this.elements[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
    this.elements[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

    this.elements[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
    this.elements[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
    this.elements[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
    this.elements[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];

    return this;
  }

  multiplyVecotor4 = (vec4: Vec4) => {
    const a = this.elements;
    const b = new Float32Array(vec4);
    const result: Vec4 = [0, 0, 0, 0];
    result[0] = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    result[1] = a[4] * b[0] + a[5] * b[1] + a[6] * b[2] + a[7] * b[3];
    result[2] = a[8] * b[0] + a[9] * b[1] + a[10] * b[2] + a[11] * b[3];
    result[3] = a[12] * b[0] + a[13] * b[1] + a[14] * b[2] + a[15] * b[3];
    return new Vector4(result);
  }

  static setScale = (sx: number, sy: number, sz: number) => {
    return new Float32Array([
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, sz, 0,
      0, 0, 0, 1
    ]);
  }

  scale = (sx: number, sy: number, sz: number) => {
    this.elements[0] *= sx;
    this.elements[1] *= sx;
    this.elements[2] *= sx;
    this.elements[3] *= sx;

    this.elements[4] *= sy;
    this.elements[5] *= sy;
    this.elements[6] *= sy;
    this.elements[7] *= sy;

    this.elements[8] *= sz;
    this.elements[9] *= sz;
    this.elements[10] *= sz;
    this.elements[11] *= sz;

    return this;
  }

  static setTranslate = (tx: number, ty: number, tz: number) => {
    return new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      tx, ty, tz, 1
    ]);
  }

  translate = (tx: number, ty: number, tz: number) => {
    const a = this.elements;
    this.elements[12] += a[0] * tx + a[4] * ty + a[8] * tz;
    this.elements[13] += a[1] * tx + a[5] * ty + a[9] * tz;
    this.elements[14] += a[2] * tx + a[6] * ty + a[10] * tz;
    this.elements[15] += a[3] * tx + a[7] * ty + a[11] * tz;
    return this;
  }
}