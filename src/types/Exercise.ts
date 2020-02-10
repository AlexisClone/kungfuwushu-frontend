import { Criteria, CriteriaScale, CriteriaResult } from './Criteria';
import { Round, RoundScale, RoundResult } from './Round';

export type Exercise = {
    id?: number;
    name: string;
    description: string;
    image: string;
    type: ExerciseType;
    question?: String;
    rounds?: Round[];
    objective?: Objective;
    measurementUnit?: MeasurementUnit;
    criterion?: Criteria[];
};

export enum ExerciseType {
    TAOLU = 'TAOLU',
    FIGHT = 'FIGHT',
    PHYSICAL = 'PHYSICAL',
    THEORETICAL = 'THEORETICAL',
}

export enum Objective {
    MINIMUM = 'MINIMUM',
    MAXIMUM = 'MAXIMUM',
};

export enum MeasurementUnit {
    SECOND = 'SECOND',
    METER = 'METER',
};

export type ExerciseScale = {
    id?: number;
    type: ExerciseType;
    position: number;
    exercise: Exercise;
    newestVersion?: ExerciseScale;
    roundsScales?: RoundScale[];
    criterionScales?: CriteriaScale[];
    scale? : number;
};

export type ExerciseResult = {
    id?: number;
    type: ExerciseType;
    exerciseScale: ExerciseScale;
    roundsResults?: RoundResult[];
    criterionResults?: CriteriaResult[];
    score?: number;
    answer? : String;
    modified?: boolean;
}
