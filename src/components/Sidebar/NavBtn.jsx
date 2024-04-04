import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const NavBtn= (props) => {
    return (
        <Link to={props.lk}>
            <i class={props.ic}></i>
            <span>{props.sp}</span>
        </Link>
    )
}

export default NavBtn