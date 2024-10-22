import { useEffect, useState } from "react"
import TextInput from "../../../components/TextInput/TextInput"
import AlertMsg from "../../../components/AlertMsg/AlertMsg"
import AlertMsgError from "../../../components/AlertMsg/AlertMsgError"

const PagarFacturas = () => {   
    const errores={igualCero:"el valor no puede ser 0"}
    const [cantidad,setCantidad]=useState(0)
    const [texto,setTexto]=useState("")
    const [visible,setVisible]=useState(false)
    const [visibleError,setVisibleError]=useState(false)

    const pagar =()=>{
        if(!validacion())return



    }

    const validacion=()=>{
        if(cantidad===0){
            setTexto(errores.igualCero)
            setVisibleError(true)
            console.log(errores.igualCero)
            return false
        }
    }

    return (
        <section>
            <AlertMsgError texto={texto} visible={visibleError} setVisible={setVisibleError}/>
            <AlertMsg texto={texto} visible={visible} setVisible={setVisibleError}/>
            <TextInput ti={"Amount to withdraw(USDT)"} value={cantidad} setValue={setCantidad} />
            <button onClick={pagar}>Pay</button>
        </section>
    )
}

export default PagarFacturas