import "./TextInput.css"

const TextInput=(props)=>{
    return(
        <div className="TextInput">
            <p className="textoM2">{props.ti}</p>
            <input type="text" value={props.value} onChange={(e) => props.setValue(e.target.value)}/>
        </div>
    )
}
export default TextInput