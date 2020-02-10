import { ExerciseScale, ExerciseResult, ExerciseType } from '../types';

export const create = (exerciseScale: ExerciseScale): ExerciseResult => {
    const exerciseResult: ExerciseResult = {
        exerciseScale,
        type: exerciseScale.type,
    };
    switch (exerciseScale.type) {
        case ExerciseType.TAOLU:
            return {
                ...exerciseResult,
                criterionResults: exerciseScale.criterionScales.map(criteriaScale => ({
                    criteriaScale,
                    score: undefined,
                })),
            };
        case ExerciseType.FIGHT:
            return {
                ...exerciseResult,
                roundsResults: exerciseScale.roundsScales.map(roundScale => ({
                    roundScale,
                    criterionResults: roundScale.criterionScales.map(criteriaScale => ({
                        criteriaScale,
                        score: undefined,
                    })),
                })),
            };
        case ExerciseType.PHYSICAL:
            return {
                ...exerciseResult,
                score: 0,
            };
        case ExerciseType.THEORETICAL:
            return {
                ...exerciseResult,
                score: 0,
            };
        default:
            return undefined;
    }
}

export const getScore = (exerciseResult: ExerciseResult): number => {
    switch(exerciseResult.type) {
        case ExerciseType.TAOLU:
            return exerciseResult.criterionResults.reduce((sum, criteriaResult) => 
                sum + criteriaResult.score
            , 0);
        case ExerciseType.FIGHT:
            return exerciseResult.roundsResults.reduce((sum, roundResult) => {
                return sum + roundResult.criterionResults.reduce((sum, criteriaResult) => 
                    sum + criteriaResult.score
                , 0)
            }, 0);
        case ExerciseType.THEORETICAL:
            return exerciseResult.score;
        case ExerciseType.PHYSICAL:
            return exerciseResult.score;
        default:
            return undefined;
    }
}

export const getScale = (exerciseResult: ExerciseResult): number => {
    switch(exerciseResult.type) {
        case ExerciseType.TAOLU:
            return exerciseResult.exerciseScale.criterionScales.reduce((sum, criteriaScale) => 
                sum + criteriaScale.scale
            , 0);
        case ExerciseType.FIGHT:
            return exerciseResult.roundsResults.reduce((sum, roundResult) => {
                return sum + roundResult.roundScale.criterionScales.reduce((sum, criteriaScale) => 
                    sum + criteriaScale.scale
                , 0)
            }, 0);
        case ExerciseType.THEORETICAL:
            return exerciseResult.exerciseScale.scale;
        default:
            return undefined;
    }
}

export const isValidated = (exerciseResult: ExerciseResult): boolean => {
    switch(exerciseResult.type) {
        case ExerciseType.PHYSICAL:
            return true;
        case ExerciseType.TAOLU:
        case ExerciseType.FIGHT:
            return getScore(exerciseResult) >= getScale(exerciseResult) / 2;
        case ExerciseType.THEORETICAL:
            return getScore(exerciseResult) >= getScale(exerciseResult) / 2;
        default:
            return false;
    }
}
