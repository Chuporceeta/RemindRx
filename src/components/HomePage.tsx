//'use client';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Text, Stack, PrimaryButton, DefaultButton, IStackTokens, mergeStyles, Separator } from '@fluentui/react';
import { Timer, Clock, CheckCircle, Edit, Trash2, Download } from 'lucide-react';
import { Medication, medInfo } from '../types/types';
import { deleteMedDB, getMedsDB, markAsTakenDB } from '../scripts/medCalls.tsx';
import { useEffect } from 'react';
import { auth } from '../scripts/firebase-init.tsx';
import { onAuthStateChanged } from 'firebase/auth';
import EditMed from "./EditMed.tsx";
import TourGuide from './TourGuide.tsx';

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function HomePage() {
  const navigate = useNavigate();
  const [startTour, setStartTour] = useState<boolean>(
    () => localStorage.getItem("startTour") === "true" // Default to false unless set to true
  );
  const [loaded, setLoaded] = useState(false);

  
  

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
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) {
    return <div>Loading...</div>;
  }

  const handleStartTour = () => {
    setStartTour(true);
    localStorage.setItem("startTour", "true");
  };

  const handleTourEnd = () => {
    setStartTour(false);
    localStorage.removeItem("startTour"); // Clear state if you want to reset on next login
  };

  const stackTkn: IStackTokens = { childrenGap: 16, padding: 16 };
  const medCardClass = mergeStyles({
    backgroundColor: '#caf0f8', padding: '16px', borderRadius: '8px', marginBottom: '8px',
    transition: 'all 0.3s ease-in-out', '&:hover': { backgroundColor: '#ade8f4' }
  });

  const markAsTaken = (medID: string) => {
    void markAsTakenDB(medID);
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
    void deleteMedDB(medID);
    setMedications(prev => {
      return {
        taken: prev.taken.filter(med => med.id !== medID),
        upcoming: prev.upcoming.filter(med => med.id !== medID)
      };
    });
  };

  const editMed = async (med: Medication) => {
    navigate(`/edit-med`, { state: { med } });
  };

  const ordinal = (day: number) => {
    if (day % 10 == 1)
      return `${day}st`;
    if (day % 10 == 2)
      return `${day}nd`;
    if (day % 10 == 3)
      return `${day}rd`;
    return `${day}th`;
  };
  

  const renderMedCard = (med: Medication, recent: boolean) => {
    return (
      <Stack key={med.id} className={medCardClass} horizontal horizontalAlign='start' verticalAlign='center'>
        {recent ? (
          <Clock size={24} className="text-gray-600" />
        ) : (
          <Timer size={24} className="text-gray-600" />
        )}
        <Stack tokens={{ childrenGap: 4 }} styles={{ root: { flex: 2, paddingLeft: '26px' } }}>
          <Text variant="mediumPlus" styles={{ root: { fontWeight: '600' } }}>{med.name} - {med.dosage}</Text>
          <Stack tokens={{ childrenGap: 4 }}>
            <Text variant="small" styles={{ root: { color: '#665' } }}>
              {med.freq == "daily" ? "Every day" : med.freq == "weekly" ? `Every ${daysOfWeek[med.day]}` :
                `The ${ordinal(med.day)} of every month`} at {med.time}</Text>
          </Stack>
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <button id="delete-med" className="p-2 rounded-full bg-[#f72585] hover:bg-[#7209b7] text-white" onClick={() => deleteMed(med.id)}>
            <Trash2 size={14} />
          </button>
          <button id='edit-med'
            className="p-2 rounded-full bg-[#0077b6] hover:bg-[#023e8a] text-white" onClick={() => editMed(med)}>
            <Edit size={14} />
          </button>
          {!recent && (
            <button id='mark-as-taken' className="p-2 rounded-full bg-[#0077b6] hover:bg-[#023e8a] text-white" onClick={() => markAsTaken(med.id)}>
              <CheckCircle size={14} />
            </button>
          )}
        </Stack>
      </Stack>
    );
  };
  const exportMedicationData = () => {
    const allMeds = [...medications.taken, ...medications.upcoming];
    const headers = ['Name', 'Dosage', 'Frequency', 'Day', 'Time', 'Status'].join(',');
    const csvR = allMeds.map(med => {
      const dayInfo = med.freq === 'weekly' ? daysOfWeek[med.day] : med.freq === 'monthly' ? ordinal(med.day) : 'Every day';
      return [med.name, med.dosage, med.freq, dayInfo, med.time, med.isTaken ? 'Taken' : 'Upcoming'].map(field => `"${field}"`).join(',');
    });
    const csvContent = [headers, ...csvR].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `medications_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Stack tokens={stackTkn}>
      <Stack
        horizontal
        horizontalAlign="space-between"
        verticalAlign="center"
        styles={{ root: { padding: '16px', backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } }}
      >
        <Text variant="xLarge" styles={{ root: { fontWeight: '700', fontSize: '20px' } }}>
          RemindRX
        </Text>
        <Stack horizontal tokens={{childrenGap: 8}} horizontalAlign="center">
        <button
          
          className="px-4 py-2 text-white bg-blue-500 rounded-md absolute top-4"
          onClick={handleStartTour}
          >
            Tutorial
          </button>
        {startTour && (
          <TourGuide 
          start={startTour} 
          setStartTour={setStartTour} 
          onTourEnd={handleTourEnd}/>
        )}
        </Stack>
        <Stack horizontal tokens={{childrenGap: 8}}>
          
          <DefaultButton id="edit-account"
            onClick={() => navigate('/edit-account')}
            iconProps={{iconName: 'Edit', children: <Edit size={16} className="mr-2" />}}
            text="Edit Account"
          />
          <DefaultButton id="export"
            onClick={exportMedicationData}
            iconProps={{iconName: 'Download', children: <Download size={16} className="mr-2" />}}
            text="Export (CSV)"
          />
          
        </Stack>
      </Stack>
      <Stack tokens={stackTkn} styles={{ root: { maxWidth: '800px', margin: '0 auto', width: '100%' } }}>
        <Stack id="upcoming-meds" tokens={stackTkn}>
          <Text variant="large" styles={{ root: { fontWeight: '600' } }}>
            Upcoming Medications
          </Text>
          <Stack>
            {medications.upcoming.map((med, _) => (renderMedCard(med, false)))}
          </Stack>
        </Stack>
        <Separator />
        <Stack id="recently-taken" tokens={stackTkn}>
          <Text variant="large" styles={{ root: { fontWeight: '600' } }}>
            Recently Taken
          </Text>
          <Stack>
            {medications.taken.map((med, _) => (renderMedCard(med, true)))}
          </Stack>
        </Stack>
        <Stack horizontalAlign="center" tokens={{ childrenGap: 16 }}>
          <Link to="/create-med" style={{ textDecoration: 'none' }}>
            <PrimaryButton id="add-new"
              text="Add New"
              styles={{ root: { marginTop: '20px' } }}
            />
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default HomePage;
