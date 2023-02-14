import { share } from "rxjs";
import { Position } from "../../common/position";
import { Shape } from "../shape";
import { ADirectionalShape } from "./ADirectionalShapes";

export class Rect extends ADirectionalShape {
    private _width: number;
    private _height: number;

    constructor(position:Position, width:number, height:number, rotation:number = 0) {
        super(position, rotation);
        this._width = width;
        this._height = height;
    }

    public get width():number {
        return this._width;
    }

    public get height():number {
        return this._height;
    }

    intersect(other: Shape): boolean {
        return true;
    }

    hit(shape: Shape): boolean {
        if (this.intersect(shape)) {
            return true;
        }
        return false;
    }
}