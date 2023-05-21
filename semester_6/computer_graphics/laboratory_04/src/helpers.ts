import { present } from './lang';
import { Edge, IModel, Model, Vector3D } from './types';

export function getCanvas(): HTMLCanvasElement {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    return present(canvas);
}

export function createAxis(size: number): Model {
    const result: IModel = {
        position: { x: 0, y: 0, z: 0 },
        anchor: { x: 0, y: 0, z: 0 },
        angle: { x: 0, y: 0, z: 0 },
        edges: [],
        color: "#0000AA90"
    }

    result.edges.push({ p1: { x: 0, y: 0, z: 0 }, p2: { x: size, y: 0, z: 0 } });
    result.edges.push({ p1: { x: 0, y: 0, z: 0 }, p2: { x: 0, y: size, z: 0 } });
    result.edges.push({ p1: { x: 0, y: 0, z: 0 }, p2: { x: 0, y: 0, z: size } });

    return new Model(result.anchor, result.angle, result.edges);
}

export function createCube(size: number): Model {
    const points: Vector3D[] = [];

    let yMultiplier = 1;
    let xMultiplier = 1;
    let zMultiplier = 1;

    for (let i = 0; i < 8; i++) {
        const point: Vector3D = {
            x: size / 2 * xMultiplier,
            y: size / 2 * yMultiplier,
            z: size / 2 * zMultiplier,
        }

        points.push(point);

        if (i % 4 == 0) {
            xMultiplier *= -1;
        }

        if (i % 2 == 0) {
            yMultiplier *= -1;
        }

        zMultiplier *= -1;
    }

    const edges: Edge[] = [];
    const alreadyConnected: Vector3D[] = [];

    for (const p1 of points) {
        const connectedTo = points.filter(x => isTwoVecrtorsSame(p1, x));

        for (const p2 of connectedTo) {
            if (edges.filter(x => x.p1 === p2 && x.p2 === p1).length > 0) {
                continue;
            }

            edges.push({ p1: p1, p2: p2 });
            alreadyConnected.push(p2);
        }
    }

    const cube: IModel = {
        position: { x: 0, y: 0, z: 0 },
        anchor: { x: 0, y: 0, z: 0 },
        angle: { x: 0, y: 0, z: 0 },
        edges: edges,
    }

    return new Model(cube.anchor, cube.angle, cube.edges);
}

function isTwoVecrtorsSame(a: Vector3D, b: Vector3D): boolean {
    const isTwoCoordinatesSame =
        a.x === b.x && ((a.y === b.y && a.z !== b.z) || (a.z === b.z && a.y !== b.y))
        || a.y === b.y && ((a.x === b.x && a.z !== b.z) || (a.z === b.z && a.x !== b.x))
        || a.z === b.z && ((a.y === b.y && a.x !== b.x) || (a.x === b.x && a.y !== b.y));

    return isTwoCoordinatesSame;
}