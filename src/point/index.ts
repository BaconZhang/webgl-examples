import { initShaders } from "../util";
import vShader from "./vertex.glsl";
import fShader from './fragment.glsl';

export const point = (
  ctx: WebGLRenderingContext,
  x: number,
  y: number,
  color: [number, number, number, number]
) => {
  const program = initShaders(ctx, vShader, fShader);

  const a_Position = ctx.getAttribLocation(program, "a_Position");
  ctx.vertexAttrib3f(a_Position, x, y, 0.0);

  const a_PointSize = ctx.getAttribLocation(program, "a_PointSize");
  ctx.vertexAttrib1f(a_PointSize, 10);

  const u_FragColor = ctx.getUniformLocation(program, "u_FragColor");

  if (u_FragColor) {
    ctx.uniform4f(u_FragColor, ...color);
  }

  ctx.drawArrays(ctx.POINTS, 0, 1);
};

export const multiplePoints = (
  ctx: WebGLRenderingContext,
  points: {
    x: number,
    y: number,
    color: [number, number, number, number]
  }[],
) => {
  const program = initShaders(ctx, vShader, fShader);

  const vertices = new Float32Array(
    points.map(i => [i.x, i.y, ...i.color]).reduce((a, b) => a.concat(b), [])
  );
  const vertexBuffer = ctx.createBuffer();
  if (vertexBuffer) {
    ctx.bindBuffer(ctx.ARRAY_BUFFER, vertexBuffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, vertices, ctx.STATIC_DRAW);
  }

  const a_Position = ctx.getAttribLocation(program, "a_Position");
  ctx.vertexAttribPointer(a_Position, 2, ctx.FLOAT, false, 6 * vertices.BYTES_PER_ELEMENT, 0);
  ctx.enableVertexAttribArray(a_Position);

  const a_Color = ctx.getAttribLocation(program, "a_Color");
  ctx.vertexAttribPointer(a_Color, 4, ctx.FLOAT, false, 6 * vertices.BYTES_PER_ELEMENT, 2 * vertices.BYTES_PER_ELEMENT);
  ctx.enableVertexAttribArray(a_Color);

  const a_PointSize = ctx.getAttribLocation(program, "a_PointSize");
  ctx.vertexAttrib1f(a_PointSize, 10);

  ctx.drawArrays(ctx.POINTS, 0, points.length);
}
