import { present } from './lang';

// Загрузка изображения

const reader = new FileReader();
const loadImage = present(document.getElementById('loadfile')) as HTMLInputElement;

reader.onload = e => {
    const image = new Image();
    image.src = e.target.result as string;

    image.onload = () => {
        const canvas = present(document.getElementById('image-canvas')) as HTMLCanvasElement;
        const context = present(canvas.getContext('2d'));
        context.drawImage(image, 0, 0);
    }
};

loadImage.onchange = () => {
    const loadedFile = loadImage.files[0];

    if (loadedFile == null) {
        return;
    }

    const nameParts = loadedFile.name.split('.');

    if (nameParts[nameParts.length - 1] !== 'jpg' && nameParts[nameParts.length - 1] !== 'png') {
        loadImage.value = null;
        return;
    }

    reader.readAsDataURL(loadedFile);
}

// Подсчёт пикселей.

const rPixels: number[] = [];
const gPixels: number[] = [];
const bPixels: number[] = [];

function fillZero(pixelArray: number[]) {
    pixelArray.length = 0;

    for (let index = 0; index < 256; index++) {
        pixelArray.push(0);
    }
}

function drawGraphic(pixels: number[], color: string, canvas: HTMLCanvasElement, scale: number) {
    const rect = canvas.getBoundingClientRect();
    const context = present(canvas.getContext('2d'));
    context.clearRect(0, 0, rect.width, rect.height);
    context.lineWidth = 1;
    context.strokeStyle = color;
    context.beginPath();

    const minY = rect.height;

    for (let x = 0; x < pixels.length; x++) {
        const maxY = rect.height - pixels[x] * scale;

        context.moveTo(x, minY);

        if (maxY < 0) {
            context.lineTo(x, 0);
        } else {
            context.lineTo(x, maxY);
        }

    }

    context.stroke();
}

// Нажатие на кнопку.

const button = present(document.getElementById('proceedButton')) as HTMLInputElement;
const scaleElement = present(document.getElementById('scale')) as HTMLInputElement;

button.onclick = () => {
    const scale = Number.parseInt(scaleElement.value) / 100;

    if (scale == null || !Number.isFinite(scale)) {
        alert('Введите нормальное число!');
        return;
    }

    fillZero(rPixels);
    fillZero(gPixels);
    fillZero(bPixels);

    const canvas = present(document.getElementById('image-canvas')) as HTMLCanvasElement;
    const context = present(canvas.getContext('2d'));
    const imgdata = context.getImageData(0, 0, 200, 200)?.data;

    if (imgdata == null) {
        alert('Не задана картинка!');
        return;
    }

    for (let i = 0; i < imgdata.length; i += 4) {
        rPixels[imgdata[i]]++; 
        gPixels[imgdata[i+1]]++;
        bPixels[imgdata[i+2]]++;
    }

    const rCanvas = present(document.getElementById('rcanvas')) as HTMLCanvasElement;
    const gCanvas = present(document.getElementById('gcanvas')) as HTMLCanvasElement;
    const bCanvas = present(document.getElementById('bcanvas')) as HTMLCanvasElement;
    
    drawGraphic(rPixels, '#FF0000', rCanvas, scale);
    drawGraphic(gPixels, '#00FF00', gCanvas, scale);
    drawGraphic(bPixels, '#0000FF', bCanvas, scale);
}

