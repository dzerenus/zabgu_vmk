import { createPyramid } from './models';
import { Directions, IModel, IVector3D } from './types';
import { render, anchor, rotation } from './engine';
import * as controls from './controls';

const models: IModel[] = [];

models.push(createPyramid(8));

setInterval(() => render(models), 16);


let isRotating = false;
let direction = Directions.Left;

controls.leftButton.onmouseup = () =>  isRotating = false;
controls.leftButton.onmousedown = () => {
    direction = Directions.Left;
    isRotating = true;
}

controls.rightButton.onmouseup = () =>  isRotating = false;
controls.rightButton.onmousedown = () => {
    direction = Directions.Right;
    isRotating = true;
}

controls.upButton.onmouseup = () => {
    isRotating = false;
}

controls.upButton.onmousedown = () => {
    direction = Directions.Up;
    isRotating = true;
}

controls.downButton.onmouseup = () =>  isRotating = false;
controls.downButton.onmousedown = () => {
    direction = Directions.Down;
    isRotating = true;
}

controls.zLeftButton.onmouseup = () =>  isRotating = false;
controls.zLeftButton.onmousedown = () => {
    direction = Directions.ZLeft;
    isRotating = true;
}

controls.zRightButton.onmouseup = () =>  isRotating = false;
controls.zRightButton.onmousedown = () => {
    direction = Directions.ZRight;
    isRotating = true;
}

render(models);

let prevAnchor: IVector3D = { x: 0, y: 0, z: 0 };

const rotateAngle = Math.PI / 180 * 1;
setInterval(() => {
    if (isRotating) {
        const anchore: IVector3D = {
            x: Number(controls.xInput.value),
            y: Number(controls.yInput.value),
            z: Number(controls.zInput.value)
        };
    
        if (prevAnchor !== anchor) {
            anchor.x = anchore.x;
            anchor.y = anchore.y;
            anchor.z = anchore.z;
        };
    
        switch (direction) {
            case Directions.Up:
                rotation.x += 0.02;
                break;
            case Directions.Down:
                rotation.x -= 0.02;
                break;
            case Directions.Left:
                rotation.y += 0.02;
                break;
            case Directions.Right:
                rotation.y -= 0.02;
                break;
            // case Directions.ZLeft:
            //     cube.rotateZ(rotateAngle);
            //     break;
            // case Directions.ZRight:
            //     cube.rotateZ(-rotateAngle);
            //     break;
        }

        render(models);
    }
}, 10);