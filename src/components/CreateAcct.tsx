import React, { useState } from 'react';
import {createUser} from "../scripts/userAuth.tsx";
import {useNavigate} from "react-router-dom";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const user = await createUser(formData);
            console.log('User signed up:', user);
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
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4">
            <h2 className="text-5xl font-bold">Create Account</h2>
            <div className="bg-white border border-gray-200 shadow-md p-6 rounded-lg space-y-4 w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-col">
                        <input
                            className="border border-gray-300 p-2 rounded-lg w-full"
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <input
                            className="border border-gray-300 p-2 rounded-lg w-full"
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <input
                            className="border border-gray-300 p-2 rounded-lg w-full"
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <input
                            className="border border-gray-300 p-2 rounded-lg w-full"
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <input
                            className="border border-gray-300 p-2 rounded-lg w-full"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4 flex flex-col">
                        <input
                            className="border border-gray-300 p-2 rounded-lg w-full"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                        <button className="bg-blue-900 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600" type="submit">Create Account</button>
                    </form>
            </div>
        </div>
    );
};

export default CreateAccount;
