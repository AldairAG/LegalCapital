import { useState } from "react"
import "./Ordenes.css"
const Ordenes = () => {
    const [ordenes,setOrdenes]=useState([])
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
                                Number of Order
                            </th>
                            <th>
                                Total
                            </th>
                            <th>
                                State
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes && ordenes.length > 0 ? (
                            ordenes.map((item) => (
                                <tr key={item.userName}>
                                    <td className="p-4 align-middle">{item.userName}</td>
                                    <td className="p-4 align-middle">{item.firstName + " " + item.lastName}</td>
                                    <td className="p-4 align-middle">{item.admissionDate}</td>
                                    <td className="p-4 align-middle">{item.Country}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-4 align-middle">No orders</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
export default Ordenes