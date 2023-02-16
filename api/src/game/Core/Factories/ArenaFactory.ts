import { Body, Vector } from "matter-js";
import { ArenaType } from "src/utils/GameEnums";
import { ShapeFactory, ShapeType } from "./ShapeFactory";

export class ArenaFactory {
    private static _gameSize:Vector
    public static getArena(arenaType: ArenaType):Body[] {
        let bodies: Body[] = []
        switch(arenaType) {
            case ArenaType.Simple:
                return [];
            case ArenaType.Crazy:
                bodies = this.Arena2();
            case ArenaType.Unpredictable:
                bodies = this.Arena1();
        }
        bodies[0].parts.forEach( p => {p.render.fillStyle = "white"});
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

    private static Arena2():Body[] {
        const bodies: Body[] = [];
        const size = Vector.create(this.gameSize.x / 4, this.gameSize.y / 5)
        bodies.push(ShapeFactory.getShape(ShapeType.CircularRectangle,{width:size.x, height:size.y}))
        Body.setPosition(bodies[0], Vector.create(this.gameSize.x / 2, this.gameSize.y / 2))
        bodies.push(ShapeFactory.getShape(ShapeType.HalfCircle,{raduis: size.x / 6, rotation: Math.PI / 4}))
        Body.setPosition(bodies[1], Vector.create(this.gameSize.x / 2, size.x / 12))
        bodies.push(ShapeFactory.getShape(ShapeType.HalfCircle,{raduis: size.x / 6, rotation: -Math.PI / 4}))
        Body.setPosition(bodies[2], Vector.create(this.gameSize.x / 2, this.gameSize.y - size.x / 12))
        return bodies
    }

    private static Arena3():Body[] {
        const bodies: Body[] = [];
        const num = 10;
        const gap = 3;
        const raduis = this.gameSize.y / (gap * (num + 1) + num)
        // const size = Vector.create(this.gameSize.x / 5, this.gameSize.y / (gap * (num + 1) + num))
        let gaps = raduis * gap 
        for (let i = 0; i < num ;i++) {
            bodies.push(ShapeFactory.getShape(ShapeType.Circle,{raduis}))
            Body.setPosition(bodies[i], Vector.create(this.gameSize.x / 2, gaps + raduis ))
            gaps += raduis * gap + raduis * 2
        }
        bodies.push(ShapeFactory.getShape(ShapeType.Triangle,{length: raduis * 3, rotation: Math.PI / 4}))
        Body.setPosition(bodies[1], Vector.create(this.gameSize.x / 2, raduis))
        bodies.push(ShapeFactory.getShape(ShapeType.Triangle,{length: raduis * 3, rotation: -Math.PI / 4}))
        // bodies.push(ShapeFactory.getShape(ShapeType.HalfCircle,{raduis: size.x / 6, rotation: -Math.PI / 4}))
        Body.setPosition(bodies[2], Vector.create(this.gameSize.x / 2, this.gameSize.y - raduis))
        return bodies
    }

    public static set gameSize(size:Vector) {
        this._gameSize = size;
    }

    public static get gameSize(): Vector {
        return this._gameSize
    }
}