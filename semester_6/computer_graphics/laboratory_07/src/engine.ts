import { getCanvas } from './helpers';
import { present } from './lang';
import { IModel, IPolygon, IPolygonExtended, IVector3D } from './types';

const cameraPosition: IVector3D = {
    x: 0,
    y: 0,
    z: 100
}

const cameraDistance = 300;

export const anchor: IVector3D = {
    x: 0,
    y: 0,
    z: 0
}

export const rotation: IVector3D = {
    x: 0,
    y: 0,
    z: 0
}

export function render(models: IModel[]) {
    const canvas = getCanvas();
    const rect = canvas.getBoundingClientRect();
    const ctx = present(canvas.getContext('2d'));

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    ctx.clearRect(0, 0, rect.width, rect.height);

    for (const model of models) {

        ctx.strokeStyle = "#000000";

        const extendedPolygons = model.polygons.map(x => {
            const points = x.points.map(x => rotateX(rotateY(subPoint(x, anchor), rotation.y), rotation.x));

            const result: IPolygonExtended = {
                color: x.color,
                points: points,
                center: polygonCenter(points),
                normale: getNormale(points)
            }

            return result
        });

        const figureCenter = getFigureCenter(extendedPolygons.map(x => x.center));

        let index = 0;

        extendedPolygons.forEach(x => {
            x.skalar = figureCenter.x * x.normale.x + figureCenter.y * x.normale.y + figureCenter.z * x.normale.z;

            if (x.skalar <= 0 ) {
                x.normale = {
                    x: x.normale.x * -1,
                    y: x.normale.y * -1,
                    z: x.normale.z * -1,
                }
            }

            if (index == 0) {
                x.normale = {
                    x: x.normale.x * -1,
                    y: x.normale.y * -1,
                    z: x.normale.z * -1,
                }
            }

            index++;
        });

        extendedPolygons.forEach(x => {
            x.skalar = x.normale.x * cameraPosition.x + x.normale.y * cameraPosition.y + x.normale.z * cameraPosition.z
        })

        extendedPolygons.sort((a, b) => a.skalar - b.skalar);

        for (const v of extendedPolygons) {
            if (v.skalar <= 0) {
                continue;
            }

            const points = v.points.map(x => translateTo2D(x));

            ctx.fillStyle = v.color;
            ctx.beginPath();

            for (const point of points) {
                ctx.lineTo(centerX + point.x, centerY - point.y);
            }

            ctx.fill();
            ctx.closePath();
            ctx.stroke();
        }
    }
}

function addPoint(p1: IVector3D, p2: IVector3D): IVector3D {
    const result: IVector3D = {
        x: p1.x + p2.x,
        y: p1.y + p2.y,
        z: p1.z + p2.z,
    };

    return result;
}

function subPoint(p1: IVector3D, p2: IVector3D): IVector3D {
    const result: IVector3D = {
        x: p1.x - p2.x,
        y: p1.y - p2.y,
        z: p1.z - p2.z,
    };

    return result;
}

function getNormale(points: IVector3D[]): IVector3D {
    const first: IVector3D = {
        x: points[points.length - 1].x - points[0].x,
        y: points[points.length - 1].y - points[0].y,
        z: points[points.length - 1].z - points[0].z,
    }

    const second: IVector3D = {
        x: points[1].x - points[0].x,
        y: points[1].y - points[0].y,
        z: points[1].z - points[0].z,
    }

    return {
        x: first.y * second.z - first.z * second.y,
        y: first.z * second.x - first.x * second.z,
        z: first.x * second.y - first.y * second.x,
    }
}

function getFigureCenter(input: IVector3D[]) {
    let xPointsSum = 0;
    let yPointsSum = 0;
    let zPointsSum = 0;

    for (const point of input) {
        xPointsSum += point.x;
        yPointsSum += point.y;
        zPointsSum += point.z;
    }

    return {
        x: xPointsSum / input.length,
        y: yPointsSum / input.length,
        z: zPointsSum / input.length,
    }
}

function polygonCenter(input: IVector3D[]): IVector3D {
    let xPointsSum = 0;
    let yPointsSum = 0;
    let zPointsSum = 0;

    for (const point of input) {
        xPointsSum += point.x;
        yPointsSum += point.y;
        zPointsSum += point.z;
    }

    return {
        x: xPointsSum / input.length,
        y: yPointsSum / input.length,
        z: zPointsSum / input.length,
    }
}

function rotateX(v: IVector3D, angle: number): IVector3D {
    const result = { ...v };

    result.y = v.y * Math.cos(angle) + v.z * Math.sin(angle);
    result.z = v.z * Math.cos(angle) - v.y * Math.sin(angle);

    return result;
}

function rotateY(v: IVector3D, angle: number): IVector3D {
    const result = { ...v };

    result.x = v.x * Math.cos(angle) + v.z * Math.sin(angle);
    result.z = v.z * Math.cos(angle) - v.x * Math.sin(angle);

    return result;
}

function translateTo2D(point: IVector3D): IVector3D {
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
