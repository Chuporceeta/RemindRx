export type medInfo = {
    name: string,
    dosage: string,
    time: string,
    day: string | number,
    freq: string | number,
}

export type Medication ={
    id: string; 
    name: string; 
    dosage: string; 
    time: string;
    day: string; 
    freq: string;
    isTaken?: boolean;
  }

