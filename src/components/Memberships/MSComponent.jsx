import "./styles/MSComponent.css"
import QrComponent from './QrComponent';

const MSComponent = (props) => {
    return (
        <div className="componentMS">
            <div className="header">
                <span className="nameMS">Plan {props.plan}</span>
                <span className="priceMS">{props.precio}<span className="usdt">USDT</span></span>
            </div>
            <div className="containQR"> 
                <div className="containFeatures">s</div>
                <QrComponent/>
            </div>
        </div>
    )
}

export default MSComponent