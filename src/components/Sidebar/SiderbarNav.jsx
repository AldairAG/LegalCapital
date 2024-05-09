import NavBtn from "./NavBtn"
import LogoutButton from "../LogoutButton/LogoutButton"

const SiderNav = () => {
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
                    <NavBtn lk="/Dashboard/comming-soon" ic="bi bi-diagram-3" sp="My network" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/dividend" ic="bi bi-graph-up-arrow" sp="dividend" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/comming-soon" ic="bi bi-person-vcard" sp="Withdrawals" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/comming-soon" ic="bi bi-bag" sp="E-comerce" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/comming-soon" ic="bi bi-archive" sp="Tools" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/comming-soon" ic="bi bi-exclamation-octagon" sp="Support" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/comming-soon" ic="bi bi-person-gear" sp="Edit profile" />
                </li>
            </ul>
        </nav>
    )
}

export default SiderNav