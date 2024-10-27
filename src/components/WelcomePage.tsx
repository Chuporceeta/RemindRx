import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {Text, Stack, PrimaryButton, TextField, IStackStyles, IStackTokens} from '@fluentui/react'
import { initializeIcons } from '@fluentui/font-icons-mdl2'
import { logInUser } from "../scripts/userAuth.tsx";
import {getFCMToken} from "../scripts/FCM.tsx";

initializeIcons();

function WelcomePage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const stackS: IStackStyles = {root: {width: '150%', maxWidth: '400px', margin: '0 auto', padding: '20px'}};
    const stackTkn: IStackTokens = {childrenGap: 25, padding: 20};
    const buttonStyle = {
        root: {margin: '0 8px', border: 'none'},
        rootHovered:{backgroundColor: '#caf0f8', border: 'none'}
    };
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const user = await logInUser(email, password);
            console.log('User logged in:', user);
            getFCMToken();
            navigate('/home');
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            } else {
                console.log('An unknown error occurred');
            }
        }
    };
    return (
        <Stack 
            horizontalAlign="center"
            verticalAlign="center"
            styles={{root: {minHeight: '100vh', backgroundColor: '#f0f0f0'}}}
        >
            <Stack horizontalAlign="center" tokens={stackTkn} styles={stackS}>
                <Text variant="xxLarge" block styles={{root: {fontSize: '60px', fontWeight: '900'}}}>RemindRX</Text>
                <Stack
                    styles={{root:{
                            backgroundColor: 'white',
                            padding: '24px',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                            border: '1px solid #e5e7eb',
                            width: '100%',              
                    }}}
                    tokens={{ childrenGap: 16 }}>
                    <form onSubmit={handleLogin}>
                        <Stack tokens={{ childrenGap: 15 }}>
                            <TextField
                                placeholder="Email"
                                value={email}
                                onChange={(_, newValue) => setEmail(newValue || '')}
                                required
                            />
                            <TextField
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(_, newValue) => setPassword(newValue || '')}
                                canRevealPassword={true}
                                required
                            />
                            <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 6 }}>
                                <PrimaryButton text="Login" type="submit" styles={buttonStyle}/>
                                <Link to="/create-account" style={{ textDecoration: 'none' }}>
                                    <PrimaryButton text="Create Account" styles={buttonStyle}/>
                                </Link>
                            </Stack>
                        </Stack>
                    </form>
                </Stack>
            </Stack>
        </Stack>

    );
}
export default WelcomePage;
