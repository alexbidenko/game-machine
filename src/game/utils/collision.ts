import {GameObject} from "../base";

export const getDistance = (g1: GameObject, g2: GameObject) => Math.sqrt(Math.abs(g1.coords.x - g2.coords.x) ** 2 + Math.abs(g1.coords.y - g2.coords.y) ** 2);

export default (g1: GameObject, g2: GameObject) => getDistance(g1, g2) < g1.radius + g2.radius