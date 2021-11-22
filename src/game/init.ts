import Player from './objects/player';
import initState, { globalState } from './state';
import MapObject from './objects/map';
import EnemyObject from './objects/enemy';
import InterfaceObject from './objects/interface';
import HealObject from './objects/heal';
import TreeObject from './objects/static/tree';
import BowObject from './objects/weapons/bow';
import SwordObject from './objects/weapons/sword';
import WallObject from './objects/static/wall';
import VerticalWallObject from './objects/static/verticalWall';

export default (ctx: CanvasRenderingContext2D) => {
  new MapObject(ctx, { x: 0, y: -Infinity });
  globalState.inventory.activeWeapon = new SwordObject(ctx);
  globalState.inventory.activeWeapon = new BowObject(ctx);
  const player = new Player(ctx, { x: globalState.sceneWidth / 2, y: globalState.sceneHeight / 2 });
  new InterfaceObject(ctx, { x: 0, y: Infinity });

  Array.from({ length: 40 }, () => new EnemyObject(ctx, { x: Math.random() * 4000 - 2000, y: Math.random() * 4000 - 2000 }));
  Array.from({ length: 12 }, () => new HealObject(ctx, { x: Math.random() * 4000 - 2000, y: Math.random() * 4000 - 2000 }));
  Array.from({ length: 60 }, () => new TreeObject(ctx, { x: Math.random() * 4000 - 2000, y: Math.random() * 4000 - 2000 }));
  Array.from({ length: 5 }, () => new SwordObject(ctx, { x: Math.random() * 4000 - 2000, y: Math.random() * 4000 - 2000 }));
  Array.from({ length: 13 }, (_, i) => new WallObject(ctx, { x: -2500 + i * 400, y: -2500 }));
  Array.from({ length: 13 }, (_, i) => new WallObject(ctx, { x: -2500 + i * 400, y: 2500 }));
  Array.from({ length: 13 }, (_, i) => new VerticalWallObject(ctx, { x: -2500, y: -2500 + i * 400 }));
  Array.from({ length: 13 }, (_, i) => new VerticalWallObject(ctx, { x: 2500, y: -2500 + i * 400 }));

  initState();

  globalState.player = player;

  globalState.objects.forEach((el) => el.init());

  const update = () => {
    requestAnimationFrame(() => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      globalState.objects.forEach((el) => el.update());
      globalState.objects.sort((a, b) => (a.coords.y > b.coords.y ? 1 : -1)).forEach((el) => el.draw());
      update();
    });
  };
  update();
};
