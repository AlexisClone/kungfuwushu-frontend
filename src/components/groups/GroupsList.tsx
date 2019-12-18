import React, { FC, useState, useEffect } from 'react';

import { Button } from 'antd';

import { Card } from '../custom';

import * as api from '../../api';

import GroupItem from './GroupItem';

import { Group } from '../../types';

import './GroupsList.css';

const GroupsList: FC<{
    history: any
}> = ({ history }) => {
	const [ groups, setGroups ] = useState<Array<Group>>([]);

	useEffect(() => {
		api.Programs.all()
			.then((programs: Group[]) =>
				setGroups(programs)
			);
	}, []);

	const handleDelete = (groupId: number) => () => {
		api.Groups.delete(groupId);
		setGroups(
			groups.filter(group => group.id !== groupId)
		)
	}
	
	return (
		<Card className="GroupsList">
			<div className="header">
				<h2>Groupes</h2>
				<Button
					onClick={() => history.push('/new-group')}
					type="primary"
				>
					Créer un nouveau groupe
				</Button>
			</div>
			<div className="table-header">
				<span className="name">Nom</span>
				<span>Nombre de membres</span>
			</div>
			{groups.length < 1 ?
				<span className="empty">Aucun résultat</span>
				:
				<div className="groups">
					{groups.map(groups => (
						<GroupItem
							group={groups}
							onDelete={handleDelete(groups.id)}
							className="item"
						/>s
					))}
				</div>
			}
		</Card>
	);
}

export default GroupsList;