import Graph from './graph';
import { point, multiplePoints } from "./examples/point";

const graph = Graph.init("canvas1", {
  width: 1000,
  height: 800,
  style: { position: "absolute" }
});
graph.clear();

const points: {
  x: number;
  y: number;
  color: [number, number, number, number]
}[] = [];

const getColor = (x: number, y: number): [number, number, number, number] => {
  if (x >= 0 && y >= 0) {
    return [1.0, 0.0, 0.0, 1.0];
  } else if (x >= 0 && y < 0) {
    return [0.0, 1.0, 0.0, 1.0];
  } else if (x < 0 && y >= 0) {
    return [0.0, 0.0, 1.0, 1.0];
  } else {
    return [1.0, 1.0, 1.0, 1.0];
  }
};

graph.canvas.onclick = (e) => {
  const { clientX, clientY } = e;
  const { left, top } = graph.canvas.getBoundingClientRect();
  const { width, height } = graph.canvas;
  const x = (clientX - left) / (width / 2) - 1;
  const y = 1 - (clientY - top) / (height / 2);
  graph.clear();
  points.push({
    x,
    y,
    color: getColor(x, y)
  });
  // points.forEach(p => point(graph.ctx, p.x, p.y, p.color));
  multiplePoints(graph.ctx, points);
}