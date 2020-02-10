import React from 'react';
//import {useEffect} from 'react';
import { Input, Button } from 'antd';
import './MyTheoreticalExercise.css';

const MyTheoreticalExercise = ({ exerciseResult, onChange, onSave}) => {
    
    const getQuestion = () => {
        return exerciseResult.exerciseScale.exercise.question;
    }

    /*
    useEffect(() => {
        var today = new Date();
        if(testDate > today)
            document.getElementById('btSave').disable=true;
        else
            document.getElementById('btSave').disable=false;
    },[]);
*/
    const getAnswer = () => {
        if(exerciseResult.answer !== undefined)
            return exerciseResult.answer;
        else
            return "Répondez à la question"
    }

    const handleInputChange = (inputAnswer) => ({target : {value}}) => {
        const modifiedResult = {...exerciseResult};
        modifiedResult[inputAnswer] = value;
        onChange(modifiedResult);
    };           

    const { answer } = exerciseResult;
    return (
        <div className="EvaluateTheoretical">
            <h1>Evaluation Théorique</h1>
            <div className="Question">
                <h2>{exerciseResult.exerciseScale.exercise.name}</h2>
                <span className="enonceQuestion">{getQuestion()}</span><br/>
            
                <div className="Answer">
                    <span> Votre réponse : </span>
                    <Input
                        className="answer"
                        placeholder={getAnswer()}
                        onChange={handleInputChange('answer')}
                        
                        value={answer}
                    />
                </div><br/>
                <Button id="btSave" onClick={onSave}> Sauvegarder </Button>
            </div>
        </div>
    );
}

export default MyTheoreticalExercise;