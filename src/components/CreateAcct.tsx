import React, { useState } from 'react';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {createUser} from '../userAuth.ts'

const CreateAccount = () => {
    const [error, setError] = useState<string | null>(null);

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

    const handleSignUp = async () => {
        try {
            const user = await createUser(formData.email, formData.password);
            console.log('User signed up:', user);
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError('An unknown error occurred');
            }
          }
        };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Future functionality for form submission goes here

        console.log(formData); 
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
