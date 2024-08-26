import { useState, useEffect } from "react"

const SwitchFun = (props) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (props.permiso === "1") {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [props.permiso]);

    const cambiarPermiso = () => {
        const nuevoPermiso = isChecked ? "0" : "1";
        props.actualizarPermiso(props.indice, nuevoPermiso);
    };

    const handleCheckboxChange = () => {
        if (props.tipo == 0) {
            if (props.permiso != 1) {
                setIsChecked(!isChecked);
                cambiarPermiso();
            }
        } else {
            setIsChecked(!isChecked);
            cambiarPermiso();
        }
    };

    return (
        <>
            <p className="nameA">{props.titulo}</p>
            <label className="switch">
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                <span className="slider"></span>
            </label>
        </>
    );
};

export default SwitchFun

