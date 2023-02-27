import { Body } from 'matter-js';
// import { GameState } from '../game';
import { APlayer } from './APlayer';

enum PlayerMove {
  Up,
  Down,
  Left,
  Right,
}

export class Player extends APlayer {
  // movingDirection: PlayerMove
  // isMoving: boolean
  private _GameUpdateCallback: any = null;

  public constructor(body: Body, id: number) {
    super(body, id);
    this.isMoving = false;
    this.movingDirection = PlayerMove.Up;
  }

  public override update_game_state(): void {
    this.follow_ball();
  }

  private follow_ball() {
    if (this.isMoving) this.move(this.movingDirection);
  }

  public start_moving(dir: PlayerMove) {
    this.movingDirection = dir;
    this.isMoving = true;
    this._playerMoveEvent.next(this.body.position);
  }

  public stop_moving() {
    this.isMoving = false;
    this._playerMoveEvent.next(this.body.position);
  }

  public set GameUpdateCallback(callback: any) {
    this._GameUpdateCallback = callback;
  }
}
