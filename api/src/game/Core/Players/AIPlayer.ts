import { Body, Vector } from "matter-js";
import { Position } from "../common/position";
import { GameState } from "../game";
import { Shape } from "../shapes/shape";
import { APlayer, PlayerMove } from "./APlayer";

export class AIPlayer extends APlayer {

    public constructor(body: Body) { 
        super(body);
    }
    
    public update_game_state(state: GameState): void {
        // console.log("game state changed");
        this.follow_ball(state.ball);
    }

    private follow_ball(ball_position: Vector) {
        if (Math.abs(this.body.position.y - ball_position.y) > 5) {
        if (this.body.position.y - ball_position.y > 0)
            this.move(PlayerMove.Up)
        else if (this.body.position.y - ball_position.y < 0)
            this.move(PlayerMove.Down)
        }
    }

    // public get_position():Position {
    //     return this.shape.position;
    // }
}