import { initShaders } from "../util";
import vShader from "./vertex.glsl";
import fShader from './fragment.glsl';

export const traingle = (
  ctx: WebGLRenderingContext,
  points: { x: number, y: number }[]
) => {

  const program = initShaders(ctx, vShader, fShader);

  const buffer = ctx.createBuffer();

  if (buffer) {
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
    ctx.bufferData(
      ctx.ARRAY_BUFFER,
      new Float32Array(
        points.map(i => [i.x, i.y]).reduce((a, b) => a.concat(b), [])
      ),
      ctx.STATIC_DRAW);
  }

  const a_Position = ctx.getAttribLocation(program, "a_Position");
  ctx.vertexAttribPointer(a_Position, 2, ctx.FLOAT, false, 0, 0);
  ctx.enableVertexAttribArray(a_Position);

  const a_Color = ctx.getAttribLocation(program, "a_Color");
  ctx.vertexAttrib4f(a_Color, 1, 0, 0, 1);

  ctx.drawArrays(ctx.TRIANGLES, 0, points.length);
}

export const rect = (
  ctx: WebGLRenderingContext,
  points: { x: number, y: number }[]
) => {

  const program = initShaders(ctx, vShader, fShader);

  const buffer = ctx.createBuffer();

  if (buffer) {
    ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
    ctx.bufferData(
      ctx.ARRAY_BUFFER,
      new Float32Array(
        points.map(i => [i.x, i.y]).reduce((a, b) => a.concat(b), [])
      ),
      ctx.STATIC_DRAW
    );
  }

  const a_Position = ctx.getAttribLocation(program, "a_Position");
  ctx.vertexAttribPointer(a_Position, 2, ctx.FLOAT, false, 0, 0);
  ctx.enableVertexAttribArray(a_Position);

  const a_Color = ctx.getAttribLocation(program, "a_Color");
  ctx.vertexAttrib4f(a_Color, 1, 0, 0, 1);

  ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, points.length);
}