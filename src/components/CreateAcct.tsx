import React, { useState } from 'react';
import {createUser} from "../scripts/userAuth.tsx";
import {useNavigate} from "react-router-dom";
import {getFCMToken} from "../scripts/FCM.tsx";
import {Stack, Text, TextField, PrimaryButton} from '@fluentui/react';

const CreateAccount = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        phone: '',
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const user = await createUser(formData);
            console.log('User signed up:', user);
            getFCMToken();
            navigate('/home');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                console.log(err.message);
            } else {
                console.log('An unknown error occurred');
                setError('An unknown error occurred');
            }
        }
    };
    const stackTkn = {
        childrenGap: 14
    };
    const containerStyle = { 
        root: {
            minHeight: '100vh',
            backgroundColor: '#f0f0f0',
            padding: '20px'
        }
    };
    const formContainerStyle = {
        root: {
            width: '100%',
            maxWidth: '400px',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }
    }
    const buttonStyles = {
        root: {
            backgroundColor: '#0078d4',
            color: 'white',
            borderRadius: '8px',
            padding: '10px',
            width: '100%',
            marginTop: '20px',
            '&:hover': {
                backgroundColor: '#106ebe'
            }
        }
    }
    return (
        <Stack horizontalAlign = "center" verticalAlign = "center" styles={containerStyle}>
            <Stack horizontalAlign="center" tokens={stackTkn}>
                <Text variant="xxLarge" block styles={{root: {fontSize: '48px', fontWeight: '700'}}}>
                    Create Account
                </Text>
                <Stack styles={formContainerStyle} tokens={stackTkn}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Date of Birth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        errorMessage={error}
                    />
                    <PrimaryButton
                        text="Create Account"
                        onClick={handleSubmit}
                        styles={buttonStyles}
                        required
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default CreateAccount;
