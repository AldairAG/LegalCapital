import NavBtn from "./NavBtn"

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
                    <NavBtn lk="/Dashboard/comming-soon" ic="bi bi-bag" sp="Shop" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/comming-soon" ic="bi bi-exclamation-octagon" sp="Support" />
                </li>
                <li>
                    <NavBtn lk="/Dashboard/comming-soon" ic="bi bi-person-gear" sp="Settings" />
                </li>
            </ul>
        </nav>
    )
}

export default SiderNav