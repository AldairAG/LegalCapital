import NavBtn from "./NavBtn"
import LogoutButton from "../LogoutButton/LogoutButton"
import { useState } from "react";

const SiderNav = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
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
                {/*                 <li onClick={toggleMenu}>
                    <NavBtn lk="" ic="bi bi-diagram-3" sp="Net" />
                    {menuVisible && (
                        <ul>
                        </ul>
                    )}
                </li> */}
                <li>
                    <NavBtn lk="/Dashboard/benefits" ic="bi bi-graph-up-arrow" sp="benefits" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/cooming-soon" ic="bi bi-person-vcard" sp="Withdrawals" />
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
            </ul>
        </nav>
    )
}

export default SiderNav