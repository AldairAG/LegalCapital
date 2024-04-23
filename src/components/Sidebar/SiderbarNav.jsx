import NavBtn from "./NavBtn"

const SiderNav = () => {
    return (
        <nav class="navegacion">
            <ul>
                <h4>Main menu</h4>
                <hr />
                <li>
                    <NavBtn lk="" ic="bi bi-house" sp="Home" />
                </li>
                <li>
                    <NavBtn lk="" ic="bi bi-boxes" sp="Products" />
                </li>
            </ul>
        </nav>
    )
}

export default SiderNav