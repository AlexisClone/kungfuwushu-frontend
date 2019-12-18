import React, { useState } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import GroupForm from './GroupForm';

import { Loading } from '../custom';

const NewGroup = ({ history }) => {
    const [ group, setGroup ] = useState({
        name: undefined,
        description: undefined,
        exercisesScales: [],
		type: 'PROGRAM',
    });

	const handleSave = () => {
		const newGroup = {
			...group,
			exercisesScales: group.membersScales.map(membersScale => ({
				...membersScale,
				id: undefined
			}))
		};
		api.Groups.create(newGroup)
			.then(_ => 
				history.goBack()
			);
    }
    
    if (!group)
        return <Loading />;
	return (
		<GroupForm
			title="Nouveau groupe"
			group={group}
			onChange={setGroup}
			onSave={handleSave}
		/>
	);
}

export default withRouter(NewGroup);
