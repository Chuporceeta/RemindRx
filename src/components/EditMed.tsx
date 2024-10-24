import { useState } from 'react';
import { Stack, TextField, PrimaryButton, DefaultButton, Text, IStackTokens, mergeStyles } from '@fluentui/react';
import { Link } from 'react-router-dom';

interface Medication {
    name: string;
    dosage: number;
    frequency: number;
}

function EditMedicationsPage() {
    const [medications, setMedications] = useState<Medication[]>([]);
    const [newMedication, setNewMedication] = useState<Medication>({ name: '', dosage: 0, frequency: 0 });
    const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track which medication is being edited

    const handleAddMedication = () => {
        if (newMedication.name && newMedication.dosage > 0 && newMedication.frequency > 0) {
            setMedications([...medications, newMedication]);
            setNewMedication({ name: '', dosage: 0, frequency: 0 });
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
            [field]: field === 'dosage' || field === 'frequency' ? parseInt(value) || 0 : value // Dosages and frequency must be a number
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
        setNewMedication({ name: '', dosage: 0, frequency: 0 }); 
    };

    const stackTkn: IStackTokens = { childrenGap: 16, padding: 16 };
    const medCardClass = mergeStyles({ backgroundColor: '#caf0f8', padding: '16px', borderRadius: '8px', marginBottom: '8px' });
    const headerClass = mergeStyles({ fontWeight: '600' });

    return (
        <Stack tokens={stackTkn}>
            <Stack
                horizontal
                horizontalAlign="space-between"
                verticalAlign="center"
                styles={{ root: { padding: '16px', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } }}
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

                    <Stack styles={{ root: { padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } }}>

                        <Stack horizontal horizontalAlign="space-between" styles={{ root: { marginBottom: '8px' } }}>
                            <Text className={headerClass} styles={{ root: { width: '34%' } }}>Name</Text>
                            <Text className={headerClass} styles={{ root: { width: '25%' } }}>Dosage (mg)</Text>
                            <Text className={headerClass} styles={{ root: { width: '41%' } }}>Frequency</Text>
                        </Stack>

                        <Stack>
                            {medications.length === 0 ? (
                                <Text>No medications added.</Text>
                            ) : (
                                medications.map((med, index) => (
                                    <Stack key={index} className={medCardClass} horizontal horizontalAlign="space-between" verticalAlign="center">
                                        {editingIndex === index ? (
                                            <>
                                                <TextField
                                                    //label="Name"
                                                    value={newMedication.name}
                                                    onChange={(e) => handleChange(e, 'name')}
                                                    styles={{ root: { width: '38%' } }}
                                                />
                                                <TextField
                                                    //label="Dosage (mg)"
                                                    value={newMedication.dosage.toString()}
                                                    onChange={(e) => handleChange(e, 'dosage')}
                                                    styles={{ root: { width: '38%' } }}
                                                />
                                                <TextField
                                                    //label="Frequency"
                                                    value={newMedication.frequency.toString()}
                                                    onChange={(e) => handleChange(e, 'frequency')}
                                                    styles={{ root: { width: '38%' } }}
                                                />
                                                <PrimaryButton
                                                    text="Save"
                                                    onClick={() => handleSaveMedication(index)}
                                                    styles={{ root: { height: '30px', marginLeft: '8px' } }}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <Text style={{ width: '50%' }}>{med.name}</Text>
                                                <Text style={{ width: '38%' }}>{med.dosage} mg</Text>
                                                <Text style={{ width: '16%' }}>{med.frequency}</Text>
                                                <DefaultButton
                                                    iconProps={{ iconName: 'Edit' }}
                                                    onClick={() => handleEditMedication(index)}
                                                    styles={{
                                                        root: {
                                                            height: '30px',
                                                            marginRight: '8px'
                                                        }
                                                    }}
                                                />
                                                <DefaultButton
                                                    iconProps={{ iconName: 'Delete' }}
                                                    onClick={() => handleDeleteMedication(index)}
                                                    styles={{ root: { backgroundColor: '#f87171', color: 'white' } }}
                                                />
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
                        Add New Medication
                    </Text>
                    <Stack styles={{ root: { padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } }}>

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
                            label="Frequency"
                            value={newMedication.frequency.toString()}
                            onChange={(e) => handleChange(e, 'frequency')}
                        />
                        <PrimaryButton
                            text="Add Medication"
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
