import { Bodies, Body, Composite, Vector } from 'matter-js';
import { PadelType } from 'src/utils/GameEnums';
import { GetBodyCenter, GetBodySize } from '../common/utils/matter-js';
import { PlayerMove } from '../Players/APlayer';

export type PadelMaker = (size: number) => Body;

function rotate(body: Body, angle: number):Body {
  let parts : Body[] = [];
  const center = Vector.create(GetBodySize(body).x / 2, GetBodySize(body).x / 2)
  body.parts.forEach((part, idx) => {
    console.log("rotating part " + idx)
    // if (idx === 0) return
    const pc = GetBodyCenter(part)
    Body.setPosition(part, Vector.create(part.position.x + (center.x - pc.x) / 2 , part.position.y - (pc.y - center.y) / 2))
    Body.setCentre(part, center)
    Body.rotate(part, angle)
    parts.push(part)
  })
  return Body.create({parts: parts})
}

function createTriangle(length) {
  const vertices = [
    { x: 0, y: 0 },
    { x: 0, y: length },
    { x: (length * Math.sqrt(3)) / 2, y: length / 2 },
  ];
  const triangle = Bodies.fromVertices(0, 0, [vertices]);
  return triangle;
}

function createPartOfCircle(radius, startAngle, endAngle) {
  if (startAngle > endAngle) {
    throw new Error('startAngle must be less than endAngle');
  }
  const vertices = [];
  for (let angle = startAngle; angle <= endAngle; angle++) {
    const x = radius * Math.cos((angle * Math.PI) / 180);
    const y = radius * Math.sin((angle * Math.PI) / 180);
    vertices.push({ x, y });
  }
  const partOfCircle = Bodies.fromVertices(0, 0, [vertices]);
  return partOfCircle;
}

function createSemiCircle(radius) {
  const semiCircle = createPartOfCircle(radius, -90, 90);
  return semiCircle;
}

function makeSimple(size: number): Body {
  return Bodies.rectangle(0, 0, 10, size);
}

function makeTriangular(size: number): Body {
  const base = makeSimple(size);
  const length = size / 3;
  const triangle = createTriangle(length);
  const baseSize = GetBodySize(base),
    hcSize = GetBodySize(triangle);
  const pos = Vector.create(baseSize.x / 2 + hcSize.x / 2 - 4, 0);
  Body.setPosition(triangle, pos);
  return Body.create({ parts: [base, triangle] });
}

function makeHalfCircle(size: number): Body {
  // return createSemiCircle(size / 5);
  const base = makeSimple(size);
  Body.setPosition(base, Vector.create(0, 0));
  let semiCircle = createSemiCircle(size / 5);
  const baseSize = GetBodySize(base),
  hcSize = GetBodySize(semiCircle);
  Body.rotate(semiCircle, Math.PI / 2)
  const pos = Vector.create(baseSize.x / 2 - hcSize.x / 2 + 1, 0);
  Body.setPosition(semiCircle, pos);
  return Body.create({ parts: [base, semiCircle] });
  // return base;
}

function makeKhobza(size: number): Body {
  const base = makeSimple(size);
  const partOfCircle = createPartOfCircle(size / 1.3, -40, 40);
  const baseSize = GetBodySize(base),
    hcSize = GetBodySize(partOfCircle);
  const pos = Vector.create(baseSize.x / 2 + hcSize.x / 2 - 1, 0);
  Body.setPosition(partOfCircle, pos);
  return Body.create({ parts: [base, partOfCircle] });
}

export class PadelFactory {
  static makers = new Map<PadelType, PadelMaker>();
  static defaultPadelSize = 100;

  public static getPadel(padelType: PadelType, side: PlayerMove): Body {
    if (!this.makers.get(padelType)) throw Error('Padel creator unsupported');
    let body = this.makers.get(padelType)(this.defaultPadelSize);
    if (side == PlayerMove.Right) {
      // body = rotate(body, Math.PI/2)
      // const c = Composite.create({bodies :body.parts.splice(0, 1) })
      // const center = Vector.create(GetBodySize(body).x / 2, GetBodySize(body).x / 2)
      // Composite.rotate(c,  Math.PI, center)
      // console.log("--------->", body.parts.length, c.bodies.length)
      // body = Body.create({parts:c.bodies})
      // Body.rotate(body, 180 * Math.PI / 180)
    }
    return body;
  }

  public static addPadelMaker(type: PadelType, maker: PadelMaker): void {
    this.makers.set(type, maker);
  }

  public static loadMakers() {
    this.addPadelMaker(PadelType.Simple, makeSimple);
    this.addPadelMaker(PadelType.HalfCircle, makeHalfCircle);
    this.addPadelMaker(PadelType.Khobza, makeKhobza);
    this.addPadelMaker(PadelType.Triangular, makeTriangular);
  }
}
