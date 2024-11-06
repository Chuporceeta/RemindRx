export type medInfo = {
    name: string,
    dosage: string,
    timeUTC: string,
    dayUTC: number,
    freq: string | number,
    isTaken: boolean,
}

export type Medication = {
    id: string,
    name: string,
    dosage: string,
    time: string,
    day: number,
    freq: string | number,
    isTaken: boolean,
}

