class GameEngine {
    private static _instance: GameEngine | undefined;
    private static _counter = 0;

    constructor() {
        setInterval(this.draw, 50);
    }

    static getInstance(): GameEngine {
        if (this._instance == null) {
            this._instance = new GameEngine();      
        }

        return this._instance;
    }

    private draw() {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        const ctx = canvas?.getContext('2d');

        if (ctx == null) {
            throw new Error('Context не найден.');
        }

        const cellsY = 800 / 10;
        const cellsX = 800 / 10;

        ctx.clearRect(0, 0, 800, 800);
        ctx.strokeStyle = '#e0e0e0';
        ctx.beginPath();

        for (let xCell = 0; xCell < cellsX; xCell++) {
            const posX = xCell * 10;

            ctx.moveTo(posX, 0);
            ctx.lineTo(posX, 800);
        }

        for (let yCell = 0; yCell < cellsY; yCell++) {
            const posY = yCell * 10;

            ctx.moveTo(0, posY);
            ctx.lineTo(800, posY);
        }

        ctx.stroke();
    }
}

export default GameEngine;