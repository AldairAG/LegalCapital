import "./CardUser.css"
const CardUser = (props) => {
    return (
        <section className="userDetail">
            <img className='rangoImg' alt="rango" />
            <p className='p0'>UserName</p>
            <p className='p1'>No rank</p>
            <div className="datosUser">
                <p className='p2'>Team capital: $0</p>
                <p className='p2'>fecha de activacion: 24/24/2222</p>
                <p className='p2'>Paquete actual:</p>
            </div>

            <div class="tablaRed">
                <div className="datosRedes">
                    <p className="titulo">My network</p>
                    <p className="datoRed">0</p>
                </div>
                <div className="datosRedes">
                    <p className="titulo">Total network</p>
                    <p className="datoRed">0</p>
                </div>
            </div>
        </section>
    )
}
export default CardUser