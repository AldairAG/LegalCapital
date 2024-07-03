import { useState,useEffect } from "react"
import "./Ordenes.css"
import OrdenModel from "../../model/OrdenModel"
const Ordenes = (props) => {
    const [ordenes, setOrdenes] = useState([])
    const ordenData=new OrdenModel()
    const [isLoading,setIsLoading]=useState(true)

    useEffect( () => {
        ordenData.getOrdenes(setOrdenes);
    }, [props.userName]);

    useEffect(() => {
        if (ordenes.length > 0) {
            console.log(ordenes);
            setIsLoading(false);
        }else{
            console.log(ordenes.length);
        }
    }, [ordenes]);

    return (
        <section className="Ordenes-ec">
            <div className="sec0-oec">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Order number
                            </th>
                            <th>
                                Total
                            </th>
                            <th>
                                State
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading?(
                            <div className="spinner"></div>
                        ):(
                            ordenes.length > 0 ? (
                                ordenes.map((item) => (
                                    <tr key={item.userName}>
                                        <td >{item.fecha}</td>
                                        <td >{item.numeroOrden}</td>
                                        <td >{item.totalPagar} USDT</td>
                                        <td >{item.estado}</td>
                                        <td><button>View details</button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No orders</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
export default Ordenes