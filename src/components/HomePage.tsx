import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {Text, Stack, PrimaryButton, DefaultButton, IStackTokens, mergeStyles, Separator} from '@fluentui/react';
import {Timer, Clock} from 'lucide-react';

function HomePage() {
  const taken = [
    { name: "Medicine A", dosage: "10mg", time: "90 min ago" },
    { name: "Medicine B", dosage: "5mg", time: "2 hrs ago" }
  ];
  const upcoming = [
    { name: "Medicine C", dosage: "5mg", time: "in 3 hours" },
    { name: "Medicine D", dosage: "10mg", time: "in 6 hours" },
  ];
  const stackTkn: IStackTokens = {childrenGap: 16, padding: 16};
  const medCardClass = mergeStyles({backgroundColor: '#caf0f8', padding: '16px', borderRadius: '8px', marginBottom: '8px'});
  const renderMedCard = (item, isRecent = true) => {
    return (
      <Stack className={medCardClass} horizontal horizontalAlign="space-between" verticalAlign="center">
        <Stack horizontal tokens={{childrenGap: 10}} verticalAlign="center">
          {isRecent ? (<Clock size={24} className="text-gray-600"/>) : (<Timer size={24} className="text-gray-600"/>)}
          <Stack tokens={{childrenGap: 4}}>
            <Text variant="mediumPlus" styles={{ root: { fontWeight: '600' } }}>
              {item.name} - {item.dosage}
            </Text>
            <Text variant="small" styles={{ root: { color: '#666' } }}>
              {isRecent ? item.timeAgo : item.time}
            </Text>
          </Stack>
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
            iconProps={{iconName: 'Edit'}}
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
            {upcoming.map((med, index) => (renderMedCard(med, true)))}
          </Stack>
        </Stack>
        <Separator />
        <Stack tokens={stackTkn}>
          <Text variant="large" styles={{root: { fontWeight: '600'}}}>
            Upcoming Medications
          </Text>
          <Stack>
            {upcoming.map((med, index) => (renderMedCard(med, false)))}
          </Stack>
        </Stack>
        <Stack horizontalAlign="center" tokens={{ childrenGap: 16 }}>
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