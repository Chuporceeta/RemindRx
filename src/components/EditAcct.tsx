import React, { useState, useEffect } from 'react';
import { Stack, Text, TextField, PrimaryButton, DefaultButton, Dialog, DialogType, DialogFooter, IStackTokens, IStackStyles, ITextFieldProps } from '@fluentui/react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../scripts/firebase-init.tsx';
import { onAuthStateChanged, updateEmail, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth';

interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    DOB: string;
    phone: string;
}

const EditAcct: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<UserData>({
        firstName: '',
        lastName: '',
        DOB: '',
        phone: '',
        email: '',
    });
    const [error, setE] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showEmailDialog, setShowEmailDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setFormData(prev => ({
                    ...prev,
                    email: user.email || '',
                }));
            } else {
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, [navigate]);
    const handleChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        const name = (ev.target as HTMLInputElement).name;
        setFormData(prev => ({
            ...prev,
            [name]: newValue || ''
        }));
    };

    const handleEmailChange = async () => {
        if (!auth.currentUser) return;
        setIsLoading(true);
        setE('');
        try {
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email!,
                password
            );
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updateEmail(auth.currentUser, newEmail);
            setFormData(prev => ({ ...prev, email: newEmail }));
            setShowEmailDialog(false);
            setPassword('');
            setNewEmail('');
        }
        catch (err) {
            setE('Failed to update email');
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleDeleteAccount = async () => {
        if (!auth.currentUser) return;
        setIsLoading(true);
        setE('');
        try {
            const credential = EmailAuthProvider.credential(
                auth.currentUser.email!,
                password
            );
            await reauthenticateWithCredential(auth.currentUser, credential);
            await deleteUser(auth.currentUser);
            navigate('/');
        }
        catch (err) {
            setE('Failed to delete account');
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setE('');
        try {
            console.log('Updated user data:', formData);
            navigate('/home');
        } 
        catch (err) {
            setE('Failed to update account');
        } 
        finally {
            setIsLoading(false);
        }
    };
    const containerStyles: IStackStyles = {root: {minHeight: '100vh', backgroundColor: '#f0f0f0', padding: '20px'}};
    const formContainerStyles: IStackStyles = {root: {width: '100%', maxWidth: '400px', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}};
    const buttonStyles = {root: {borderRadius: '8px', padding: '10px', width: '100%', marginTop: '10px'}};
    const dangerButtonStyles = {root: {...buttonStyles.root, backgroundColor: '#a4262c', color: 'white', '&:hover': {backgroundColor: '#751d21'}}};
    const stackTokens: IStackTokens = {childrenGap: 14};
    const textFieldProps: Partial<ITextFieldProps> = {onChange: handleChange, required: true};
    return (
        <Stack horizontalAlign="center" verticalAlign="center" styles={containerStyles}>
            <Stack horizontalAlign="center" tokens={stackTokens}>
                <Text variant="xxLarge" styles={{root: { fontSize: '48px', fontWeight: '700' }}}>
                    Edit Account
                </Text>
                <Stack styles={formContainerStyles} tokens={stackTokens}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        {...textFieldProps}
                    />
                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        {...textFieldProps}
                    />
                    <TextField
                        label="Date of Birth"
                        name="dob"
                        value={formData.DOB}
                        {...textFieldProps}
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        {...textFieldProps}
                    />
                    <Stack horizontal tokens={{childrenGap: 8}} styles={{root: {alignItems: 'flex-end'}}}>
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            disabled
                            styles={{root: {flex: 1}}}
                        />
                        <PrimaryButton
                            text="Change"
                            onClick={() => setShowEmailDialog(true)}
                            styles={{root: {marginBottom: 2}}}
                        />
                    </Stack>
                    {error && (
                        <Text styles={{root: { color: '#a4262c', marginTop: '8px'}}}>
                            {error}
                        </Text>
                    )}
                    <Stack tokens={{childrenGap: 8}}>
                        <PrimaryButton
                            text="Save Changes"
                            onClick={handleSubmit}
                            styles={buttonStyles}
                            disabled={isLoading}
                        />
                        <DefaultButton
                            text="Cancel"
                            onClick={() => navigate('/home')}
                            styles={buttonStyles}
                        />
                        <DefaultButton
                            text="Delete Account"
                            onClick={() => setShowDeleteDialog(true)}
                            styles={dangerButtonStyles}
                        />
                    </Stack>
                </Stack>
            </Stack>
            <Dialog
                hidden={!showEmailDialog}
                onDismiss={() => setShowEmailDialog(false)}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Change Email',
                    subText: 'Enter your password and new email address to continue.'
                }}
            >
                <TextField
                    label="Current Password"
                    type="password"
                    value={password}
                    onChange={(_, newValue) => setPassword(newValue || '')}
                    required
                />
                <TextField
                    label="New Email"
                    type="email"
                    value={newEmail}
                    onChange={(_, newValue) => setNewEmail(newValue || '')}
                    required
                />
                <DialogFooter>
                    <PrimaryButton
                        text="Change Email"
                        onClick={handleEmailChange}
                        disabled={isLoading || !password || !newEmail}
                    />
                    <DefaultButton
                        text="Cancel"
                        onClick={() => {
                            setShowEmailDialog(false);
                            setPassword('');
                            setNewEmail('');
                        }}
                    />
                </DialogFooter>
            </Dialog>
            <Dialog
                hidden={!showDeleteDialog}
                onDismiss={() => setShowDeleteDialog(false)}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Delete Account',
                    subText: 'This action cannot be undone. Please enter your password to confirm account deletion.'
                }}
            >
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(_, newValue) => setPassword(newValue || '')}
                    required
                />
                <DialogFooter>
                    <PrimaryButton
                        text="Delete Account"
                        onClick={handleDeleteAccount}
                        styles={dangerButtonStyles}
                        disabled={isLoading || !password}
                    />
                    <DefaultButton
                        text="Cancel"
                        onClick={() => {
                            setShowDeleteDialog(false);
                            setPassword('');
                        }}
                    />
                </DialogFooter>
            </Dialog>
        </Stack>
    );
};
export default EditAcct;