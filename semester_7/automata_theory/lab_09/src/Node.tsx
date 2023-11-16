import './node.css';

interface INodeProps {
    value: number;
    x: number;
    y: number;
}

function Node(props: INodeProps) {
    return (
        <div className="node" style={{ position: 'absolute', top: props.y, left: props.x }}>
            {props.value}
        </div>
    );
}

export default Node;