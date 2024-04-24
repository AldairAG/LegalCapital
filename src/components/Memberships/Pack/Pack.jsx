import "./Pack.css"
const Pack = (props) => {

    function visibleClick() {
        props.setIsVisible(!props.isVisible);
    }

    return (
        <div class="card">
            <div className="imgPack">
                <img src={props.img} alt="imgpack" />
            </div>
            <button onClick={visibleClick} class="btn1">Get</button>
        </div>
    )
}

export default Pack