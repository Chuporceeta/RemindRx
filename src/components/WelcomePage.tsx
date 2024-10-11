import { Link } from 'react-router-dom';
import { useState } from 'react';

function WelcomePage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        /*
        --------------------------
            Insert login logic  
        --------------------------
        */
        console.log('Username: ', username);
        console.log('Password: ', password);
        /*
        -----------------------------------
            Insert authentication logic  
        -----------------------------------
        */
    };

    return (
        <div className="welcome_page">
            <h1>RemindRX</h1>

            {/* Login Form */}
            <div className="login_form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form_group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="button_group">
                        <button type="submit">Login</button>
                        <Link to="/create-account">
                            <button type="button">Create Account</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WelcomePage;
