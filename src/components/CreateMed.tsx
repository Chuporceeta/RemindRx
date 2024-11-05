import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {addMed} from '../scripts/medCalls';
import {
    Stack, 
    TextField, 
    PrimaryButton, 
    DefaultButton, 
    IStackTokens, 
    Text, 
    ComboBox,
    IComboBoxOption
} from '@fluentui/react'
const stackTkn: IStackTokens = {childrenGap: 20};
const freqOptions: IComboBoxOption[] = [
    {key: 'daily', text: 'Daily'}, 
    {key: 'weekly', text: 'Weekly'},
    {key: 'monthly', text: 'Monthly'}
];
const daysOfWeek: IComboBoxOption[] = [
    {key: 0, text: 'Sunday'},
    {key: 1, text: 'Monday'},
    {key: 2, text: 'Tuesday'},
    {key: 3, text: 'Wednesday'},
    {key: 4, text: 'Thursday'},
    {key: 5, text: 'Friday'},
    {key: 6, text: 'Saturday'}
];
const CreateMed: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [freq, setFreq] = useState<string | number>('');
    const [time, setTime] = useState('');
    const [day, setDay] = useState<string | number>('');
    const [error, setE] = useState('');
    
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Send medication data to the backend
        await addMed({name, dosage, time, day, freq})
        console.log({name, dosage, time, day, freq});
        navigate('/home');
    }
    return(
        <Stack verticalAlign="center" tokens={stackTkn} styles={{root: {
            width: 400,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            border: '0.5px solid #e0e0e0',
            borderRadius: 8,
            margin: '80px auto', 
            padding: 20
        }}}>
            <Stack horizontalAlign='center'>
                <Text variant="xLarge">Add New Medication</Text>
            </Stack>
            <form onSubmit={submit}>
                <Stack tokens={stackTkn}>
                    <TextField
                        label="Medication Name"
                        required
                        value={name}
                        onChange={(_, newValue) => setName(newValue || '')}
                    />
                    <TextField
                        label="Dosage"
                        required
                        value={dosage}
                        onChange={(_, newValue) => setDosage(newValue || '')}
                    />
                    <TextField
                        label = "Time"
                        required
                        type="time"
                        value={time}
                        onChange={(_, newValue) => setTime(newValue || '')}
                    />
                    <ComboBox
                        label = "Day of Week"
                        required
                        options={daysOfWeek}
                        selectedKey={day}
                        onChange={(_, option) => setDay(option?.key || '')}
                    />
                    <ComboBox
                        label="Frequency"
                        required
                        options={freqOptions}
                        selectedKey={freq}
                        onChange={(_, option) => setFreq(option?.key || '')}
                    />
                    <Stack horizontal horizontalAlign='center' tokens={stackTkn}>
                        <PrimaryButton text="Add" type="submit" />
                        <DefaultButton text="Cancel" onClick={() => navigate('/home')}/>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    );
};
export default CreateMed; 