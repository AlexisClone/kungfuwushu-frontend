import React, { useState } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import ProgramForm from './ProgramForm';

import { Loading } from '../custom';

const NewProgram = ({ history }) => {
    const [ program, setProgram ] = useState({
        name: undefined,
        description: undefined,
        exercisesScales: [],
		type: 'PROGRAM',
    });

	const handleSave = () => {
		const newProgram = {
			...program,
			exercisesScales: program.exercisesScales.map(exerciseScale => ({
				...exerciseScale
			}))
		};
		api.Programs.create(newProgram)
			.then(_ => 
				history.goBack()
			);
    }
    
    if (!program)
        return <Loading />;
	return (
		<ProgramForm
			title="Nouveau programme"
			program={program}
			onChange={setProgram}
			onSave={handleSave}
		/>
	);
}

export default withRouter(NewProgram);
