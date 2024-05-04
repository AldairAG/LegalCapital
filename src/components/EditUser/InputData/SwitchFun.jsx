import { useState,useEffect } from "react";
import { div } from "three/examples/jsm/nodes/Nodes.js"

const SwitchFun = (props) => {
    const [isChecked, setIsChecked] = useState(false);

    // Actualizar el estado isChecked basado en el permiso recibido
    useEffect(() => {
        if (props.permiso === "1") {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [props.permiso]);

    // Función para cambiar el valor del permiso en la posición específica
    const cambiarPermiso = () => {
        const nuevoPermiso = isChecked ? "0" : "1"; // Cambiar el valor del permiso
        props.actualizarPermiso(props.indice, nuevoPermiso); // Llamar a la función para actualizar el permiso en el componente padre
    };

    // Manejar el cambio de estado del checkbox
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Cambiar el estado isChecked
        cambiarPermiso(); // Llamar a la función para cambiar el valor del permiso
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

