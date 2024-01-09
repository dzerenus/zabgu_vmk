interface ITextProps {
    children: React.ReactNode;
    x: number;
    y: number;
}

function Text(props: ITextProps) {
    return (
        <div style={{position: 'absolute', top: props.y, left: props.x}}>{props.children}</div>
    );
}

export default Text;