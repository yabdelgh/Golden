import { Body, Vector } from "matter-js";
import { Position } from "../common/position";
import { GameState } from "../game";
import { Shape } from "../shapes/shape";
import { APlayer } from "./APlayer";

enum PlayerMove {
    Up,
    Down,
    Left,
    Right
}

export class Player extends APlayer {
    movingDirection: PlayerMove
    isMoving: boolean
    private _GameUpdateCallback: any = null

    public constructor(body: Body, id: number) { 
        super(body, id);
        this.isMoving = false;
        this.movingDirection = PlayerMove.Up
    }
    
    public update_game_state(state: GameState): void {
        // console.log("game state changed");
        // call the callback that will send the new state to the client
        this.follow_ball(state.ball);
    }

    private follow_ball(ball_position: Vector) {
       if (this.isMoving)
        this.move(this.movingDirection)
    }

    public start_moving(dir :PlayerMove) {
       this.movingDirection = dir;
       this.isMoving = true; 
    }

    public stop_moving() {
        this.isMoving = false
    }
    
    public set GameUpdateCallback(callback:Function) {
        this._GameUpdateCallback = callback;
    }
}