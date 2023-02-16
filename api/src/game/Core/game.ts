import { APlayer, PlayerMove } from './Players/APlayer';
import { Subject } from 'rxjs';
import { Engine, Events, Pair, Runner, Vector } from 'matter-js';
import { Bodies, Body, Composite } from 'matter-js';
import { Random } from 'random-js';

const random = new Random();

enum GameStatus {
  Stoped = 0,
  Playing,
  Initiating,
  finished,
}

interface GameParams {
  id: number;
  ball: Body;
  players: APlayer[];
  obstacles: Body[];
  size: Vector;
  scale?: number;
}

export interface GameState {
  id: number;
  ball_velocity: Vector;
  ball: Vector;
  players: Vector[];
  playersState: { action: number; direction: PlayerMove }[];
  score: number[];
}

export class Game {
  private frameid = 0;
  private frames = 0;
  private _id;
  private _ball: Body;
  private _players: APlayer[];
  private _obstacles: Body[];
  private _size: Vector;
  private _score: number[];
  private status: GameStatus = GameStatus.Initiating;
  private rounds = 60000;
  private _padel_gap = 10;
  private remaining_rounds = 0;
  private _engine: Engine;
  emiter: Subject<GameState> = new Subject<GameState>();
  gameEndEvent: Subject<Game> = new Subject<Game>();
  webClientEvent: Subject<GameState> = new Subject<GameState>();
  private runner: Runner;

  constructor({ id, ball, players, obstacles, size }: GameParams) {
    this._id = id;
    this._ball = ball;
    this._players = players;
    this._size = size;
    this._obstacles = obstacles;
    this._score = Array(this._players.length).fill(0);

    this._engine = Engine.create({
      enableSleeping: false,
      gravity: Vector.create(0, 0),
      // constraintIterations:20,
      // velocityIterations: 20,
      // positionIterations: 20,
    });
    this.engine.gravity.scale = 0;
    this.runner = Runner.create();
    this.subscribe_players_to_game_event();
    this.subscribe_game_to_player();
    this.setComponentsToWorld();
    this.set_game_event();
  }

  public setComponentsToWorld() {
    this.add_world_borders();
    this.add_players_to_world();
    this.add_obstacles_to_world();
    this.add_ball_to_world();
  }

  private subscribe_players_to_game_event() {
    for (const player of this._players) {
      this.subscribe(player.update_game_state.bind(player));
      console.log();
    }
  }

  private subscribe_game_to_player() {
    this.players.forEach((p) =>
      p.subscribePlayerMove((e: any) =>
        this.emit_game_state(e, this.webClientEvent),
      ),
    );
  }

  private add_players_to_world() {
    this._players[0].player_side = PlayerMove.Left;
    this._players[0].game_size = this._size;

    this._players[1].player_side = PlayerMove.Right;
    this._players[1].game_size = this._size;

    Composite.add(
      this.world,
      this._players.map((p) => p.body),
    );
    Composite.add(
      this.world,
      this._players.map((p) => p.goal),
    );
  }

  add_world_borders() {
    this._obstacles.push(
      Bodies.rectangle(this._size.x / 2, 0, this._size.x, 1, {
        isStatic: true,
        restitution: 1,
      }),
    );
    this._obstacles.push(
      Bodies.rectangle(this._size.x / 2, this._size.y, this._size.x, 1, {
        isStatic: true,
        restitution: 1,
      }),
    );
  }

  private add_obstacles_to_world() {
    Composite.add(this.world, this._obstacles);
    this._obstacles.forEach((o) => {
      Body.setStatic(o, true);
      o.render.fillStyle = 'white';
      o.restitution = 1;
    });
  }

