import "./Pack.css"
import sombra from "../../Assets/Images/Baners_jpg/sombra.png"
const Pack = (props) => {

    function visibleClick() {
        props.setIsVisible(true);
        props.setOpc(props.op)
        props.setImg(props.img)
    }

    return (
        <div class="CardPacks">
            <div className="imgPack">
                <img src={props.img} className="img1" alt="imgpack" />
                <img src={sombra} className="img2" alt="sombra" />
            </div>
            <div className="porcentaje">
                <p>Profit of up to {props.porcent}% monthly</p>
                <button onClick={visibleClick} className="boton1"><span class="button_top"> Buy</span></button>
            </div>
        </div>
    )
}

export default Pack