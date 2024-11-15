import {Link} from 'react-router-dom';
import {useState} from 'react';
import {Text, Stack, PrimaryButton, DefaultButton, IStackTokens, mergeStyles, Separator} from '@fluentui/react';
import {Timer, Clock, CheckCircle, Edit, Trash2} from 'lucide-react';
import {Medication, medInfo} from '../types/types';
import {deleteMedDB, getMedsDB, markAsTakenDB, editMedDB} from '../scripts/medCalls.tsx';
import {useEffect} from 'react';
import {auth} from '../scripts/firebase-init.tsx';
import {onAuthStateChanged} from 'firebase/auth';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function HomePage() {
  const [medications, setMedications] = useState<{
    taken: Medication[];
    upcoming: Medication[];
  }>({
    taken: [],
    upcoming: []
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchMeds = async () => {
          const medsData: Medication[] = await getMedsDB(); // Update the type of medsData to Medication[]
          setMedications({
            taken: medsData.filter((med: Medication) => med.isTaken),
            upcoming: medsData.filter((med: Medication) => !med.isTaken)
          });
        };
        fetchMeds().then(() => {
          console.log("Fetched medications: ", medications);
        });
      }
    });
  }, []);

  const stackTkn: IStackTokens = {childrenGap: 16, padding: 16};
  const medCardClass = mergeStyles({backgroundColor: '#caf0f8', padding: '16px', borderRadius: '8px', marginBottom: '8px', 
    transition: 'all 0.3s ease-in-out', '&:hover': {backgroundColor: '#ade8f4'}
  });

  const markAsTaken = (medID: string) => {
    markAsTakenDB(medID);
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

  const deleteMed = (medID: string) => {
    deleteMedDB(medID);
    setMedications(prev => {
      return {
        taken: prev.taken.filter(med => med.id !== medID),
        upcoming: prev.upcoming.filter(med => med.id !== medID)
      };
    });
  };

  const editMed = async (medID: string) => {

    //get user updated info



    await editMedDB(medID, updatedMedInfo);

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
        <Stack horizontal tokens={{childrenGap: 8}}>
          <button className="p-2 rounded-full bg-[#f72585] hover:bg-[#7209b7] text-white" onClick={() => deleteMed(med.id)}>
              <Trash2 size={14}/>
            </button>
            <button 
              className="p-2 rounded-full bg-[#0077b6] hover:bg-[#023e8a] text-white" 
              onClick={() => editMed(med.id)}>
              <Edit size={14}/>
            </button>
          {!recent && (
            <button className="p-2 rounded-full bg-[#0077b6] hover:bg-[#023e8a] text-white" onClick={() => markAsTaken(med.id)}>
              <CheckCircle size={14}/>
            </button>
          )}
        </Stack>
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
          <Text variant="large" styles={{root: {fontWeight: '600'}}}>
            Upcoming Medications
          </Text>
          <Stack>
            {medications.upcoming.map((med, _) => (renderMedCard(med, false)))}
          </Stack>
        </Stack>
        <Separator />
        <Stack tokens={stackTkn}>
          <Text variant="large" styles={{root: { fontWeight: '600'}}}>
            Recently Taken
          </Text>
          <Stack>
            {medications.taken.map((med, _) => (renderMedCard(med, true)))}
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
