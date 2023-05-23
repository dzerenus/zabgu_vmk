import { present } from './lang';

export function getCanvas(): HTMLCanvasElement {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    return present(canvas);
}