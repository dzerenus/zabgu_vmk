var canvas = document.getElementById('canvas');
var button = document.getElementById('button');
var ctx = canvas.getContext('2d');
var lines = [];
var drawLines = function () {
    if (ctx == null) {
        throw new Error();
    }
    ctx.clearRect(0, 0, 800, 800);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
    }
    ctx.closePath();
    ctx.stroke();
};
var prevPoint;
var addLine = function (coord) {
    if (prevPoint != null) {
        var line = {
            start: prevPoint,
            end: coord
        };
        lines.push(line);
        drawLines();
    }
    prevPoint = coord;
};
function getVector(line) {
    var x = line.end.x - line.start.x;
    var y = line.start.y - line.end.y;
    return { x: x, y: y };
}
function getLength(line) {
    var yDelta = line.end.y - line.start.y;
    var xDelta = line.end.x - line.start.x;
    return yDelta * yDelta + xDelta * xDelta;
}
var first = true;
var isRemove = false;
function getAngle(l1, l2) {
    var d1 = {
        x: l1.start.x - l1.end.x,
        y: l1.start.y - l1.end.y,
    };
    var d2 = {
        x: l2.end.x - l1.end.x,
        y: l2.end.y - l1.end.y,
    };
    var angle = Math.atan(-(d1.y) / d1.x);
    var d1y = 0;
    var d2y = d2.x * Math.sin(angle) + d2.y * Math.cos(angle);
    var d1x = d1.x * Math.cos(angle) - d1.y * Math.sin(angle);
    var d2x = d2.x * Math.cos(angle) - d2.y * Math.sin(angle);
    d1.x = d1x;
    d1.y = d1y;
    d2.x = d2x;
    d2.y = d2y;
    var up = Math.abs(d1.x * d2.x + d1.y * d2.y);
    var sqrt1 = Math.sqrt(d1.x * d1.x + d1.y * d1.y);
    var sqrt2 = Math.sqrt(d2.x * d2.x + d2.y * d2.y);
    var radians = Math.acos(up / (sqrt1 * sqrt2));
    var degrees = radians / Math.PI * 180;
    if (d2.x <= 0 && d2.y <= 0) {
        degrees = degrees;
        radians = radians;
    }
    else if (d2.x > 0 && d2.y < 0) {
        degrees = 180 - degrees;
        radians = Math.PI - radians;
    }
    else if (d2.x > 0 && d2.y > 0) {
        degrees = 180 + degrees;
        radians = Math.PI + radians;
    }
    else {
        degrees = 360 - degrees;
        radians = 2 * Math.PI - radians;
    }
    if (first) {
        if (degrees > 180) {
            isRemove = true;
        }
        first = false;
    }
    if (isRemove) {
        degrees = 360 - degrees;
        radians = 2 * Math.PI - radians;
    }
    return {
        degree: degrees,
        radian: radians
    };
}
canvas.onclick = function (e) {
    var rect = canvas.getBoundingClientRect();
    var x = Math.floor(e.clientX - rect.left + 1);
    var y = Math.floor(e.clientY - rect.top + 1);
    addLine({ x: x, y: y });
};
function endContur() {
    var s = lines[0];
    var e = lines[lines.length - 1];
    var line = {
        start: e.end,
        end: s.start
    };
    lines.push(line);
    drawLines();
}
function isLineInArray(line, arr) {
    return arr.filter(function (x) { return (x.end == line.end && x.start == line.start) || (x.start == line.end && x.end == line.start); }).length > 0;
}
var vektorMult = function (ax, ay, bx, by) {
    return ax * by - bx * ay;
};
var checkLinesCross = function (p1, p2, p3, p4) {
    var v1 = vektorMult(p4.x - p3.x, p4.y - p3.y, p1.x - p3.x, p1.y - p3.y);
    var v2 = vektorMult(p4.x - p3.x, p4.y - p3.y, p2.x - p3.x, p2.y - p3.y);
    var v3 = vektorMult(p2.x - p1.x, p2.y - p1.y, p3.x - p1.x, p3.y - p1.y);
    var v4 = vektorMult(p2.x - p1.x, p2.y - p1.y, p4.x - p1.x, p4.y - p1.y);
    if (v1 * v2 < 0 && v3 * v4 < 0) {
        return true;
    }
    return false;
};
function isIntersect(l1, l2) {
    return checkLinesCross(l1.start, l1.end, l2.start, l2.end);
}
button.onclick = function () {
    endContur();
    var sections = [];
    for (var _i = 0, lines_2 = lines; _i < lines_2.length; _i++) {
        var line1 = lines_2[_i];
        for (var _a = 0, lines_3 = lines; _a < lines_3.length; _a++) {
            var line2 = lines_3[_a];
            var section = {
                start: line1.start,
                end: line2.end
            };
            if (getLength(section) === 0) {
                continue;
            }
            if (isLineInArray(section, lines) || isLineInArray(section, sections)) {
                continue;
            }
            sections.push(section);
        }
    }
    sections.sort(function (a, b) { return getLength(a) - getLength(b); });
    var result = [];
    while (sections.length > 0) {
        var section = sections.shift();
        if (section == null) {
            throw new Error();
        }
        var intersect = false;
        for (var _b = 0, lines_4 = lines; _b < lines_4.length; _b++) {
            var line = lines_4[_b];
            if (isIntersect(section, line)) {
                intersect = true;
                break;
            }
        }
        for (var _c = 0, result_1 = result; _c < result_1.length; _c++) {
            var line = result_1[_c];
            if (isIntersect(section, line)) {
                intersect = true;
                break;
            }
        }
        if (!intersect && inPoly(getCenterDot(section))) {
            result.push(section);
        }
    }
    lines.push.apply(lines, result);
    drawLines();
};
function inPoly(v) {
    var npol = lines.length;
    var j = npol - 1;
    var c = false;
    for (var i = 0; i < npol; i++) {
        if ((((lines[i].start.y <= v.y) && (v.y < lines[j].start.y)) || ((lines[j].start.y <= v.y) && (v.y < lines[i].start.y))) &&
            (v.x > (lines[j].start.x - lines[i].start.x) * (v.y - lines[i].start.y) / (lines[j].start.y - lines[i].start.y) + lines[i].start.x)) {
            c = !c;
        }
        j = i;
    }
    return c;
}
function getCenterDot(line) {
    var xOffset = (line.end.x - line.start.x) / 2;
    var yOffset = (line.end.y - line.start.y) / 2;
    return {
        x: line.start.x + xOffset,
        y: line.start.y + yOffset
    };
}
