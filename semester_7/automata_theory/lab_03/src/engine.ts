import { GameObject, Home, Leaf, Ant, Vector2D, Wall, FieldOfVision, getDirectionFov, AntState, Direction, Danger } from './types';

const cellSize = 10;
let gameObjects: GameObject[] = [];
let fieldSize: Vector2D = { x: 0, y: 0 };

let isDown = false;
function callCanvasClick(canvas: HTMLCanvasElement) {
    canvas.onmousedown = () => isDown = true;
    canvas.onmouseup = () => isDown = false;
    canvas.onmouseout = () => isDown = false;

    const rect = canvas.getBoundingClientRect();

    canvas.onmousemove = (event) => {
        if (!isDown) {
            return;
        }

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const cell = {
            x: Math.floor(mouseX / cellSize),
            y: Math.floor(mouseY / cellSize),
        }

        const danger = new Danger(cell);

        if (gameObjects.some(go => go.isCollision(danger) && !(go instanceof Ant) && !(go instanceof FieldOfVision))) {
            return;
        }

        gameObjects.push(new Danger(cell))
    }
}

class Engine {
    private static _instance: Engine | undefined;

    private canvasSize: Vector2D = { x: 0, y: 0 };

    constructor() {
        setInterval(this.draw, 40);
    }

    static getInstance(): Engine {
        if (this._instance == null) {
            this._instance = new Engine();      
        }

        return this._instance;
    }

    private draw() {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;

        if (fieldSize.x === 0) {
            callCanvasClick(canvas);
            const rect = canvas.getBoundingClientRect();

            this.canvasSize = { 
                x: rect.width, 
                y: rect.height,
            };

            fieldSize = { 
                x: this.canvasSize.x / cellSize, 
                y: this.canvasSize.y / cellSize,
            };

            gameObjects.push(new Ant({x: fieldSize.x / 2 - 2, y: fieldSize.y / 2}));
            gameObjects.push(new Home({x: fieldSize.x / 2, y: fieldSize.y / 2}));
            gameObjects.push(Wall.square({x: 0, y: 0}, fieldSize.x, fieldSize.y, true));
            gameObjects.push(new FieldOfVision({x: fieldSize.x / 2 - 2, y: fieldSize.y / 2}));

            for (let i = 0; i < getRandomInt(1) + 15; i++) {
                const width = getRandomInt(15) + 2;
                const height = getRandomInt(15) + 2;
                const x = getRandomInt(fieldSize.x - width);
                const y = getRandomInt(fieldSize.y - height);
                
                const wall = Wall.square({x: x, y: y}, width, height);

                if (wall.isCollision(gameObjects[0]) || wall.isCollision(gameObjects[1])) {
                    i--;
                    continue;
                }

                gameObjects.push(wall);
            }
        }

        createLeafIfNeed();
        doNextStep();

        const ctx = canvas?.getContext('2d');

        if (ctx == null) {
            throw new Error();
        }

        ctx.clearRect(0, 0, this.canvasSize.x, this.canvasSize.y);
        gameObjects.forEach(go => drawGameObject(go, ctx));
        drawCells(ctx, this.canvasSize);
    }
}

function drawCells(ctx: CanvasRenderingContext2D, canvasSize: Vector2D) {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.beginPath();

    for (let x = 0; x < fieldSize.x; x++) {
        const posX = x * cellSize;

        ctx.moveTo(posX, 0);
        ctx.lineTo(posX, canvasSize.y);
    }

    for (let y = 0; y < fieldSize.y; y++) {
        const posY = y * cellSize;

        ctx.moveTo(0, posY);
        ctx.lineTo(canvasSize.x, posY);
    }

    ctx.stroke();
}

function drawGameObject(go: GameObject, ctx: CanvasRenderingContext2D) {
    const goPositions = go.cellsPositions;

    for (const position of goPositions) {
        const x = position.x * cellSize;
        const y = position.y * cellSize;

        ctx.fillStyle = go.color;
        ctx.fillRect(x, y, cellSize, cellSize);
    }
}

