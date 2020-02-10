import React, { useState, useEffect } from 'react';

import { Modal, Checkbox, Button, Select } from 'antd';
import { SearchInput } from '../custom';

import * as api from '../../api';

import './ExercisePicker.css';

const Option = Select.Option;

const ExercisePickerContainer = ({onPicked}) => {
    const [ isVisible, setVisibility] = useState(false);
    const toggle = () => setVisibility(!isVisible);
    const handlePicked = (exercisesScales) => {
        toggle();
        onPicked(exercisesScales);
    }
    return (
        <React.Fragment>
            <Button type="primary" onClick={toggle}>Ajouter des exercices</Button>
            <ExercisePicker
                visible={isVisible}
                onClose={toggle}
                onPicked={handlePicked}
            />
        </React.Fragment>
    );
}

const ExercisePicker = ({ visible, onClose, onPicked, typeProg }) => {
    const [ count, setCount ] = useState(0);
    const [ checkedExercises, setCheckedExercises ] = useState([]);
    const [ exercises, setExercises ] = useState([]);
    const [ filteredExercises, setFilteredExercises ] = useState([]);
    const [ filter, setFilter ] = useState({
        search: undefined,
        type: undefined,
    });
    
    useEffect(() => {
        api.Exercises.all()
            .then(exercises => {
                setExercises(exercises);
                setFilteredExercises(exercises);
            });
    }, []);

    useEffect(() => {
        setFilteredExercises(exercises.filter(exercise => {
            if (filter.search && !exercise.name.toLowerCase().includes(filter.search.toLowerCase()))
                return false;
            if (filter.type && filter.type !== exercise.type)
                return false;
            return true;
        }));
    }, [filter]);

    const handlePicked = () => {
        const exercisesScales = checkedExercises.map((exercise, index) => {
            var exerciseScale = {
                exercise,
                type: exercise.type,
                id: count - index - 1
            }
            switch (exercise.type) {
                case 'TAOLU':
                    exerciseScale.criterionScales = exercise.criterion.map(criteria => ({
                        criteria,
                        scale: undefined,
                    }));
                    break;
                case 'THEORETICAL':
                    exerciseScale.scale = undefined ;
                    break;
                case 'FIGHT':
                    const round = exercise.rounds[0];
                    exerciseScale.roundsScales = [{
                        round,
                        criterionScales: round.criterion.map(criteria => ({
                            criteria,
                            scale: undefined,
                        }))
                    }];
                    break;
                default:
                    break;
            }
            return exerciseScale;
        });
        onPicked(exercisesScales);
        setCheckedExercises([]);
        setCount(count + exercisesScales.length);
    }

    const handleChecked = (exercise) => (checked) => {
        setCheckedExercises(checked ? 
            checkedExercises.concat([exercise]) :
            checkedExercises.filter(exo => exo !== exercise)
        );
    }

    const renderSelectedExercisesInfo = () => {
        const count = checkedExercises.length;
        if (count === 0)
            return "Aucune sélection"
        return `${count} exercice${count > 1 ? 's' : ''} sélectionné${count > 1 ? 's' : ''}`;
    }

    const handleFilterChange = (filterName) => (value) => {
        const data = {...filter};
        data[filterName] = value;
        setFilter(data);
    }

    const exerciseTypes = [
        {
            name: 'Tous les types',
            value: undefined
        },
        {
            name: 'Physique',
            value: 'PHYSICAL'
        },
        {
            name: 'Taolu',
            value: 'TAOLU'
        },
        {
            name: 'Combat',
            value: 'FIGHT'
        },
        {
            name: 'Théorique',
            value: 'THEORETICAL'
        }
    ];
    return (
        <Modal
            visible={visible}
            onOk={handlePicked}
            onCancel={onClose}
            title="Sélection d'exercices"
            footer={[
                <Button key="back" onClick={onClose} className="back">Retour</Button>,
                <span className="selected-info" key="info">
                    {renderSelectedExercisesInfo()}
                </span>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handlePicked}
                    disabled={checkedExercises.length < 1}
                >
                    Ajouter
                </Button>,
            ]}
            className="ExercisePicker"
        >
            <div className="filters">
                <Select
                    defaultValue="Type d'exercice"
                    className="select"
                    onChange={handleFilterChange('type')}
                >
                    {exerciseTypes.map((type, index) =>
                        <Option value={type.value} key={index}>{type.name}</Option>
                    )}
                </Select>
                <SearchInput
                    onSearch={handleFilterChange('search')}
                    placeholder="Rechercher par nom"
                />
            </div>

            <div className="exercises">
                {renderSelectedExercisesInfo()}
                {filteredExercises.map((exercise, index) =>
                    <Exercise
                        exercise={exercise}
                        checked={checkedExercises.includes(exercise)}
                        onChecked={handleChecked(exercise)}
                        key={index}
                    /> 
                )}
            </div>
        </Modal>
    )
}


const Exercise = ({ exercise, checked, onChecked }) => {
    const handleChecked = () => onChecked(!checked);

    return(
        <div className="Exercise" onClick={handleChecked}>
            
            <Checkbox
                checked={checked}
                onChange={handleChecked}
                className="checkbox"
            />
            <span className="title">{exercise.name}</span>
            <span className="type">{exercise.type}</span>
              
        </div>
    )
}

export default ExercisePickerContainer;
