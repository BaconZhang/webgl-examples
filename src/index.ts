import Graph from './graph';
import { point, multiplePoints } from "./point";
// import { traingle, rect } from "./traingle";

const graph = Graph.init("canvas1", {
  width: 1000,
  height: 800,
  style: { position: "absolute" }
});
graph.clear();

const points: {
  x: number;
  y: number;
  color: [number, number, number, number],
  size: number
}[] = [];

points.push({
  x: 0,
  y: 0.5,
  color: [1, 0, 0, 1],
  size: 50
});

points.push({
  x: -0.5,
  y: 0.5,
  color: [0, 1, 0, 1],
  size: 40
});

points.push({
  x: 0.5,
  y: -0.5,
  color: [0, 0, 1, 1],
  size: 30
});

multiplePoints(graph.ctx, points);
// const getColor = (x: number, y: number): [number, number, number, number] => {
//   if (x >= 0 && y >= 0) {
//     return [1.0, 0.0, 0.0, 1.0];
//   } else if (x >= 0 && y < 0) {
//     return [0.0, 1.0, 0.0, 1.0];
//   } else if (x < 0 && y >= 0) {
//     return [0.0, 0.0, 1.0, 1.0];
//   } else {
//     return [1.0, 1.0, 1.0, 1.0];
//   }
// };

// graph.canvas.onclick = (e) => {
//   const { clientX, clientY } = e;
//   const { left, top } = graph.canvas.getBoundingClientRect();
//   const { width, height } = graph.canvas;
//   const x = (clientX - left) / (width / 2) - 1;
//   const y = 1 - (clientY - top) / (height / 2);
//   points.push({
//     x,
//     y,
//     color: getColor(x, y)
//   });

//   if (points.length % 4 === 0) {
//     console.log(points);
//     graph.clear();
//     for (let i = 0; i < points.length / 4; i++) {
//       console.log(i)
//       rect(graph.ctx, points.slice(i * 4, (i + 1) * 4));
//     }
//   }
//   // points.forEach(p => point(graph.ctx, p.x, p.y, p.color));
//   // multiplePoints(graph.ctx, points);
// }