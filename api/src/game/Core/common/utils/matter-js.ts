import { Body, Vector, Vertices } from 'matter-js';

export const GetBodySize = (body: Body): Vector => {
  const width = body.bounds.max.x - body.bounds.min.x;
  const height = body.bounds.max.y - body.bounds.min.y;
  return Vector.create(width, height);
};

export const rotateBody = (body: Body, angle: number): Body => {
  if (angle) {
    // get the center of the body
    var center = Vertices.centre(body.vertices);

    // set the angle of the body
    Body.setAngle(body, angle);

    // offset the position of each part
    for (var i = 0; i < body.parts.length; i++) {
      var part = body.parts[i];
      var delta = Vector.sub(part.position, center);
      Vector.rotate(delta, angle);
      Body.setPosition(part, Vector.add(center, delta));
    }
  }
  return body
}