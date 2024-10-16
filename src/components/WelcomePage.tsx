import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';

function WelcomePage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        /*
        ------------------Login Auth Logic ------------------
        const loginAuthEndpoint = "OUR_API_BACKEND_CONNECTOR"
        const loginData = {
            username: username,
            password: password
        };
        try {
            const response = await fetch(loginAuthEndpoint, {
                method: 'POST', 
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            const data = await response.json()
            if(response.ok){
                localStorage.setItem('authToken', data.token);
                navigate('/home')
            }
            else{
                console.log('Login failed: ', data.message)
            }
        }
        catch (error){
            console.error('Error during login:', error)
        }
        */
       navigate('/home');
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4">
            <h1 className="text-5xl font-bold">RemindRX</h1>
            <div className="bg-white border border-gray-200 shadow-md p-6 rounded-lg space-y-2 text-center">
                <form onSubmit={handleLogin}>
                    <div className="mb-4 flex flex-col">
                        <input
                            className="border border-gray-300 p-2 rounded-lg w-full"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <input
                            className="border border-gray-300 p-2 rounded-lg w-full"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-600" type="submit">Login</button>
                        <Link to="/create-account">
                            <button className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-600" type="button">Create Account</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WelcomePage;
