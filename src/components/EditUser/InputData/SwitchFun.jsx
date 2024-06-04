import { useState,useEffect } from "react";
import { div } from "three/examples/jsm/nodes/Nodes.js"

const SwitchFun = (props) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (props.permiso == "1") {
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
        setIsChecked(!isChecked);
        cambiarPermiso();
    };

    return (
        <>
            <p className="nameA">{props.titulo}</p>
            <label className="switch">
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
                <span className="slider"></span>
            </label>
        </>
    );
};

export default SwitchFun

