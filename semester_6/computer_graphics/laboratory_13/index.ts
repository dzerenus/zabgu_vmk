const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const button = document.getElementById('button') as HTMLInputElement;

const ctx = canvas.getContext('2d');

interface Coordinate {
    x: number;
    y: number;
}

interface Angle {
    degree: number;
    radian: number;
}

interface Line {
    start: Coordinate;
    end: Coordinate;
}

const lines: Line[] = [];
const drawLines = () => {

    if (ctx == null) {
        throw new Error();
    }

    ctx.clearRect(0, 0, 800, 800);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;

    for (var line of lines) {
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
    }

    ctx.closePath();
    ctx.stroke();
}

let prevPoint: Coordinate | undefined;
const addLine = (coord: Coordinate) => {
    if (prevPoint != null) {
        const line: Line =
        {
            start: prevPoint,
            end: coord
        };

        lines.push(line);
        drawLines();
    }

    prevPoint = coord;
}

function getLength(line: Line): number {
    const yDelta = line.end.y - line.start.y;
    const xDelta = line.end.x - line.start.x;

    return yDelta * yDelta + xDelta * xDelta;
}

canvas.onclick = function (e: MouseEvent) {
    const rect = canvas.getBoundingClientRect();

    const x = Math.floor(e.clientX - rect.left + 1);
    const y = Math.floor(e.clientY - rect.top + 1);

    addLine({ x: x, y: y });
};

function endContur() {
    const s = lines[0];
    const e = lines[lines.length - 1];

    const line: Line = {
        start: e.end,
        end: s.start
    }

    lines.push(line);
    drawLines();
}

function isLineInArray(line: Line, arr: Line[]): boolean {
    return arr.filter(x => (x.end == line.end && x.start == line.start) || (x.start == line.end && x.end == line.start)).length > 0;
}

const vektorMult = (ax: number, ay: number, bx:number, by: number) => {
    return ax*by-bx*ay;
  }

const checkLinesCross = (p1: Coordinate, p2: Coordinate, p3: Coordinate, p4: Coordinate) => {
    const v1 = vektorMult(p4.x - p3.x, p4.y - p3.y, p1.x - p3.x, p1.y - p3.y);
    const v2 = vektorMult(p4.x - p3.x, p4.y - p3.y, p2.x - p3.x, p2.y - p3.y);
    const v3 = vektorMult(p2.x - p1.x, p2.y - p1.y, p3.x - p1.x, p3.y - p1.y);
    const v4 = vektorMult(p2.x - p1.x, p2.y - p1.y, p4.x - p1.x, p4.y - p1.y);

    if (v1 * v2 < 0 && v3 * v4 < 0) {
        return true;
    }

    return false;
}

function isIntersect(l1: Line, l2: Line): boolean {
    return checkLinesCross(l1.start, l1.end, l2.start, l2.end);
}

button.onclick = function () {
    endContur();

    const sections: Line[] = [];
 
    for (const line1 of lines) {
        for (const line2 of lines) {
            const section: Line = {
                start: line1.start, 
                end: line2.end
            }

            if (getLength(section) === 0) {
                continue;
            }

            if (isLineInArray(section, lines) || isLineInArray(section, sections)) {
                continue;
            }

            sections.push(section);
        }
    }

    sections.sort((a, b) => getLength(a) - getLength(b));

    const result: Line[] = [];
    while (sections.length > 0) {
        const section = sections.shift();

        if (section == null) {
            throw new Error();
        }

        let intersect = false;
        for (const line of lines) {
            if (isIntersect(section, line)) {
                intersect = true;
                break;
            }
        }
        
        for (const line of result) {
            if (isIntersect(section, line)) {
                intersect = true;
                break;
            }
        }
        
        if (!intersect  && inPoly(getCenterDot(section))) {
            result.push(section);
        }
    }

    lines.push(...result);
    drawLines();
}

function inPoly(v: Coordinate) {
    var npol = lines.length;
    var j = npol - 1;
    let c: boolean = false;
    for (var i = 0; i < npol; i++) {
        if ((((lines[i].start.y <= v.y) && (v.y < lines[j].start.y)) || ((lines[j].start.y <= v.y) && (v.y < lines[i].start.y))) &&
            (v.x > (lines[j].start.x - lines[i].start.x) * (v.y - lines[i].start.y) / (lines[j].start.y - lines[i].start.y) + lines[i].start.x)) {
            c = !c
        }
        j = i;
    }
    return c;
}

function getCenterDot(line: Line): Coordinate {
    const xOffset = ( line.end.x - line.start.x ) / 2;
    const yOffset = ( line.end.y - line.start.y ) / 2;

    return {
        x: line.start.x + xOffset,
        y: line.start.y + yOffset
    }

}