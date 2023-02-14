import { Bodies, Body, Vector } from 'matter-js';
import { GameState } from '../game';
import { GetBodySize } from '../common/utils/matter-js';
import { Subject } from 'rxjs';

export enum PlayerMove {
  Up,
  Down,
  Left,
  Right,
}

export abstract class APlayer {
  move_step = 10;
  pos = Vector.create(0, 0);
  _padel_gap = 10;
  movingDirection: PlayerMove;
  isMoving: boolean;

  private _id: number;
  private _game_size = Vector.create(0, 0);
  private _player_side: PlayerMove = PlayerMove.Left;
  private _body: Body;
  private _goal: Body | null = null;
  private static moveStep = 5;
  protected _playerMoveEvent: Subject<Vector> = new Subject<any>();

  public constructor(body: Body, id: number) {
    this._body = body;
    this._id = id;

    this.body.render.fillStyle = 'white';
    Body.setStatic(this.body, true);
  }

  public get id(): number {
    return this._id;
  }

  public get body(): Body {
    return this._body;
  }

  public get player_side(): PlayerMove {
    return this._player_side;
  }

  public set player_side(value: PlayerMove) {
    this._player_side = value;
    this.update_padel_position();
  }

  public get game_size(): Vector {
    return this._game_size;
  }

  public set game_size(value: Vector) {
    this._game_size = value;
    this.update_padel_position();
  }

  private update_padel_position() {
    let pos_x;
    if (!this.player_side || !this._game_size) return;
    if (this.player_side == PlayerMove.Left) {
      pos_x = this._padel_gap + GetBodySize(this.body).x / 2;
      Body.setPosition(this.body, Vector.create(pos_x, this._game_size.y / 2));
    } else {
      pos_x =
        this._game_size.x - this._padel_gap - GetBodySize(this.body).x / 2;
      Body.setPosition(this.body, Vector.create(pos_x, this._game_size.y / 2));
    }
  }

  public get goal(): Body {
    if (!this._goal) {
      console.log('left side', PlayerMove.Left, this._player_side);
      if (this._player_side == PlayerMove.Left)
        this._goal = Bodies.rectangle(
          0,
          this._game_size.y / 2,
          1,
          this._game_size.y,
        );
      else
        this._goal = Bodies.rectangle(
          this._game_size.x,
          this._game_size.y / 2,
          1,
          this._game_size.y,
        );
      Body.setStatic(this._goal, true);
    }
    return this._goal;
  }

  move(direction: PlayerMove) {
    // TODO: apply check to not go out of bounds

    let x = this.body.position.x;
    let y = this.body.position.y;
    switch (direction) {
      case PlayerMove.Up:
        y = y - this.move_step;
        break;
      case PlayerMove.Down:
        y = y + this.move_step;
        break;
      case PlayerMove.Left:
        x = x - this.move_step;
        break;
      case PlayerMove.Right:
        x = x + this.move_step;
        break;
    }

    if (x < 50) x = 50;
    if (x > 450) x = 450;
    if (y < 0) y = 0;
    if (y > 450) y = 450;
    // console.log(x, y)
    this.pos.y = y;
    this.pos.x = x;
    Body.setPosition(this.body, this.pos);
    // this._playerMoveEvent.next(this.pos)
  }

  public abstract update_game_state(state: GameState): void;

  public subscribePlayerMove(event: any) {
    this._playerMoveEvent.subscribe(event);
  }
}
