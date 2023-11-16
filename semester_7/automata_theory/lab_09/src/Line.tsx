interface ILineProps {
    start: {
        x: number;
        y: number;
    }

    end: {
        x: number;
        y: number;
    }
}

function Line(props: ILineProps) {
    return (
        <div style={{ position: 'absolute', top: props.start.y, left: props.start.x, width: props.end.x - props.start.x, height: props.end.y - props.start.y, background: 'black'}} />
    );
}

export default Line;