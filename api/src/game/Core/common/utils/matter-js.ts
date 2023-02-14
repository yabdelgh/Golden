import { Body, Vector } from 'matter-js';

export const GetBodySize = (body: Body): Vector => {
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  return Vector.create(width, height);
};

export const GetBodyCenter = (body: Body): Vector => {
  const centerX = body.position.x + GetBodySize(body).x / 2;
  const centerY = body.position.y + GetBodySize(body).y / 2;
  return Vector.create(centerX, centerY);
}