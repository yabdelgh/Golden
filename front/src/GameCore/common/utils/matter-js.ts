import { Body, Vector } from "matter-js";

export const GetBodySize = (body : Body): Vector => {
    let width = body.bounds.max.x - body.bounds.min.x;
    let height = body.bounds.max.y - body.bounds.min.y;
    return Vector.create(width, height);
}