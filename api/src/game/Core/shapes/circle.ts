import { Position } from "../common/position";
import { Shape } from "./shape";

export class Circle extends Shape {
    raduis: number;
    constructor(position:Position, radius: number) {
        super(position);
        this.raduis = radius;
    }
}