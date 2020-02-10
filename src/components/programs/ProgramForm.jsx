import React from 'react';
import { withRouter } from 'react-router';

import './ProgramForm.css';
import { Input, Button } from 'antd';
import { ImagePicker, Card } from '../custom';

import ExercisePicker from './ExercisePicker';
import ExercisesScales from './ExercisesScales';
const { TextArea } = Input;

const ProgramForm = ({ title, program, onChange, onSave, history }) => {
    
    const handleInputChange = (inputName) => ({target : {value}}) => {
        const modifiedProgram = {...program};
        modifiedProgram[inputName] = value;
        onChange(modifiedProgram);
    };

    const handleImageChange = (image) => onChange({
        ...program,
        image
    });
    
    const handleExercisesScalesChange = (exercisesScales) => onChange({
        ...program,
        exercisesScales: exercisesScales.map((exerciseScale, index) => ({
            ...exerciseScale,
            position: index
        }))
    });

    const handleExercisesPicked = (pickedExercisesScales) => handleExercisesScalesChange(
        exercisesScales.concat(pickedExercisesScales)
    );

    const { name, description, image, exercisesScales, type } = program;
    return (
        <div className="ProgramForm">
            <Card className="card">
                <h1>{title}</h1>
                <h2 className="infos-title">Informations</h2>
                <Input
                    className="name"
                    placeholder="Nom du grade"
                    onChange={handleInputChange('name')}
                    value={name}
                />
                <TextArea
                    autosize={{ minRows: 2, maxRows: 10 }}
                    placeholder="Description"
                    onChange={handleInputChange('description')}
                    value={description}
                />
                
                
                    <React.Fragment>
                        <h2>Télécharger une image</h2>
                        <ImagePicker
                            imageUrl={image}
                            onChange={handleImageChange}
                        />
                    </React.Fragment>
                

                <div className="exercises-title">
                    <h2>Exercices</h2>
                    <ExercisePicker onPicked={handleExercisesPicked} typeProg={type} />
                </div>
                {exercisesScales.length === 0? 
                    "Aucun exercice sélectionné." :
                    <ExercisesScales
                        exercisesScales={exercisesScales}
                        onChange={handleExercisesScalesChange}
                    />
                }
                <div className="actions">
                    <Button onClick={() => history.goBack()}>Annuler</Button>
                    <Button type="primary" onClick={onSave} className="save">Sauvegarder</Button>
                </div>
            </Card>
        </div>
    );
}

export default withRouter(ProgramForm);
