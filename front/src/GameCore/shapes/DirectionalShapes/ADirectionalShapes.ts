import { Position } from "../../common/position";
import { Shape } from "../shape";

export abstract class ADirectionalShape extends Shape {
    rotation: number;
     
    constructor (position: Position, rotation: number = 0){
        super(position)
        this.rotation = rotation;
    }
}