import { Position } from "./common/position";
import { Shape } from "./shapes/shape";
import { APlayer, PlayerMove } from "./Players/APlayer";
import { Observable, retry, Subject } from "rxjs";
import { Arena } from "./Arena";
import Matter, { Engine, Events, Pair, Runner, Vector } from "matter-js"
import { Bodies, World, IWorldDefinition, Body, Composite } from "matter-js"
import { GetBodySize } from "./common/utils/matter-js";
import {Random} from "random-js";

const random = new Random();
// import('random').then(randomModule => {
//     random = randomModule
// });

enum GameStatus {
    Stoped = 0,
    Playing,
    Initiating,
    finished,
}

interface GameParams {
    id:number
    ball: Body;
    players: APlayer[];
    obstacles: Body[];
    size: Vector;
    scale?: number
}

export interface GameState {
    ball: Vector;
    player1: Vector;
    player2: Vector;
}

export class Game {
    private _id;
    private _ball: Body;
    private _players: APlayer[];
    private _obstacles: Body[]
    private size: Vector;
    private _score: number[];
    private status: GameStatus = GameStatus.Initiating;
    private rounds: number = 5;
    private _padel_gap: number = 10;
    private remaining_rounds: number = 0;
    private _engine: Engine;
    emiter: Subject<GameState> = new Subject<GameState>();
    gameEndEvent: Subject<GameState> = new Subject<GameState>();
    private runner: Runner;
    private ball_speed: Vector;

    constructor({ id, ball, players, obstacles, size, scale }: GameParams) {
        this._id = id;
        this._ball = ball
        this._players = players
        this.size = size
        this._obstacles = obstacles
        this._score = Array(this._players.length).fill(0);
        this.ball_speed = Vector.create(5, -5)

        this._engine = Engine.create({
            enableSleeping: false,
            gravity: Vector.create(0, 0),
            velocityIterations: 100,
            positionIterations: 100,
        });
        this.engine.gravity.scale = 0;
        this.runner = Runner.create()
        this.subscribe_players_to_game_event();
        this.setComponentsToWorld()
        this.set_game_event()
    }

    public setComponentsToWorld() {
        this.add_players_to_world()
        this.add_obstacles_to_world()
        this.add_ball_to_world()
    }

    private subscribe_players_to_game_event() {
        for (let player of this._players) {
            this.subscribe(player.update_game_state.bind(player))
        }
    }

    private add_players_to_world() {

        this._players[0].player_side = PlayerMove.Left
        this._players[0].game_size = this.size

        this._players[1].player_side = PlayerMove.Right
        this._players[1].game_size = this.size

        Composite.add(this.world, this._players.map(p => p.body))
        Composite.add(this.world, this._players.map(p => p.goal))
    }

    private add_obstacles_to_world() {
        Composite.add(this.world, this._obstacles)
        this._obstacles.forEach(o => {
            Body.setStatic(o, true)
            o.render.fillStyle = "white"
            o.restitution = 1
        })
    }

    private add_ball_to_world() {
        Body.setPosition(this._ball, Vector.create(this.size.x / 2, this.size.y / 2))
        Body.setVelocity(this._ball, this.ball_speed)
        Body.setInertia(this._ball, Infinity)
        this._ball.friction = 0;
        this._ball.frictionStatic = 0;
        this._ball.frictionAir = 0;
        this._ball.restitution = 1
        Composite.add(this.world, this._ball)
        Events.on(this.engine, "collisionStart", () => {
            console.log("ball collided start ", this._ball.velocity)
            // this.ball.torque = 0
            // Body.setAngularVelocity(this.ball, 0)
            // Body.setAngle(this.ball, 0)
        })
        Events.on(this.engine, "collisionEnd", (event) => {
            this.update_game_score(event.pairs)
            console.log("score", this._score)
            console.log("ball collided end", this._ball.velocity)
            const x = this._ball.velocity.x * 1.02
            const y = this._ball.velocity.y * 1.02
            Body.setVelocity(this._ball, Vector.create(x, y))
        })
    }


    private set_game_event() {
        Events.on(this.engine, "afterUpdate", (event) => { this.emit_game_state(event) })
    }

    private update_game_score(pair: Pair[]) {
        const b1 = this._players[0].goal
        const b2 = this._players[1].goal

        if (pair.some((p) => p.bodyA === b1 || p.bodyB === b1)) {
            this._score[0] += 1;
            this.set_ball_at_start(PlayerMove.Left);
        }
        else if (pair.some((p) => p.bodyA === b2 || p.bodyB === b2)) {
            this._score[1] += 1;
            this.set_ball_at_start(PlayerMove.Right);
        }
        this.rounds--;
        if (this.rounds == 0) {
            this.gameEndEvent.next({
                ball: this._ball.position,
                player1: this._players[0].body.position,
                player2: this._players[1].body.position,
            });
            this.stop();
        }
    }

    private set_ball_at_start(direction: PlayerMove) {
        Body.setPosition(this._ball, Vector.create(this.size.x / 2, random. real(50, this.size.y - 50)))
        if (direction === PlayerMove.Left)
            Body.setVelocity(this._ball, Vector.create(5, random.real(-5, 5)))
        else if (direction === PlayerMove.Right)
            Body.setVelocity(this._ball, Vector.create(-5, random.real(-5, 5)))
    }

    private emit_game_state(event: any) {
        // console.log(this, event)
        this.emiter.next({
            ball: this._ball.position,
            player1: this._players[0].body.position,
            player2: this._players[1].body.position,
        });
    }

    async start() {
        Runner.start(this.runner, this._engine)
    }

    async stop() {
        Runner.stop(this.runner)
    }

    get_player(player_id: number): APlayer {
        return this._players[player_id];
    }

    subscribe(event: any): void {
        this.emiter.subscribe(event);
    }

    subscribeGameEnd(event: any) {
        this.gameEndEvent.subscribe(event)
    }

    // exportBodies(): any {
    //     return {
    //         players : this.players.map(p => JSON.stringify(p.body)),
    //         obstacles : this.obstacles.map(o => JSON.stringify(o)),
    //         ball: JSON.stringify(this.ball),
    //     }
    // }

    public get world(): Composite {
        return this.engine.world;
    }

    public get engine(): Engine {
        return this._engine;
    }
    
    public get score(): number[] {
        return this._score;
    }

    public get id():number {
        return this._id;
    }

    public get  players(): APlayer[] {
        return this._players;
    }

    public get obstacles(): Body[] {
        return this._obstacles;
    }

    public get ball(): Body {
        return this._ball;
    }
}
