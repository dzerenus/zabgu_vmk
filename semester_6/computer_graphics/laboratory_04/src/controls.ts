import { present } from './lang';

export const upButton = present(document.getElementById('up-btn') as HTMLInputElement);
export const leftButton = present(document.getElementById('left-btn') as HTMLInputElement);
export const autoButton = present(document.getElementById('auto-btn') as HTMLInputElement);
export const downButton = present(document.getElementById('down-btn') as HTMLInputElement);
export const rightButton = present(document.getElementById('right-btn') as HTMLInputElement);
export const zLeftButton = present(document.getElementById('zleft-btn') as HTMLInputElement);
export const zRightButton = present(document.getElementById('zright-btn') as HTMLInputElement);

export const xInput = present(document.getElementById('x-input') as HTMLInputElement);
export const yInput = present(document.getElementById('y-input') as HTMLInputElement);
export const zInput = present(document.getElementById('z-input') as HTMLInputElement);