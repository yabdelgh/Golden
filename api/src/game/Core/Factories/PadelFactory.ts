import { Bodies, Body, Vector } from 'matter-js';
import { PadelType } from 'src/utils/GameEnums';
import { GetBodySize, rotateBody } from '../common/utils/matter-js';
import { PlayerMove } from '../Players/APlayer';

export type PadelMaker = (size: number, side : PlayerMove) => Body;

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
  const base = makeSimple(size);
  Body.setPosition(base, Vector.create(0, 0));
  const semiCircle = createSemiCircle(size / 5);
  const baseSize = GetBodySize(base),
    hcSize = GetBodySize(semiCircle);
  const pos = Vector.create(baseSize.x / 2 + hcSize.x / 2 - 1, 0);
  Body.setPosition(semiCircle, pos);
  return Body.create({ parts: [base, semiCircle] });
  // return base;
}

function makeKhobza(size: number, side:PlayerMove): Body {
  const base = makeSimple(size);
  const partOfCircle = createPartOfCircle(size / 1.3, -40, 40);
  const baseSize = GetBodySize(base),
    hcSize = GetBodySize(partOfCircle);
  const pos = Vector.create(baseSize.x / 2 + hcSize.x / 2 - 1, 0);
  if (side == PlayerMove.Right) {
    rotateBody(partOfCircle, Math.PI / 2)
    Body.setPosition(partOfCircle, Vector.create(-pos.x, pos.y));
  }
  else
    Body.setPosition(partOfCircle, pos);
  return Body.create({ parts: [base, partOfCircle] });
}

export class PadelFactory {
  static makers = new Map<PadelType, PadelMaker>();
  static defaultPadelSize = 100;

  public static getPadel(padelType: PadelType, side: PlayerMove): Body {
    if (!this.makers.get(padelType)) throw Error('Padel creator unsupported');
    const body = this.makers.get(padelType)(this.defaultPadelSize, side);
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
