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
    DatePicker,
    IDatePickerStrings, 
    ComboBox, 
    IComboBoxOption
} from '@fluentui/react'

const stackTkn: IStackTokens = {childrenGap: 20};
const datePS: IDatePickerStrings = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    goToToday: 'Today', 
    prevMonthAriaLabel: 'Previous Month',
    nextMonthAriaLabel: 'Next Month',
    prevYearAriaLabel: 'Previous Year',
    nextYearAriaLabel: 'Next Year'
};
const freqOptions: IComboBoxOption[] = [
    {key: 'daily', text: 'Daily'}, 
    {key: 'weekly', text: 'Weekly'},
    {key: 'monthly', text: 'Monthly'}
];
const CreateMed: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [freq, setFreq] = useState<string | number>('');
    const [error, setE] = useState('');
    
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Send medication data to the backend
        await addMed(name, dosage, startDate!, freq);
        console.log({name, dosage, startDate, freq});
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
                    <DatePicker
                        label="Start Date"
                        isRequired
                        strings={datePS}
                        value={startDate}
                        onSelectDate={(date) => setStartDate}
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