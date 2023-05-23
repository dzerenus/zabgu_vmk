export interface IModel {
    polygons: IPolygon[];
}

export interface IPolygon {
    color: string;
    points: IVector3D[];
}

export interface IPolygonExtended {
    color: string;
    points: IVector3D[];
    center: IVector3D;
    normale: IVector3D;
    skalar?: number;
}

export interface IVector3D {
    x: number;
    y: number;
    z: number;
}

export enum Directions {
    Up,
    Down,
    Left,
    Right,
    ZLeft,
    ZRight
}