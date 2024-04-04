import "./styles/MSComponent.css"
import QrComponent from './QrComponent';

const MSComponent = (props) => {
    return (
        <div className="planComp">
            <div className="precio">
                <span className="nombre">Plan {props.plan}</span>
                <span className="costo">{props.precio}<span className="usdt">USDT</span></span>
            </div>
            <div className="feat"> 
                <QrComponent />
            </div>
        </div>
    )
}

export default MSComponent