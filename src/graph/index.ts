interface Config {
  width: number;
  height: number;
  style: Partial<CSSStyleDeclaration>;
}

class Graph {
  canvas: HTMLCanvasElement;
  ctx: WebGLRenderingContext;

  private constructor(canvas: HTMLCanvasElement, container: HTMLElement = document.body) {
    const ctx = canvas.getContext("webgl");
    if (ctx === null) {
      throw new Error(`not support canvas 2d`);
    }
    this.ctx = ctx;
    this.canvas = canvas;
    container.append(canvas);
  }

  static init(id: string, config: Config, container: HTMLElement = document.body): Graph {
    if (document.querySelector(`#${id}`)) {
      throw new Error(`不能重复使用${id}`);
    }
    const canvas = document.createElement("canvas");
    canvas.id = id;
    canvas.width = config.width;
    canvas.height = config.height;
    canvas.setAttribute("style", Object.entries(config.style).map(i => i.join(":")).join(";"));
    return new Graph(canvas, container);
  }

  clear = () => {
    this.ctx.clearColor(0, 0, 0, 1);
    this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);
  }
}

export default Graph;
