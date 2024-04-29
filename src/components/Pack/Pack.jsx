import "./Pack.css"
const Pack = (props) => {

    function visibleClick() {
        props.setIsVisible(true);
        props.setOpc(props.op)
        props.setImg(props.img)
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