import img1 from "../../../Assets/Images/Logos/usdt.png"
import "./Retiros.css"
import TextInput from "../../../components/TextInput/TextInput"
const Retiros = (props) => {
    return (
        <section className="contenido Retiros">
            <div className="titulos titulo-re">
                <i className="bi bi-person-gear"></i>
                <span>Retiros</span>
            </div>
            <div className="contenido-re">
                <div className="se0-re"><p>Selecciona tu wallet</p></div>
                <div className="se1-re">
                    <section className="contain-data">
                        <div className="case">
                            <p class="text-sm text-muted-foreground">Divident wallet</p>
                            <div className="case2">
                                <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">$ {props.walletDiv}</h3>
                                <img src={img1} alt="logo_usdt" />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="se2-re">
                    <section className="contain-data">
                        <div className="case">
                            <p class="text-sm text-muted-foreground">Comission wallet</p>
                            <div className="case2">
                                <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">$ {props.walletDiv}</h3>
                                <img src={img1} alt="logo_usdt" />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="se3-re">
                    <TextInput />
                </div>
                <div className="se4-re">
                    <TextInput />
                </div>
                <div className="se5-re">
                    <button className="btn1"><span className="top_buton">Solicitar retiro</span></button>
                </div>
                <div className="notas-re"></div>
            </div>
        </section>
    )
}

export default Retiros