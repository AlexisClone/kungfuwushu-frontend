import React from 'react';

import './ExerciseDetails.css';
import { Loading } from '../custom';
import MyTheoreticalExercise from './MyTheoreticalExercise';

const ExerciseDetails = ({exerciseScale, exerciseResult, onChange, onSave}) => {
    const isResult = !!exerciseResult;

    const renderContent = (type) => {
		
        if (isResult){
            switch(type) {
                case 'THEORETICAL':
                    return <MyTheoreticalExercise exerciseResult={exerciseResult} onChange={onChange} onSave={onSave}/>
                default:
                    return type + 'is not a supported type of exercise.';
            }
        }
        else {
        }
    }
    
    if (!exerciseScale)
        return <Loading />;
    return (
        <div className={`ExerciseDetails ${isResult ? 'is-result' : ''}`}>
            {renderContent(exerciseResult.type)}
        </div>
    );
}


export default ExerciseDetails;