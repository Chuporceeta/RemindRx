import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
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
import {addMed, editMedDB} from "../scripts/medCalls.tsx";
import {Medication, medInfo} from "../types/types.ts";
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

const MedMenu = (mode: string = 'add', med: Medication | undefined = undefined) => {
    const navigate = useNavigate();
    const [name, setName] = useState(med?med.name:'');
    const [dosage, setDosage] = useState(med?med.dosage:'');
    const [freq, setFreq] = useState<string | number>(med?med.freq:'');
    const [time, setTime] = useState(med?med.time:'');
    const [day, setDay] = useState<string | number>(med?med.day+1:'');
    const [error, setE] = useState('');

    const validateDay = (newValue: string) => {
        const day = parseInt(newValue);
        return !isNaN(day) && day >= 1 && day <= 31;
    }
    const handleDayChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        if (!newValue) {
            setDay('');
            return;
        }
        if(validateDay(newValue)){
            setDay(parseInt(newValue));
            setE('');
        }
        else{
            setE('Invalid day. Please enter a number between 1 and 31.');
        }
    }
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            if (freq === 'monthly' && !validateDay(day.toString())) {
                setE('Please enter a valid day of the month (1-31)');
                return;
            }
            const date = new Date(`2024T${time}`);
            let dayUTC = 0;
            if (freq === 'weekly') {
                dayUTC = Number(day)-1 + date.getUTCDay() - date.getDay();
            }
            else if (freq === 'monthly') {
                dayUTC = Number(day) + date.getUTCDay() - date.getDay();
            }
            const timeUTC = date.toISOString().slice(11, 16);

            if (mode == 'add') {
                await addMed({name, dosage, timeUTC, dayUTC, freq, isTaken: false})
            } else if (mode == 'edit' && med) {
                const info: medInfo = {name, dosage, timeUTC, dayUTC, freq, isTaken: med.isTaken};
                await editMedDB(med.id, info);
            }
            navigate('/home');
        }
        catch(err){
            setE("Problem adding medication. Please try again.");
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
                    description="Enter a number between 1 and 31"
                />
            );
        }
        return null;
    }
    let title: string='', btn: string='';
    if (mode == "add") {
        title = "Add New Medication";
        btn = "Add";
    } else if (mode == "edit") {
        title = "Edit Medication";
        btn = "Done";
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
                <Text variant="xLarge">{title}</Text>
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
                        <PrimaryButton text={btn} type="submit" />
                        <DefaultButton text="Cancel" onClick={() => navigate(-1)}/>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    );
};
export default MedMenu;