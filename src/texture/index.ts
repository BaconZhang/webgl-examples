import { initShaders } from "../util";
import vShader from "./vertex.glsl";
import fShader from './fragment.glsl';

export async function texture(
  ctx: WebGLRenderingContext,
  imageSrcList: string[]
) {
  const program = initShaders(ctx, vShader, fShader);

  const verticesTextCoords = new Float32Array([
    // 顶点坐标  纹理坐标
    -0.5, 0.5, 0.0, 1.0,
    -0.5, -0.5, 0.0, 0.0,
    0.5, 0.5, 1.0, 1.0,
    0.5, -0.5, 1.0, 0.0
  ]);

  const buffer = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
  ctx.bufferData(ctx.ARRAY_BUFFER, verticesTextCoords, ctx.STATIC_DRAW);

  const a_Position = ctx.getAttribLocation(program, "a_Position");
  ctx.vertexAttribPointer(a_Position, 2, ctx.FLOAT, false, verticesTextCoords.BYTES_PER_ELEMENT * 4, 0);
  ctx.enableVertexAttribArray(a_Position);

  const a_TexCoord = ctx.getAttribLocation(program, "a_TexCoord");
  ctx.vertexAttribPointer(a_TexCoord, 2, ctx.FLOAT, false, verticesTextCoords.BYTES_PER_ELEMENT * 4, 2 * verticesTextCoords.BYTES_PER_ELEMENT);
  ctx.enableVertexAttribArray(a_TexCoord);

  await Promise.all(imageSrcList.map((src, index) => initTextures(ctx, program, src, index)));
  ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, 4); // Draw the rectangle
}

const initTextures = (
  ctx: WebGLRenderingContext,
  program: WebGLProgram,
  src: string,
  index: number
) => {
  return new Promise(resolve => {
    const texture = ctx.createTexture();
    const u_Sampler = ctx.getUniformLocation(program, "u_Sampler" + index);

    const image = new Image();
    image.onload = () => {
      // 对图像进行y轴反转
      ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, 1);
      // 开启0号纹理单元
      ctx.activeTexture(ctx.TEXTURE0);
      // 绑定纹理对象
      ctx.bindTexture(ctx.TEXTURE_2D, texture);
      // 配置纹理参数
      ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
      // 配置纹理图像
      ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGB, ctx.RGB, ctx.UNSIGNED_BYTE, image);
      // 将0号纹理传给着色器
      ctx.uniform1i(u_Sampler, 0);

      resolve();
    };
    image.src = src;
  });

}
