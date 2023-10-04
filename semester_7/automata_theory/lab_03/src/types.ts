export interface Vector2D {
    x: Readonly<number>;
    y: Readonly<number>;
}

export abstract class GameObject {
    get cellsPositions() { return this._coordinates; }
    get position() { return this._position; }
    get color() { return this._color; }

    private _coordinates: Vector2D[];

    constructor(
        private _position: Vector2D,
        private readonly _anchor: Vector2D,
        private _cells: Vector2D[],
        private readonly _color: string) {
            this._coordinates = this.getAbsoluteCellsCoordinates();
    }

    setPosition(pos: Vector2D) {
        this._position = pos;
        this._coordinates = this.getAbsoluteCellsCoordinates();
    }

    setCells(cells: Vector2D[]) {
        this._cells = cells;
        this._coordinates = this.getAbsoluteCellsCoordinates();
    }

    private getAbsoluteCellsCoordinates(): Vector2D[] {
        const result = this._cells.map((cell): Vector2D => {
            return {
                x: cell.x + this._position.x,
                y: cell.y + this._position.y,
            }
        })

        return result;
    }

    isCollision(go: GameObject): Boolean {
        const positions1 = this.cellsPositions;
        const positions2 = go.cellsPositions;

        const isCollision = positions1.some(p1 => positions2.some(p2 => p2.x === p1.x && p2.y === p1.y));
        return isCollision;
    }

    isVectorCollision(vector: Vector2D): Boolean {
        const positions = this.cellsPositions;
        const isCollision = positions.some(c => c.x === vector.x && c.y === vector.y);
        return isCollision;
    }
}

export class Leaf extends GameObject {
    constructor(position: Vector2D) {
        super(position, { x: 0, y: 0 }, [{ x: 0, y: 0 }], "#2a960f");
    }
}

export class Home extends GameObject {
    constructor(position: Vector2D) {
        super(position,
            { x: 0, y: 0 },
            [
                { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
                { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 },
                { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }
            ],
            "#eb9b34");
    }
}

export class FieldOfVision extends GameObject {
    constructor(position: Vector2D) {
        super(position, {x: 0, y: 0},
               [{ x: -2, y: -1 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
                { x: -2, y: 0 }, { x: -1, y: 0 },
                { x: -2, y: 1 }, { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }]
            , 'rgba(0, 191, 255, 0.3)')
    }
}

export enum Direction {
    Up = -90,
    Down = 90,
    Left = 0,
    Right = 180
}

export function getDirectionFov(input: Direction): Vector2D[] {
    switch (input) {
        case Direction.Left: return [ { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
         { x: -1, y: 0 },
        { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }];

        case Direction.Right: return [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }];

        case Direction.Down: return [{ x: -1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -1 }];

        case Direction.Up: return [{ x: -1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -1 }];
        default: throw new Error();
    }
}

export enum AntState {
    LeafFind = 'Ищет лист',
    HomeFind = 'Идёт домой',
    Death = 'Муравей мёртв',
    Run = 'Бежит от опасности'
}

export class Ant extends GameObject {
    stepToRotate = 10;
    stepToRun = 0;
    
    get state() { return this._state; }
    get direction() { return this._direction; }

    private _state: AntState = AntState.LeafFind;
    private _prevstate: AntState = AntState.LeafFind;
    private _direction: Direction = Direction.Left;
    private _blockedDirection: Direction = Direction.Left;

    constructor(position: Vector2D) {
        super(position, { x: 0, y: 0 }, [{ x: 0, y: 0 }], "#824b27");
    }

    getNextPosition(): Vector2D {
        switch (this._direction) {
            case Direction.Up: return { x: this.position.x, y: this.position.y + -1 };
            case Direction.Down: return { x: this.position.x, y: this.position.y + 1 };
            case Direction.Left: return { x: this.position.x - 1, y: this.position.y };
            case Direction.Right: return { x: this.position.x + 1, y: this.position.y };
            default: return this.position;
        }
    }

    rotate(): void {
        if (Math.random() < 0.5) {
            this._direction = getNextDirectionClockwise(this._direction);
        } else {
            this._direction = getNextDirectionAntiClockwise(this._direction);
        }

        if (this.state === AntState.Run) {
            while (this._direction === this._blockedDirection) {
                this._direction = getInvertDirection(this._blockedDirection);
            }
        }
    }

    setStatus(s: AntState): void {
        if (s !== this._state) {
            this._prevstate = this._state;
            this._state = s;
        }
        

        if (s === AntState.Run) {
            this.stepToRun = 100;
            this._blockedDirection = this._direction;
            this._direction = getInvertDirection(this._direction);
        }

        const out = document.getElementById('status-text');
        if (out != null) {
            out.innerText = s;
        }
    }

    runEnd() {
        this._state = this._prevstate;
    }

    setDirection(d: Direction): void {
        this._direction = d;
    }
}

function getNextDirectionClockwise(input: Direction) {
    switch (input) {
        case Direction.Up: return Direction.Right;
        case Direction.Down: return Direction.Left;
        case Direction.Left: return Direction.Up;
        case Direction.Right: return Direction.Down;
        default: return input;
    }
}

function getNextDirectionAntiClockwise(input: Direction) {
    switch (input) {
        case Direction.Up: return Direction.Left;
        case Direction.Down: return Direction.Right;
        case Direction.Left: return Direction.Down;
        case Direction.Right: return Direction.Up;
        default: return input;
    }
}

function getInvertDirection(input: Direction) {
    switch (input) {
        case Direction.Up: return Direction.Down;
        case Direction.Down: return Direction.Up;
        case Direction.Left: return Direction.Right;
        case Direction.Right: return Direction.Left;
        default: return input;
    }
}

export class Wall extends GameObject {
    constructor(position: Vector2D, cells: Vector2D[]) {
        super(position, { x: 0, y: 0 }, cells, "#000000");
    }

    static square(position: Vector2D, width: number, height: number, isNotFill?: Boolean): Wall {
        const cells: Vector2D[] = [];

        for(let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if (isNotFill && ((x !== 0 && x !== width - 1) && (y !== 0 && y !== height - 1))) {
                    continue;
                }

                cells.push({x: x, y: y});
            }
        }

        return new Wall(position, cells);
    }
}

export class Danger extends GameObject {
    constructor(position: Vector2D) {
        super(position, { x: 0, y: 0 }, [{ x: 0, y: 0 }], "#FF0000");
    }
}