let canvasElement: HTMLCanvasElement | null;
let drawColorElement: HTMLInputElement | null;
let fillColorElement: HTMLInputElement | null;
let clearButtonElement: HTMLInputElement | null;

export function getCanvasElement(): HTMLCanvasElement {
    if (canvasElement == null) {
        const element = present(document.getElementById('canvas'));
        canvasElement = element as HTMLCanvasElement;
    }

    return canvasElement;
}

export function getDrawColor(): string {
    if (drawColorElement == null) {
        const element = present(document.getElementById('drawcolor'));
        drawColorElement = element as HTMLInputElement;
    }

    return present(drawColorElement.value);
}

export function getFillColor(): string {
    if (fillColorElement == null) {
        const element = present(document.getElementById('fillcolor'));
        fillColorElement = element as HTMLInputElement;
    }

    return present(fillColorElement.value);
}

export function getClearButton(): HTMLInputElement {
    if (clearButtonElement == null) {
        const element = present(document.getElementById('clearButton'));
        clearButtonElement = element as HTMLInputElement;
    }

    return clearButtonElement;
}

export function present<T>(value: T | null) : T {
    if (value == null) {
        throw new Error('Value is null.');
    }

    return value;
}