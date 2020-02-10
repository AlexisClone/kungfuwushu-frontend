import React from 'react';
import './EvaluateTheoretical.css';
import { InputNumber } from '../custom';
import { Tooltip } from 'antd';

const EvaluateTheoretical = ({ exerciseResult, onChange }) => {
    const getQuestion = () => {
        return exerciseResult.exerciseScale.exercise.question;
    }

    const getAnswer = () => {
        if(exerciseResult.answer !== undefined){
            return exerciseResult.answer;
        }
        else {
            return "Aucune réponse";
        }
    }

    const handleChange = (score) => onChange({
        ...exerciseResult,
        score
    });

    return (
        <div className="EvaluateTheoretical">
            <div className="Question">
                <span>{getQuestion()}</span>
            </div>
            <div className="Evaluate-Answer">
                
                <span> Le réponse de l'élève est : </span>
                <span>{getAnswer()}</span>
            </div>
            <div className="Evaluate-Score" >
                <span> Note attribuée :  </span>
                <InputNumber
                    value={exerciseResult.score || ''}
                    min={0}
                    onChange={handleChange}
                    addonAfter={
                        <Tooltip title="Barème">
                            <span>{exerciseResult.exerciseScale.scale || 0}</span>
                        </Tooltip>
                    }
                />
                
            </div>
        </div>
    );
}

export default EvaluateTheoretical;