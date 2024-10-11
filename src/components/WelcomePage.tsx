import {Link} from 'react-router-dom'

function WelcomePage() {
    return (
        <div className="welcome_page">
            <h1>RemindRX</h1>
            <Link to="/create-acct">
                <button>Create Account</button>
            </Link>
            <Link to="/login">
                <button>Login</button>
            </Link>
        </div>
    );
}
export default WelcomePage;