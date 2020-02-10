import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import ExerciseForm from './ExerciseForm';

import { Loading } from '../custom';

const EditExercise = ({ match, history }) => {
	const [ exercise, setExercise ] = useState(undefined);

    useEffect(() => {
        api.Exercises.byId(match.params.id)
            .then(exercise =>
                setExercise(exercise)
            );
    });

	const handleSave = () => {
        api.Exercises.update(exercise)
            .then(_ =>
                history.goBack()
            );
    }

    if (!exercise)
        return <Loading />;
	return (
		<ExerciseForm
			title="Edition d'un exercice"
			exercise={exercise}
			onChange={setExercise}
			onSave={handleSave}
		/>
	);
}

export default withRouter(EditExercise);
