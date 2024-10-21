import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {Text, Stack, PrimaryButton, TextField, IStackStyles, IStackTokens} from '@fluentui/react'
function WelcomePage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const stackS: IStackStyles = {
        root: {width: '150%', maxWidth: '400px', margin: '0 auto', padding: '20px'}
    };
    const stackTkn: IStackTokens = {childrenGap: 25, padding: 20};
    const buttonStyle = {
        root: {margin: '0 8px', border: 'none'},
        rootHovered:{backgroundColor: '#005a9e', border: 'none'}
    };
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('/home');
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
                    styles={{
                        root:{
                            backgroundColor: 'white',
                            padding: '24px',
                            borderRadius: '8px',
                            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                            border: '1px solid #e5e7eb',
                            width: '100%',              
                        }
                    }}
                    tokens={{ childrenGap: 16 }}
                >
                    <form onSubmit={handleLogin}>
                        <Stack tokens={{ childrenGap: 15 }}>
                            <TextField
                                placeholder="Username"
                                value={username}
                                onChange={(_, newValue) => setUsername(newValue || '')}
                                required
                            />
                            <TextField
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(_, newValue) => setPassword(newValue || '')}
                                canRevealPassword
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
