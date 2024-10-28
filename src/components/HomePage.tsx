import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {Text, Stack, IconButton, PrimaryButton, DefaultButton, IStackTokens, mergeStyles, Separator} from '@fluentui/react';
import {Timer, Clock, CheckCircle, Edit} from 'lucide-react';

interface Medication {
  id: string; 
  name: string; 
  dosage: string; 
  time: string;
  day: string; 
  freq: string;
  isTaken?: boolean;
}
const daysOfWeek = {
  'sun': 'Sunday',
  'mon': 'Monday',
  'tue': 'Tuesday',
  'wed': 'Wednesday',
  'thu': 'Thursday',
  'fri': 'Friday',
  'sat': 'Saturday'
};
function HomePage() {
  const [medications, setMedications] = useState<{
    taken: Medication[];
    upcoming: Medication[];
  }>({
    taken: [
      {id: '001', name: 'Aspirin', dosage: '500mg', time: '8:00 AM', day: 'mon', freq:"Weekly", isTaken: false},
      {id: '002', name: 'Ibuprofen', dosage: '200mg', time: '12:00 PM', day: 'mon', freq:"Daily", isTaken: false},
      {id: '003', name: 'Tylenol', dosage: '500mg', time: '6:00 PM', day: 'mon', freq:"Daily", isTaken: false},
    ],
    upcoming: [
      {id: '004', name: 'Aspirin', dosage: '500mg', time: '8:00 AM', day: 'tue', freq:"Weekly", isTaken: true},
      {id: '005', name: 'Ibuprofen', dosage: '200mg', time: '12:00 PM', day: 'tue', freq:"Daily", isTaken: true},
      {id: '006', name: 'Tylenol', dosage: '500mg', time: '6:00 PM', day: 'tue', freq:"weekly", isTaken: true},
    ]
  });
  const stackTkn: IStackTokens = {childrenGap: 16, padding: 16};
  const medCardClass = mergeStyles({backgroundColor: '#caf0f8', padding: '16px', borderRadius: '8px', marginBottom: '8px', 
    transition: 'all 0.3s ease-in-out', '&:hover': {backgroundColor: '#ade8f4'}
  });
  const markAsTaken = (medID: string) => {
    const now = new Date();
    setMedications(prev => {
      const medicationToMove = prev.upcoming.find(med => med.id === medID);
      if (!medicationToMove) 
        return prev; 
      const takenMed = {
        ...medicationToMove,
        isTaken: true,
      }
      return {
        taken: [takenMed, ...prev.taken],
        upcoming: prev.upcoming.filter(med => med.id !== medID)
      };
    });
  };
  const renderMedCard = (med: Medication, recent: boolean) => {
    return(
      <Stack key={med.id} className={medCardClass} horizontal horizontalAlign='start' verticalAlign='center'>
        {recent ? (
          <Clock size={24} className="text-gray-600"/>
        ) : (
          <Timer size={24} className="text-gray-600"/>
        )}
        <Stack tokens={{childrenGap: 4}} styles={{root: {flex: 2, paddingLeft: '26px'}}}>
          <Text variant="mediumPlus" styles={{root: {fontWeight: '600'}}}>{med.name} - {med.dosage}</Text>
          <Stack tokens={{childrenGap: 4}}>
            <Text variant="small" styles={{root: {color: '#665'}}}>{daysOfWeek[med.day]} at {med.time}</Text>
          </Stack>
          <Text variant="small" styles={{root: {color: '#665'}}}>{med.freq}</Text>
        </Stack>
        {!recent && (
          <button className="p-2 rounded-full bg-[#0077b6] hover:bg-[#023e8a] text-white" onClick={() => markAsTaken(med.id)}>
            <CheckCircle size={14}/>
          </button>
        )}
      </Stack>
    );
  };

  return (
    <Stack tokens={stackTkn}>
      <Stack
        horizontal
        horizontalAlign="space-between"
        verticalAlign="center"
        styles={{root: {padding: '16px', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}}
      >
        <Text variant="xLarge" styles={{root: { fontWeight: '700', fontSize: '20px'}}}>
          RemindRX
        </Text>
        <Link to="/edit-medications" style={{textDecoration: 'none'}}>
          <DefaultButton
            iconProps={{iconName: 'Edit', children: <Edit size={16} className="mr-2"/>}}
            text="Edit Medications"
          />
        </Link>
      </Stack>
      <Stack tokens={stackTkn} styles={{root:{ maxWidth: '800px', margin: '0 auto', width: '100%'}}}>
        <Stack tokens={stackTkn}>
          <Text variant="large" styles={{root: { fontWeight: '600'}}}>
            Recently Taken
          </Text>
          <Stack>
            {medications.taken.map((med, index) => (renderMedCard(med, true)))}
          </Stack>
        </Stack>
        <Separator />
        <Stack tokens={stackTkn}>
          <Text variant="large" styles={{root: {fontWeight: '600'}}}>
            Upcoming Medications
          </Text>
          <Stack>
            {medications.upcoming.map((med, index) => (renderMedCard(med, false)))}
          </Stack>
        </Stack>
        <Stack horizontalAlign="center" tokens={{childrenGap: 16}}>
          <Link to="/create-med" style={{textDecoration: 'none'}}>
            <PrimaryButton
              text="Add New"
              styles={{root: {marginTop: '20px'}}}
            />
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default HomePage;
