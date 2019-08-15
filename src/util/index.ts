const loadShader = (
  ctx: WebGLRenderingContext,
  type: number,
  source: string
) => {
  const shader = ctx.createShader(type) as WebGLShader;
  ctx.shaderSource(shader, source);
  ctx.compileShader(shader);

  if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
    const error = ctx.getShaderInfoLog(shader);
    ctx.deleteShader(shader);
    throw new Error(`Failed to compile shader: ${error}`);
  }
  return shader;
};

const createProgram = (ctx: WebGLRenderingContext, vshader: string, fshader: string) => {
  const vertexShader = loadShader(ctx, ctx.VERTEX_SHADER, vshader);
  const fragmentShader = loadShader(ctx, ctx.FRAGMENT_SHADER, fshader);

  const program = ctx.createProgram() as WebGLProgram;
  ctx.attachShader(program, vertexShader);
  ctx.attachShader(program, fragmentShader);

  ctx.linkProgram(program);

  if (!ctx.getProgramParameter(program, ctx.LINK_STATUS)) {
    const error = ctx.getProgramInfoLog(program);
    ctx.deleteProgram(program);
    ctx.deleteShader(fragmentShader);
    ctx.deleteShader(vertexShader);
    throw new Error('Failed to link program: ' + error);
  }

  return program;
};

export const initShaders = (ctx: WebGLRenderingContext, vshader: string, fshader: string) => {
  const program = createProgram(ctx, vshader, fshader);
  ctx.useProgram(program);
  return program;
}