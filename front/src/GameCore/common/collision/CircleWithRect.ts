import { Circle } from "../../shapes/circle";
import { Rect } from "../../shapes/DirectionalShapes/rect";

function calculateNewDirection(circle: Circle, rect: Rect) {
    // Convert the rotation of the rectangle to radians
    const rectRotation = rect.rotation * (Math.PI / 180);
    
    // Find the center of the rectangle
    const rectCenterX = rect.position.x + rect.width / 2;
    const rectCenterY = rect.position.x + rect.height / 2;
    
    // Find the position of the circle relative to the center of the rectangle
    const circleRelativeX = circle.position.x - rectCenterX;
    const circleRelativeY = circle.position.y - rectCenterY;
    
    // Rotate the position of the circle relative to the rectangle
    const rotatedX = circleRelativeX * Math.cos(rectRotation) - circleRelativeY * Math.sin(rectRotation);
    const rotatedY = circleRelativeX * Math.sin(rectRotation) + circleRelativeY * Math.cos(rectRotation);
    
    // Find the position of the circle in the rotated coordinate system
    const rotatedCircleX = rotatedX + rectCenterX;
    const rotatedCircleY = rotatedY + rectCenterY;
    
    // Find the new direction of the circle in the rotated coordinate system
    const newDirectionX = rotatedCircleX - circle.position.x;
    const newDirectionY = rotatedCircleY - circle.position.y;
    
    // Update the direction of the circle
    circle.direction.x = newDirectionX;
    circle.direction.y = newDirectionY;
    
    return circle;
}