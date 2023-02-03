import { ITouchable } from "../common/ITouchable";
import { Position } from "../common/position";

enum Axis {
  X, Y, Z
}
export interface  moveDetail {
  axis: Axis,
  amount: number
}

export abstract class Shape implements ITouchable {
    public position: Position;
    public direction: Position;
    private speed: number;

    constructor(position: Position) {
      this.position = position;
      this.direction = position;
      this.speed = 0;
    }
    // abstract intersect(other: Shape): boolean;

    // abstract hit(other: Shape): boolean;

    move(details:moveDetail[]) : void {
      for(let detail of details) {
        switch(detail.axis) {
          case Axis.X:
            this.position.x += detail.amount;
            break;
          case Axis.Y:
            this.position.y += detail.amount;
            break;
          case Axis.Z:
            this.position.z += detail.amount;
        }
      }
    };

    directionalMove(amount:number):void {
      return void 0;
    }

    get_position():Position {
      return this.position;
    }
}
   