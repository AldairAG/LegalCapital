import "./CardData.css"
const CardData = (props) => {
    return (
        <section className={`contain-data${props.type ? '' : '-2'}`}>
            <div className={props.type ? 'none' : 'contain2'}>
                <div className="containImg">
                    <img src={props.image} alt="icono" />
                </div>
            </div>
            <div className="contain1">
                <div className="title">
                    <img className={props.type ? 'logo' : 'none'} alt="logo_usdt" />
                    <p>{props.titulo}</p>
                    <p className={props.type ? 'percent' : 'none'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" fill="currentColor" height="20" width="20">
                            <path d="M1408 1216q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45 19-45l448-448q19-19 45-19t45 19l448 448q19 19 19 45z">
                            </path>
                        </svg> 20%
                    </p>
                </div>
                <div className="data">
                    <p>$0.00</p>
                    <div className="range">
                        <div className="fill">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CardData