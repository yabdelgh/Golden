import { Body, Vector } from 'matter-js';

export const GetBodySize = (body: Body): Vector => {
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  return Vector.create(width, height);
};
