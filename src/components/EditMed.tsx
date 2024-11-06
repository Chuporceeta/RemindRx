import { useState } from 'react';
import { Stack, TextField, PrimaryButton, DefaultButton, Text, IStackTokens, mergeStyles, ComboBox,IComboBoxOption } from '@fluentui/react';
import { Link } from 'react-router-dom';
import {Timer, Clock, CheckCircle, Edit, Trash2} from 'lucide-react';


interface Medication {
    id: string;
    name: string;
    dosage: number;
    frequency: string;
    time: string;
    day: string; 
}

function EditMedicationsPage() {
    const [medications, setMedications] = useState<Medication[]>([]);
    const [newMedication, setNewMedication] = useState<Medication>({ id: '', name: '', dosage: 0, frequency: '', time: '', day: '' });
    const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track which medication is being edited

    const handleAddMedication = () => {
        if (newMedication.name && newMedication.dosage > 0 && newMedication.frequency && newMedication.day && newMedication.time) {
            setMedications([...medications, newMedication]);
            setNewMedication({ id: '', name: '', dosage: 0, frequency: '', time: '', day: ''});
        }
    };

    const handleDeleteMedication = (index: number) => {
        const updatedMedications = medications.filter((_, i) => i !== index);
        setMedications(updatedMedications);
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Medication) => {
        const value = e.currentTarget.value;
        setNewMedication(prevState => ({
            ...prevState,
            [field]: field === 'dosage' ? parseInt(value) || 0 : value // Dosages must be a number
        }));
    };

    const handleEditMedication = (index: number) => {
        setEditingIndex(index);
        setNewMedication(medications[index]);
    };

    const handleSaveMedication = (index: number) => {
        const updatedMedications = [...medications];
        updatedMedications[index] = newMedication;
        setMedications(updatedMedications);
        setEditingIndex(null); 
        setNewMedication({ id: '', name: '', dosage: 0, frequency: '', time: '', day: '' }); 
    };

    const stackTkn: IStackTokens = { childrenGap: 16, padding: 16 };
    const medCardClass = mergeStyles({
        backgroundColor: '#caf0f8', padding: '16px', borderRadius: '8px', marginBottom: '8px',
        transition: 'all 0.3s ease-in-out', '&:hover': { backgroundColor: '#ade8f4' }
    });    const headerClass = mergeStyles({ fontWeight: '600' });

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


    return (
        <Stack tokens={stackTkn}>
            <Stack
                horizontal
                horizontalAlign="space-between"
                verticalAlign="center"
                styles={{ root: { padding: '16px', backgroundColor: 'white'} }}
            >
                <Text variant="xLarge" styles={{ root: { fontWeight: '700', fontSize: '20px' } }}>
                    Edit Medications
                </Text>
                <Link to="/home" style={{ textDecoration: 'none' }}>
                    <DefaultButton iconProps={{ iconName: 'Back' }} text="Back to Home" />
                </Link>
            </Stack>

            <Stack tokens={stackTkn} styles={{ root: { maxWidth: '800px', margin: '0 auto', width: '100%' } }}>
                <Stack tokens={stackTkn}>
                    <Text variant="large" styles={{ root: { fontWeight: '600' } }}>
                        Current Medications
                    </Text>

                    <Stack >

                        <Stack>
                            {medications.length === 0 ? (
                                <Text>No medications added.</Text>
                            ) : (
                                medications.map((med, index) => (
                                    <Stack key={index} className={medCardClass} styles={{root:{ maxWidth: '800px', margin: '0 auto', width: '100%'}}}>
                                        {editingIndex === index ? (
                                            <>
                                                <Stack tokens={stackTkn}>
                                                    <TextField
                                                        label="Medication Name"
                                                        required
                                                        value={newMedication.name}
                                                        onChange={(e) => handleChange(e, 'name')}
                                                    />
                                                    <TextField
                                                        label="Dosage (mg)"
                                                        required
                                                        value={newMedication.dosage.toString()}
                                                        onChange={(e) => handleChange(e, 'dosage')}
                                                    />
                                                    <TextField
                                                        label = "Time"
                                                        required
                                                        type="time"
                                                        value={newMedication.time}
                                                        onChange={(e) => handleChange(e, 'time')}
                                                    />
                                                    <TextField
                                                        label = "Day of the Week"
                                                        required
                                                        value={newMedication.day}
                                                        onChange={(e) => handleChange(e, 'day')}
                                                    />
                                                    <TextField
                                                        label="Frequency"
                                                        required
                                                        value={newMedication.frequency}
                                                        onChange={(e) => handleChange(e, 'frequency')}
                                                    />
                                                    <PrimaryButton
                                                    text="Save"
                                                    onClick={() => handleSaveMedication(index)}
                                                    styles={{ root: { height: '30px', marginLeft: '8px' } }}
                                                />
                                                </Stack> 
                                            </>
                                        ) : (
                                            <>
                                                <Stack key={med.id} className={medCardClass} horizontal horizontalAlign='start' verticalAlign='center'>
                                                <Stack tokens={{childrenGap: 4}} styles={{root: {flex: 2, paddingLeft: '26px'}}}>
                                                <Text variant="mediumPlus" styles={{root: {fontWeight: '600'}}}>
                                                    {med.name} - {med.dosage} mg
                                                    </Text>
                                                <Stack tokens={{childrenGap: 4}}>
                                                    <Text variant="small" styles={{root: {color: '#665'}}}>{med.day} at {med.time}</Text>
                                                </Stack>
                                                <Text variant="small" styles={{root: {color: '#665'}}}>{med.frequency}</Text>
                                                </Stack>
                                                <Stack horizontal tokens={{childrenGap: 8}}>
                                                <button className="p-2 rounded-full bg-[#0077b6] hover:bg-[#023e8a] text-white" onClick={() => handleEditMedication(index)}>
                                                    <Edit size={14}/>
                                                </button>
                                                <button className="p-2 rounded-full bg-[#f72585] hover:bg-[#7209b7] text-white" onClick={() => handleDeleteMedication(index)}>
                                                    <Trash2 size={14}/>
                                                </button>
                                                </Stack>
                                            </Stack>
                                            </>
                                        )}
                                    </Stack>
                                ))
                            )}
                        </Stack>
                    </Stack>
                </Stack>

                <Stack tokens={stackTkn}>
                    <Text variant="large" styles={{ root: { fontWeight: '600' } }}>
                        Add Medication
                    </Text>
                    <Stack styles={{ root: { padding: '16px'} }}>

                    {/*<TextField
                            label="Id"
                            value={newMedication.id}
                            //onChange={(e) => handleChange(e, 'id')}
                        />*/}
                        <TextField
                            label="Name"
                            value={newMedication.name}
                            onChange={(e) => handleChange(e, 'name')}
                        />
                        <TextField
                            label="Dosage (mg)"
                            value={newMedication.dosage.toString()}
                            onChange={(e) => handleChange(e, 'dosage')}
                        />
                        <TextField
                            label="Time"
                            value={newMedication.time}
                            onChange={(e) => handleChange(e, 'time')}
                        />
                        <TextField
                            label="Day of the week"
                            value={newMedication.day}
                            onChange={(e) => handleChange(e, 'day')}
                        />
                        <TextField
                            label="Frequency"
                            value={newMedication.frequency.toString()}
                            onChange={(e) => handleChange(e, 'frequency')}
                        />
                        <PrimaryButton
                            text="Confirm Medication"
                            onClick={handleAddMedication}
                            styles={{ root: { marginTop: '20px' } }}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default EditMedicationsPage;
