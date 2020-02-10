import React, { FC, useState, useEffect } from 'react';
import { Button } from 'antd';
import { Card, Loading } from '../custom';
import * as api from '../../api';
import { Exercise } from '../../types';
import ExerciseItem from './ExerciseItem';
import './ExercisesList.css';

const ExercisesList: FC<{
    history: any
}> = ({ history }) => {
	const [ exercises, setExercises ] = useState<Array<Exercise>>([]);

	useEffect(() => {
		api.Exercises.all()
			.then((exercises: Exercise[]) =>
				setExercises(exercises)
			);
	}, []);

	const handleDelete = (exerciseId: number) => () => {
		api.Exercises.delete((exerciseId))
    .then(() => {
      setExercises(exercises.filter(exercise => exercise.id !== exerciseId))
    })
    .catch(() => {
      alert("La suppression a échoué");
    });
	}

  if (!exercises)
      return <Loading />;

	return (
		<Card className="ExercisesList">
			<div className="header">
				<h2>Exercices</h2>
				<Button
					onClick={() => history.push('/new-exercise')}
					type="primary"
				>
					Créer un nouvel exercice
				</Button>
			</div>
			<div className="table-header">
        <span className="image"></span>
				<span className="name">Nom</span>
				<span className="description">Description</span>
			</div>
      {exercises.length < 1 ?
				<span className="empty">Aucun résultat</span>
				:
				<div className="exercises">
					{exercises.map(exercise => (
            <ExerciseItem
							exercise={exercise}
							onDelete={handleDelete(exercise.id)}
							className="item"
						/>
					))}
				</div>
			}
		</Card>
	);
}

export default ExercisesList;
