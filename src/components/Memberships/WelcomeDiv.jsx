import "./styles/WelcomeDiv.css"

const WelcomeDiv = (props) => {
    return (
        <div className="contain-wd">
            <div className="contain-msg">
                <span className="welcome">Welcome to </span>
                <img className="logo" alt="logo" />
            </div>
            <span className="textWel">Congratulations!, {props.username}!</span>
            <span className="textWel">
                You're embarking on a journey towards financial 
                success with Legal Capital Corp. We provide the tools 
                and support for your financial goals. Welcome aboard!
            </span>
            <div className="textWel2">
                <span >Join us on our journey to financial
                    empowerment! Be one of the first 500 lucky
                    individuals to become a founding member by
                    selecting one of our exclusive memberships.
                    Start your journey today!
                </span>
            </div>

        </div>
    )
}

export default WelcomeDiv