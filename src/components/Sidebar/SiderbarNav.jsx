import NavBtn from "./NavBtn"
import LogoutButton from "../LogoutButton/LogoutButton"
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { getAuth, signOut } from "firebase/auth"
import appFirebase from "../../firebase-config";
const auth = getAuth(appFirebase)

const SiderNav = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Usuario desconectado exitosamente");
            })
            .catch((error) => {
                console.error("Error al desconectar al usuario:", error);
            });
    };

    return (
        <nav class="navegacion">
            <ul>
                <h4>Main menu</h4>
                <hr />
                <li>
                    <NavBtn lk="/Dashboard/home" ic="bi bi-house" sp="Home" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/packs" ic="bi bi-boxes" sp="Products" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/My-net" ic="bi bi-people" sp="My net" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/My-net-genealogy" ic="bi bi-diagram-3" sp="Genealogy" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/benefits" ic="bi bi-graph-up-arrow" sp="benefits" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/withdrawals" ic="bi bi-person-vcard" sp="withdrawals" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/E-comerce" ic="bi bi-bag" sp="E-comerce" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/cooming-soon" ic="bi bi-archive" sp="Tools" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/Support" ic="bi bi-exclamation-octagon" sp="Support" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/Profile" ic="bi bi-person-gear" sp="Edit profile" />
                </li>
                <li onClick={handleLogout}>
                    <Link to={"/"}>
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default SiderNav