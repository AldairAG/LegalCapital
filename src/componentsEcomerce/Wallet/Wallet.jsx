import { useState } from "react"
import "./Wallet.css"
import img1 from "../../Assets/Images/Logos/usdt.png"
const Wallet = () => {
    const [wallet, setWallet] = useState(0)
    const [historial, setHistorial] = useState([])
    return (
        <section className="Wallet-ec">
            <div className="sec0-wec"><p>Current balance</p></div>
            <div className="sec1-wec">
                <div>
                    <img src={img1} alt="ustd_logo" />
                    <p>{wallet} USDT</p>
                </div>
                <button>Add</button>
            </div>
            <div className="sec2-wec"><p>transaction history</p></div>
            <div className="sec3-wec">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Hour
                            </th>
                            <th>
                                Amount
                            </th>
                            <th>
                                Concepto
                            </th>
                            <th>
                                Emisor
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial && historial.length > 0 ? (
                            historial.map((item) => (
                                <tr key={item.userName}>
                                    <td className="p-4 align-middle">{item.userName}</td>
                                    <td className="p-4 align-middle">{item.firstName + " " + item.lastName}</td>
                                    <td className="p-4 align-middle">{item.admissionDate}</td>
                                    <td className="p-4 align-middle">{item.Country}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="p-4 align-middle">No history</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )

}
export default Wallet