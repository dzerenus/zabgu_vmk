import { Directions, Model, Vector3D } from './types';
import { createCube } from './helpers';
import * as controls from './controls';
import { render } from './engine';

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

let cube = createCube(30);
let models: Model[] = [];
models.push(cube);
render(models);

let prevDirection: Directions = direction;
let prevAnchor: Vector3D = { x: 0, y: 0, z: 0 };

controls.autoButton.onclick = () => {
    cube = createCube(30);
    models = [];
    models.push(cube);
    render(models);

    prevDirection = direction;
    prevAnchor = { x: 0, y: 0, z: 0 };
};

const rotateAngle = Math.PI / 180 * 1;
setInterval(() => {
    if (isRotating) {
        const anchor: Vector3D = {
            x: Number(controls.xInput.value),
            y: Number(controls.yInput.value),
            z: Number(controls.zInput.value)
        };
    
        if (prevAnchor !== cube.anchor) {
            cube.anchor = anchor;
        };
    
        switch (direction) {
            case Directions.Up:
                cube.rotateX(-rotateAngle);
                break;
            case Directions.Down:
                cube.rotateX(rotateAngle);
                break;
            case Directions.Left:
                cube.rotateY(rotateAngle);
                break;
            case Directions.Right:
                cube.rotateY(-rotateAngle);
                break;
            case Directions.ZLeft:
                cube.rotateZ(rotateAngle);
                break;
            case Directions.ZRight:
                cube.rotateZ(-rotateAngle);
                break;
        }

        render(models);
    }
}, 10);