  private add_ball_to_world() {
    Body.setPosition(
      this._ball,
      Vector.create(this._size.x / 2, this._size.y / 2),
    );
    Body.setInertia(this._ball, Infinity);
    this._ball.friction = 0;
    this._ball.frictionStatic = 0;
    this._ball.frictionAir = 0;
    this._ball.restitution = 1;
    Composite.add(this.world, this._ball);
    Events.on(this.engine, 'collisionEnd', (event) => {
      this.update_game_score(event.pairs);
      const x = this._ball.velocity.x * 1.02;
      const y = this._ball.velocity.y * 1.02;
      Body.setVelocity(this._ball, Vector.create(x, y));
    });
  }

  private set_game_event() {
    Events.on(this.engine, 'afterUpdate', (event) => {
      this.emit_game_state(event, this.emiter);

      // a bad solution to fix data race by reducing the fps
      if (this.frames % 10) {
        this.emit_game_state(event, this.webClientEvent);
        this.frames = 0;
      } else this.frames++;
    });
  }

  private update_game_score(pair: Pair[]) {
    const b1 = this._players[0].goal;
    const b2 = this._players[1].goal;

    if (pair.some((p) => p.bodyA === b1 || p.bodyB === b1)) {
      this._score[0] += 1;
      this.set_ball_at_start(PlayerMove.Left);
      this.rounds--;
    } else if (pair.some((p) => p.bodyA === b2 || p.bodyB === b2)) {
      this._score[1] += 1;
      this.set_ball_at_start(PlayerMove.Right);
      this.rounds--;
    }
    if (this.rounds == 0) {
      this.stop();
      this.gameEndEvent.next(this);
    }
  }

  private set_ball_at_start(direction: PlayerMove) {
    Body.setPosition(
      this._ball,
      Vector.create(this._size.x / 2, random.real(50, this._size.y - 50)),
    );
    if (direction === PlayerMove.Left)
      Body.setVelocity(this._ball, Vector.create(5, random.real(-5, 5)));
    else if (direction === PlayerMove.Right)
      Body.setVelocity(this._ball, Vector.create(-5, random.real(-5, 5)));
    this.emit_game_state({}, this.webClientEvent);
  }

  private emit_game_state(event: any, emiter: Subject<GameState>) {
    let id = 0;
    if (emiter === this.webClientEvent) id = this.frameid++;
    emiter.next({
      id: id,
      ball_velocity: this._ball.velocity,
      ball: this._ball.position,
      players: [this._players[0].body.position, this._players[1].body.position],
      playersState: [
        {
          action: this._players[0].isMoving ? 0 : 1,
          direction: this._players[0].movingDirection,
        },
        {
          action: this._players[1].isMoving ? 0 : 1,
          direction: this._players[1].movingDirection,
        },
      ],
      score: this._score,
    });
  }

  async start() {
    Runner.start(this.runner, this._engine);
    this.set_ball_at_start(
      random.integer(0, 1) == 1 ? PlayerMove.Right : PlayerMove.Left,
    );
  }

  async stop() {
    Runner.stop(this.runner);
  }

  get_player(player_id: number): APlayer {
    return this._players[player_id];
  }

  get_player_by_id(player_id: number): APlayer {
    if (player_id === this._players[0].id) return this._players[0];
    else if (player_id === this._players[1].id) return this._players[1];
  }

  subscribe(event: any): void {
    this.emiter.subscribe(event);
  }

  subscribeGameEnd(event: any) {
    this.gameEndEvent.subscribe(event);
  }

  subscribeWebClient(event: any): void {
    this.webClientEvent.subscribe(event);
  }

  public get world(): Composite {
    return this.engine.world;
  }

  public get engine(): Engine {
    return this._engine;
  }

  public get score(): number[] {
    return this._score;
  }

  public get id(): number {
    return this._id;
  }

  public get players(): APlayer[] {
    return this._players;
  }

  public get obstacles(): Body[] {
    return [...this._obstacles, ...this.players.map((p) => p.goal)];
  }

  public get ball(): Body {
    return this._ball;
  }

  public get size(): Vector {
    return this._size;
  }
}
