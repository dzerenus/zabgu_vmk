import { IModel, IPolygon, IVector3D } from './types';

export function createPyramid(angleCount: number): IModel {
    if (angleCount < 3) {
        throw new Error();
    }

    const polygons: IPolygon[] = [];
    const upPoint: IVector3D = {x: 0, y: 40, z: 0};

    polygons.push({color: getColor(), points: []});

    for (let i = 0; i < angleCount; i++) {
        const z = 20 * Math.cos((2 * Math.PI * i) / angleCount);
        const x = 20 * Math.sin((2 * Math.PI * i) / angleCount);

        polygons[0].points.push({x: x, y: 0, z: z});
    }

    for (let i = 1; i < polygons[0].points.length; i++) {
        polygons.push({
            color: getColor(),
            points: [polygons[0].points[i-1], polygons[0].points[i], upPoint]
        })
    }

    polygons.push({
        color: getColor(),
        points: [polygons[1].points[0], polygons[polygons.length - 1].points[1], upPoint]
    })


    const result: IModel = {
        polygons: polygons,
    };

    return result;
}

let index = 0;
const colors: string[] = ["#AAFFFF", "#AAAAFF", "#AAAAAA", "#bf5a5a", "#22c98c", "#7dbd59", "#c434cf", "#c6d65e"]
function getColor(): string {
    index++;

    if (index == colors.length) {
        index = 0;
    }

    return colors[index];
}