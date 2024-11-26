import { ZIndexes } from '@fluentui/react';
import { ArrowDownCircleIcon, Backpack } from 'lucide-react';
import React from 'react'
import { useEffect, useState } from 'react'
import type { CallBackProps, Step } from 'react-joyride'
import Joyride, {EVENTS, STATUS} from 'react-joyride'

interface State{
    run: boolean;
    stepIndex: number;
    steps: Step[];
}

interface TourGuideProps {
    start: boolean;
    setStartTour: (value: boolean) => void;
    onTourEnd: () => void;
}


const TourGuide
 = ({start, setStartTour, onTourEnd}: TourGuideProps) => {
    const [progress, setProgress] = useState<number>(1);
    const totalSteps: number = 9;

    const generateSteps = (val:number): Step[] => [
        {
            content: (
                <div className='p-3'>
                    <p className='mt-12 text-2xl font-bold'>Welcome to RemindRX!</p>
                    <p className='mt-6 mb-8 text-md'>This tutorial will help you get started with RemindRX.</p>
                    <div className='mt-4 border-b border-sessionbutton-foreground' />
                    <div className='absolute bottom-[34px] left-[47%] text-sm text-neutral-400'>
                        {val} of {totalSteps}
                    </div>
                </div>
            ),
            locale: {skip: <strong aria-label='skip'>Skip</strong>},
            styles: {
                options: {
                    width: 700
            },
        },
            placement: 'center',
            target: 'body',
        },
        {
            content: (
                <div className='mb-4 flex flex-col gap-4 px-2 text-left'>
                <p className='mr-4 text-base font-bold'>Upcoming Medications</p>
                <p className='mr-2 text-sm'>Here you can see all the upcoming medications you have set up.</p>
                <div className='absolute bottom-[30px] left-[38%] text-sm text-neutral-400'>
                    {val} of {totalSteps}
                </div>
                </div>
            ),
            styles: {
                options: {
                    width: 380
            },
        },
            placement: 'left',
            target: '#upcoming-meds',
            title: '',
        },
        {
            content: (
                <div className='mb-4 flex flex-col gap-4 px-2 text-left'>
                <p className='mr-4 text-base font-bold'>Recently Taken</p>
                <p className='mr-2 text-sm'>Here you can see all the medications you have taken recently.</p>
                <div className='absolute bottom-[30px] left-[38%] text-sm text-neutral-400'>
                    {val} of {totalSteps}
                </div>
                </div>
            ),
            styles: {
                options: {
                    width: 380
            },
        },
            placement: 'top',
            target: '#recently-taken',
            title: '',
        },
        {
            content: (
                <div className='mb-4 flex flex-col gap-4 px-2 text-left'>
                <p className='mr-4 text-base font-bold'>Delete Medication</p>
                <p className='mr-2 text-sm'>You can delete a medication by clicking this trash can icon.</p>
                <div className='absolute bottom-[30px] left-[38%] text-sm text-neutral-400'>
                    {val} of {totalSteps}
                </div>
                </div>
            ),
            styles: {
                options: {
                    width: 380
            },
        },
            placement: 'left',
            target: '#delete-med',
            title: '',
        },{
            content: (
                <div className='mb-4 flex flex-col gap-4 px-2 text-left'>
                <p className='mr-4 text-base font-bold'>Edit Medication</p>
                <p className='mr-2 text-sm'>You can edit a medication by clicking this edit icon.</p>
                <div className='absolute bottom-[30px] left-[38%] text-sm text-neutral-400'>
                    {val} of {totalSteps}
                </div>
                </div>
            ),
            styles: {
                options: {
                    width: 380
            },
        },
            placement: 'left',
            target: '#edit-med',
            title: '',
        },{
            content: (
                <div className='mb-4 flex flex-col gap-4 px-2 text-left'>
                <p className='mr-4 text-base font-bold'>Mark Medication as Taken</p>
                <p className='mr-2 text-sm'>You can mark a medication as taken by clicking this check icon.</p>
                <div className='absolute bottom-[30px] left-[38%] text-sm text-neutral-400'>
                    {val} of {totalSteps}
                </div>
                </div>
            ),
            styles: {
                options: {
                    width: 380
            },
        },
            placement: 'left',
            target: '#mark-as-taken',
            title: '',
        },
        {
            content: (
                <div className='mb-4 flex flex-col gap-4 px-2 text-left'>
                <p className='mr-4 text-base font-bold'>Add New Medication</p>
                <p className='mr-2 text-sm'>You can add a new medication by clicking this button.</p>
                <div className='absolute bottom-[30px] left-[38%] text-sm text-neutral-400'>
                    {val} of {totalSteps}
                </div>
                </div>
            ),
            styles: {
                options: {
                    width: 380
            },
        },
            placement: 'top',
            target: '#add-new',
            title: '',
        },
        {
            content: (
                <div className='mb-4 flex flex-col gap-4 px-2 text-left'>
                <p className='mr-4 text-base font-bold'>Edit Account</p>
                <p className='mr-2 text-sm'>You can edit your account by clicking this button.</p>
                <div className='absolute bottom-[30px] left-[38%] text-sm text-neutral-400'>
                    {val} of {totalSteps}
                </div>
                </div>
            ),
            styles: {
                options: {
                    width: 380
            },
        },
            placement: 'left',
            target: '#edit-account',
            title: '',
        },
        {
            content: (
                <div className='mb-4 flex flex-col gap-4 px-2 text-left'>
                <p className='mr-4 text-base font-bold'>Export Data</p>
                <p className='mr-2 text-sm'>You can export your data by clicking this button.</p>
                <div className='absolute bottom-[30px] left-[38%] text-sm text-neutral-400'>
                    {val} of {totalSteps}
                </div>
                </div>
            ),
            styles: {
                options: {
                    width: 380
            },
        },
            placement: 'left',
            target: '#export',
            title: '',
        },
    ]; 
    
    const [{run, steps}, setState] = useState<State>({
        run: start,
        stepIndex: 0,
        steps: generateSteps(progress),
    })

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            steps: generateSteps(progress),
        }));
    }, [progress]);

    useEffect(() => {
        if (start) {
            setState((prevState) => ({
                ...prevState,
                run: true,
                stepIndex: 0,
            }));
        }
    }, [start]);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const {status, type, index} = data;

        const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

        if(finishedStatuses.includes(status)){
            setState({steps, run:false, stepIndex: 0});
            setStartTour(false);
            onTourEnd();
        }else if(([EVENTS.STEP_BEFORE] as string[]).includes(type)){
            setProgress(index + 1);
        }


    };






    return <Joyride continuous callback={handleJoyrideCallback} 
        run={run} 
        steps={steps} 
        scrollToFirstStep
        debug
        showSkipButton
        hideCloseButton
        disableCloseOnEsc
        disableOverlayClose
        disableScrolling
        spotlightPadding={10}
        styles={{
            overlay: {
                border: '6-px solid lightblue'
            },
            spotlight: {
                border: '2-px solid lightblue'
            },
            buttonClose: {
                marginTop: '5px',
                marginRight: '5px',
                width: '12px',
            },
            buttonNext: {
                outline: '2px solid transparent',
                outlineOffset: '2px',
                backgroundColor: '#1c7bd4',
                borderRadius: '5px',
                color: '#FFFFFF',
            },
            buttonSkip:{
                color: '#a3a3a3',
            },
            tooltipFooter:{
                margin: '0px 16px 10px 10px',
            },
            buttonBack:{
                outline: '2px solid transparent',
                outlineOffset: '2px',
            },
            options: {
                zIndex: 100,
                backgroundColor: 'white',
                textColor: 'FFFFFF',
                overlayColor: 'rgba(0,0,0,0.9)',
                primaryColor: '#1c7bd4',
            },
        }}
    />
};


export default TourGuide;