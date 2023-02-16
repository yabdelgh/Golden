import { Body, Vector } from "matter-js";
import { ShapeFactory, ShapeType } from "./ShapeFactory";

export class ArenaFactory {
    private static _gameSize:Vector
    public static getArena():Body[] {
        return this.Arena1()
        const bodies: Body[] = [];
        bodies.push(ShapeFactory.getShape(ShapeType.CircularRectangle,{width:200, height:40}))
        bodies[0].parts.forEach( p => {p.render.fillStyle = "white"});
        Body.setPosition(bodies[0], Vector.create(200,200))
        // ShapeFactory.getShape(ShapeType.TriangularRectangle,{width:100, height:20})
        // ShapeFactory.getShape(ShapeType.TriangularRectangle,{width:100, height:20})
        return bodies
    }

    private static Arena1():Body[] {
        const bodies: Body[] = [];
        const num = 4;
        const gap = 3;
        const size = Vector.create(this.gameSize.x / 5, this.gameSize.y / (gap * (num + 1) + num))
        let gaps = size.y * gap 
        for (let i = 0; i < num ;i++) {
            bodies.push(ShapeFactory.getShape(ShapeType.CircularRectangle,{width:size.x, height:size.y}))
            Body.setPosition(bodies[i], Vector.create(this.gameSize.x / 2, gaps + size.y / 2 ))
            gaps += size.y * gap + size.y
        }
        return bodies
    }

    public static set gameSize(size:Vector) {
        this._gameSize = size;
    }

    public static get gameSize(): Vector {
        return this._gameSize
    }
}