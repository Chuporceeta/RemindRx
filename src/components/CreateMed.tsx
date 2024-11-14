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
    {key: 1, text: 'Sunday'},
    {key: 2, text: 'Monday'},
    {key: 3, text: 'Tuesday'},
    {key: 4, text: 'Wednesday'},
    {key: 5, text: 'Thursday'},
    {key: 6, text: 'Friday'},
    {key: 7, text: 'Saturday'}
];

const CreateMed: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [freq, setFreq] = useState<string | number>('');
    const [time, setTime] = useState('');
    const [day, setDay] = useState<string | number>('');
    const [error, setE] = useState('');
    const handleFreqChange = (_: any, option?: IComboBoxOption) => {
        setFreq(option?.key || '');
        setDay('');
    }
    const validateDay = (newValue: string) => {
        const day = parseInt(newValue);
        return !isNaN(day) && day >= 1 && day <= 30;
    }  
    const handleDayChange = (_: any, newValue?: string) => {
        if (!newValue) {
            setDay('');
            return;
        }
        if(validateDay(newValue)){
            setDay(parseInt(newValue));
            setE('');
        }
        else{
            setE('Invalid day. Please enter a number between 1 and 30.');
        }
    }
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            if (freq === 'monthly' && !validateDay(day.toString())) {
                setE('Please enter a valid day of the month (1-30)');
                return;
            }
            const date = new Date(`2024T${time}`);
            let dayUTC = 0;
            if (freq === 'weekly') {
                dayUTC = Number(day) + date.getUTCDay() - date.getDay() - 1;
            }
            else if (freq === 'monthly') {
                dayUTC = Number(day);
            }
            const timeUTC = date.toISOString().slice(11, 16);
            await addMed({name, dosage, timeUTC, dayUTC, freq, isTaken:false})
            navigate('/home');
        }
        catch(err){
            setE("Problem adding mediccation. Please try again.");
        }
    }
    const renderTimeField = () => {
        return(
            <TextField
                label="Time"
                required
                type="time"
                value={time}
                onChange={(_, newValue) => setTime(newValue || '')}
            />
        );
    };
    const renderDateSelection = () => {
        if(freq == 'weekly'){
            return (
                <ComboBox
                    label="Day of Week"
                    required
                    options={daysOfWeek}
                    selectedKey={day}
                    onChange={(_, option) => setDay(option?.key || '')}
                />
            );
        }
        else if(freq == 'monthly'){
            return (
                <TextField
                    label="Day of Month"
                    required
                    value={day.toString()}
                    onChange={handleDayChange}
                    description="Enter a number between 1 and 30"
                />
            );
        }
        return null; 
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
                    <ComboBox
                        label="Frequency"
                        required
                        options={freqOptions}
                        selectedKey={freq}
                        onChange={(_, option) => setFreq(option?.key || '')}
                    />
                    {(freq === 'daily' || freq === 'weekly' || freq === 'monthly') && renderTimeField()}
                    {renderDateSelection()}
                    {error && <Text variant="small" styles={{root: {color: 'red'}}}>{error}</Text>}
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