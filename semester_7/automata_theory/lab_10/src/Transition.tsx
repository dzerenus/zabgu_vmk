import './transition.css';

interface ITransitionProps {
    x: number;
    y: number;
    active?: boolean;
}

function Transition(props: ITransitionProps) {
    let color = 'black';
    
    if (props.active) {
        color = 'red';
    }

    return (
        <div className="transition" style={{position: 'absolute', top: props.y, left: props.x, background: color}}>

        </div>
    );
}

export default Transition;