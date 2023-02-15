// import { ITouchable } from "./common/ITouchable";
import { Body, Composite } from 'matter-js';
import { APlayer } from './Players/APlayer';

interface IArenaParams {
  obstacles: Body[];
  width: number;
  height: number;
  scale: number;
  players: APlayer[];
  ball: Body;
  world: Composite;
}

export class Arena {
  obstacles: Body[];
  _world: Composite;
  width: number;
  height: number;
  scale: number;
  players: APlayer[];
  ball: Body;

  constructor({
    obstacles,
    width,
    height,
    scale,
    players,
    ball,
    world,
  }: IArenaParams) {
    this.height = height;
    this.width = width;
    this.scale = scale;
    this.obstacles = [];
    this.players = players;
    this.ball = ball;
    this._world = world;
    Composite.add(this.world, obstacles);
    Composite.add(this.world, ball);
    Composite.add(
      this.world,
      players.map((player) => player.body),
    );
  }

  public get world(): Composite {
    return this._world;
  }
  // observable to be noticed by goals and update the score
  //
}
