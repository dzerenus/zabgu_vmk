import { getCanvas } from './helpers';
import { present } from './lang';
import { IModel, Model, Vector3D } from './types';

const cameraPosition: Vector3D = {
    x: 0,
    y: 0,
    z: 100
}

const cameraDistance = 300;

export function render(models: Model[]) {
    const canvas = getCanvas();
    const rect = canvas.getBoundingClientRect();
    const ctx = present(canvas.getContext('2d'));
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    ctx.clearRect(0, 0, rect.width, rect.height);

    for (const model of models) {
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
    
        for (const v of model.edges) {
            const p1 = translateTo2D(v.p1);
            const p2 = translateTo2D(v.p2);

            if (centerX < Math.abs(p1.x) && centerX < Math.abs(p2.x)) {
            }

            if (centerY < Math.abs(p1.y) && centerY < Math.abs(p2.y)) {
            }

            if (centerY < Math.abs(p1.y)) {
                const offset = Math.abs(p1.y) - centerY;
                const step = p1.x / p1.y;
                p1.x -= step * offset;
            }

            if (centerY < Math.abs(p2.y)) {
                const offset = Math.abs(p2.y) - centerY;
                const step = p2.x / p2.y;
                p2.x -= step * offset;
            }

            ctx.moveTo(centerX + p1.x, centerY - p1.y);
            ctx.lineTo(centerX + p2.x, centerY - p2.y);
        }
    
        ctx.closePath();
        ctx.stroke();
    }
    
}

function translateTo2D(point: Vector3D): Vector3D {
    let px = point.x - cameraPosition.x;
    let py = point.y - cameraPosition.y;
    let pz = point.z - cameraPosition.z;

    const y = cameraDistance * py / pz;
    const x = cameraDistance * px / pz;
    
    return {
        x: x,
        y: y,
        z: 0
    }
}
