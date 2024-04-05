import "./styles/WelcomeDiv.css"

const WelcomeDiv = () => {
    return (
        <div className="welcomeDiv">
            <div className="welDiv">
                <span className="welcome">Welcome to </span>
                <img className="logo" alt="logo"/>
            </div>
            <span className="textWel">Texto de bienvenida Texto de bienvenida Texto de bienvenida</span>
            <div className="textWel2">
                <span >To get started select one of our memberships</span>
            </div>

        </div>
    )
}

export default WelcomeDiv