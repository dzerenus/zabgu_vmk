export enum Directions {
    Up,
    Down,
    Left,
    Right,
    ZLeft,
    ZRight
}

export interface Vector3D {
    x: number;
    y: number;
    z: number;
}

export interface Edge {
    p1: Vector3D;
    p2: Vector3D;
}

export interface IModel {
    color?: string;
    position: Vector3D;
    angle: Vector3D;
    anchor: Vector3D;
    edges: Edge[];
}

export class Model {
    anchor: Vector3D;
    angle: Vector3D;
    edges: Edge[];

    constructor (anchor: Vector3D, angle: Vector3D, edges: Edge[]) {
        this.anchor = anchor;
        this.angle = angle;
        this.edges = edges;
    }

    rotateX(angle: number) {
        for (const edge of this.edges) {
            edge.p1 = subPoint(edge.p1, this.anchor);
            edge.p2 = subPoint(edge.p2, this.anchor);

            const newP1 = rotateX(edge.p1, angle);
            const newP2 = rotateX(edge.p2, angle);

            edge.p1 = addPoint(newP1, this.anchor);
            edge.p2 = addPoint(newP2, this.anchor);

            this.angle.x += angle;
        }
    }

    rotateY(angle: number) {
        for (const edge of this.edges) {
            edge.p1 = subPoint(edge.p1, this.anchor);
            edge.p2 = subPoint(edge.p2, this.anchor);

            const newP1 = rotateY(edge.p1, angle);
            const newP2 = rotateY(edge.p2, angle);

            edge.p1 = addPoint(newP1, this.anchor);
            edge.p2 = addPoint(newP2, this.anchor);

            this.angle.y += angle;
        }
    }

    rotateZ(angle: number) {
        for (const edge of this.edges) {
            edge.p1 = subPoint(edge.p1, this.anchor);
            edge.p2 = subPoint(edge.p2, this.anchor);

            const newP1 = rotateZ(edge.p1, angle);
            const newP2 = rotateZ(edge.p2, angle);

            edge.p1 = addPoint(newP1, this.anchor);
            edge.p2 = addPoint(newP2, this.anchor);;

            this.angle.z += angle;
        }
    }
}

function addPoint(p1: Vector3D, p2: Vector3D): Vector3D {
    const result: Vector3D = {
        x: p1.x + p2.x,
        y: p1.y + p2.y,
        z: p1.z + p2.z,
    };

    return result;
}

function subPoint(p1: Vector3D, p2: Vector3D): Vector3D {
    const result: Vector3D = {
        x: p1.x - p2.x,
        y: p1.y - p2.y,
        z: p1.z - p2.z,
    };

    return result;
}

function rotateX (v: Vector3D, angle: number): Vector3D {
    const result = { ...v };

    result.y = v.y * Math.cos(angle) + v.z * Math.sin(angle);
    result.z = v.z * Math.cos(angle) - v.y * Math.sin(angle);

    return result;
}

function rotateY (v: Vector3D, angle: number): Vector3D {
    const result = { ...v };

    result.x = v.x * Math.cos(angle) + v.z * Math.sin(angle);
    result.z = v.z * Math.cos(angle) - v.x * Math.sin(angle);

    return result;
}

function rotateZ (v: Vector3D, angle: number): Vector3D {
    const result = { ...v };

    result.x = v.x * Math.cos(angle) + v.y * Math.sin(angle);
    result.y = v.y * Math.cos(angle) - v.x * Math.sin(angle);

    return result;
}