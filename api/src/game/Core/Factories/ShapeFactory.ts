import { Bodies, Body, Vector, Vertices } from "matter-js";
import { GetBodySize, rotateBody } from "../common/utils/matter-js";

export enum ShapeType{
    Circle,
    Triangle,
    Rectangle,
    HalfCircle,
    TriangularRectangle,
    CircularRectangle,
}

type ShapeOptions =  {
    raduis?: number; //
    width?: number;
    height?: number;
    rotation?: number;
    startAngle?: number;
    endAngle?: number;
    length?:number
}

export class ShapeFactory {
    public static getShape(type: ShapeType,options: ShapeOptions):Body {
        switch (type) {
            case ShapeType.Circle:
                return this.makeCircle(options)
            case ShapeType.Triangle:
                return this.makeTriangle(options)
            case ShapeType.Rectangle:
                return this.makeRectangle(options)
            case ShapeType.HalfCircle:
                return this.makeHalfCircle(options)
            case ShapeType.TriangularRectangle : 
                return this.makeTriangularRectangle(options)
            default:
                return this.makeCircularRectangle(options)
        }
    }
    
    private static makeCircle(options: ShapeOptions):Body {
        return Bodies.circle(0,0, options.raduis)
    }

    private static makeTriangle(options: ShapeOptions):Body {
        const length = options.length
        const vertices = [
            { x: 0, y: 0 },
            { x: 0, y: length },
            { x: (length * Math.sqrt(3)) / 2, y: length / 2 },
          ];
          const triangle = Bodies.fromVertices(0, 0, [vertices]);
          options.rotation && Body.rotate(triangle, options.rotation)
          return triangle;
    }

    private static makeRectangle(options : ShapeOptions):Body {
        const b = Bodies.rectangle(0,0, options.width, options.height)
        options.rotation && Body.rotate(b, options.rotation)
        return b
    }
    
    private static makeHalfCircle(options: ShapeOptions):Body {
        options.startAngle = -90
        options.endAngle = 90
        const b = this.makePartOfCircle(options)
        options.rotation && rotateBody(b, options.rotation)
        return b
    }

    private static makeCircularRectangle(options: ShapeOptions):Body {
        options.raduis = options.height / 2
        options.width -= options.height
        const hcr = this.makeHalfCircle(options)
        options.startAngle = -270
        options.endAngle = -90
        const hcl = this.makePartOfCircle(options)
        const rec = this.makeRectangle(options)
        const recSize = GetBodySize(rec)
        const hclSize = GetBodySize(hcl)
        const offset = recSize.x / 2 + hclSize.x / 5
        Body.setPosition(hcr, Vector.create(offset, 0))
        Body.setPosition(hcl, Vector.create(-offset, 0))
        const b =  Body.create({parts: [rec, hcl, hcr]})          
        return rotateBody(b, options.rotation)
    }

    private static makeTriangularRectangle(options: ShapeOptions):Body {
        options.length = options.height
        options.width -= options.height
        const tr = this.makeTriangle(options)
        const tl = this.makeTriangle(options)
        rotateBody(tl, Math.PI / 2);
        const rec = this.makeRectangle(options)
        const recSize = GetBodySize(rec)
        const tlSize = GetBodySize(tl)
        const offset = recSize.x / 2 + tlSize.x / 2
        Body.setPosition(tr, Vector.create(offset, 0))
        Body.setPosition(tl, Vector.create(-offset, 0))
        const b =  Body.create({parts: [rec, tl, tr]})
        return rotateBody(b, options.rotation)
    }

    private static makePartOfCircle(options: ShapeOptions):Body {
        if (options.startAngle > options.endAngle) {
          throw new Error('startAngle must be less than endAngle');
        }
        const vertices = [];
        for (let angle = options.startAngle; angle <= options.endAngle; angle++) {
          const x = options.raduis * Math.cos((angle * Math.PI) / 180);
          const y = options.raduis * Math.sin((angle * Math.PI) / 180);
          vertices.push({ x, y });
        }
        const partOfCircle = Bodies.fromVertices(0, 0, [vertices]);
        options.rotation && Body.rotate(partOfCircle, options.rotation)
        return partOfCircle;
      }
}