let timeout = 0;

function doNextStep() {
    const ants: Ant[] = gameObjects.filter(x => x instanceof Ant) as any;
    const fov = gameObjects.find(x => x instanceof FieldOfVision) as FieldOfVision;

    for (const ant of ants) {
        const dangers = gameObjects.filter(go => go instanceof Danger);

        if (ant.state === AntState.Death && '1' === '1') {
            continue;
        }

        if (dangers.some(go => go.isCollision(ant))) {
            console.log('МУРАВЕЙ УМЕР!!!');
            alert(AntState.Death);
        }


        if (ant.stepToRotate <= 0) {
            ant.rotate();

            if (ant.state === AntState.Run) {
                ant.stepToRotate = getRandomInt(5);
            } else {
                ant.stepToRotate = getRandomInt(30);
            }

        }

        const step = ant.getNextPosition();
        const collisionGo = gameObjects.find(go => !(go instanceof FieldOfVision) && go.isVectorCollision(step));

        if (collisionGo instanceof Wall || collisionGo instanceof Danger) {
            ant.rotate();
        } else {
            ant.setPosition(step);
            fov.setPosition(step);
        }

        if (dangers.some(go => go.isCollision(fov)) && ant.state !== AntState.Death) {
            ant.setStatus(AntState.Run);
            console.log(ant.state);
        }

        if (ant.state === AntState.Run) {
            if (ant.stepToRun <= 0) {
                ant.runEnd();
                console.log(ant.state);
            }

            ant.stepToRun--;
        }

        if (ant.state === AntState.LeafFind) {
            const leafCollision = gameObjects.find(go => (go instanceof Leaf) && go.isCollision(fov)) as Leaf;

            if (leafCollision != null) {
                ant.setStatus(AntState.HomeFind);
                gameObjects = gameObjects.filter(x => x !== leafCollision);
                console.log(ant.state);
            }
        }

        if (ant.state === AntState.HomeFind) {
            const home = gameObjects.find(x => x instanceof Home) as Home;

            if (collisionGo instanceof Wall) {
                timeout = getRandomInt(15) + 15;
            }

            if (timeout <= 0) {
                const yDelta = home.position.y - ant.position.y;
                const xDelta = home.position.x - ant.position.x;

                if ((yDelta < -2 || yDelta > 2)) {
                    if (yDelta < -2) {
                        ant.setDirection(Direction.Up);
                    }
        
                    else if (yDelta > 2) {
                        ant.setDirection(Direction.Down);
                    }
    
                } 

                else if ((xDelta < -2 || xDelta > 2)) {
                    if (xDelta < -2) {
                        ant.setDirection(Direction.Left);
                    }
        
                    else if (xDelta > 2) {
                        ant.setDirection(Direction.Right);
                    }
                }
            }

            timeout--;

            if (home.isCollision(fov)) {
                ant.setStatus(AntState.LeafFind);
                console.log(ant.state);
            }
        }

        fov.setCells(getDirectionFov(ant.direction));
        ant.stepToRotate--;
    }
}

let lastLeafSpawnFrameCount = 9999999;
const leafSpawnFrameRate = 1;
const maxLeafCount = 45;

function createLeafIfNeed() {
    if (gameObjects.filter(x => x instanceof Leaf).length >= maxLeafCount) {
        return;
    }

    if (lastLeafSpawnFrameCount > leafSpawnFrameRate) {
        const x = getRandomInt(fieldSize.x);
        const y = getRandomInt(fieldSize.y);
        const leaf = new Leaf({ x: x, y: y });
        
        for (const go of gameObjects) {
            if (leaf.isCollision(go)) {
                return;
            }
        }
        
        gameObjects.push(leaf);
        lastLeafSpawnFrameCount = 0;
    }

    lastLeafSpawnFrameCount++;
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

export default Engine;