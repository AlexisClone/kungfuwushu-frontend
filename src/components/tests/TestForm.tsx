import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import { withRouter } from 'react-router';

import * as api from '../../api';

import moment from 'moment';
import 'moment/locale/fr';

import { Card } from '../custom';

import ProgramPicker from './ProgramPicker';

import './TestForm.css';
import { Button, Select, DatePicker, Input, Col, Radio } from 'antd';
import { Program, Group, Test } from '../../types';
import { RadioChangeEvent } from 'antd/lib/radio';
const InputGroup = Input.Group;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const TestForm: FC <{
	title: string;
	test: Test;
	onChange: (test: Test) => void;
	onSave: () => void;
	history: any;
}> = ({ title, test, onChange, onSave, history }) => {
	const [ allGroups, setAllGroups ] = useState<Array<Group>>([]);

	useEffect(() => {
		api.Groups.all().then(setAllGroups);
	}, []);

	const handleInputChange = (fieldName: string) => ({target: {value}}: ChangeEvent<HTMLInputElement> | RadioChangeEvent) => {
		const data = {...test};
		data[fieldName] = value;
		onChange(data);
	}

	const handleDateChange = (date: moment.Moment) => onChange({
		...test,
		date: date.format()
	});

	const handleGroupSelect = (stringId: any) => onChange({
		...test,
		groups: test.groups.concat([allGroups.find(group => parseInt(stringId) === group.id)])
	});

	const handleGroupDeselect = (name: any) => onChange({
		...test,
		groups: test.groups.filter(group => name !== group.name)
	});

	const handleProgramPicked = (program: Program) => onChange({
		...test,
		program
	});

	const { name, type, date, address, city, postalCode, groups } = test;
	const filteredGroups = allGroups.filter(group =>
		!test.groups.map(group => group.id).includes(group.id)
	);
	return (
		<Card className="TestForm">
			<h1>{title}</h1>
			<h2 className="name-title">Nom</h2>
			<Input
				className="name"
				placeholder="Nom de l'évaluation"
				onChange={handleInputChange('name')}
				value={name}
			/>
			<h2>Type d'évaluation</h2>
			<RadioGroup
				onChange={handleInputChange('type')}
				value={type}
				disabled={!!test.id}
			>
				<Radio value={"RANK"}>Passage de grade</Radio>
				<Radio value={"PROGRAM"}>Programme</Radio>
			</RadioGroup>
			{type === 'PROGRAM' &&
				<React.Fragment>
					<h2>Programme d'exercices</h2>
					<div>
						<ProgramPicker 
							onPicked={handleProgramPicked}
							pickedProgram={test.program}
						/>
						{test.program && <span className="program">{test.program.name}</span>}
					</div>
				</React.Fragment>
			}

			<h2>Heure et date de rendu</h2>
			<DatePicker
				showTime
				format="LLLL"
				placeholder="Sélectionnez l'heure et la date"
				onChange={handleDateChange}
				className="date-picker"
				style={{ width: "100%" }}
				value={date ? moment(date) : null}
			/>
			<h2>Lieu</h2>
			<Input
				className="address"
				placeholder="Adresse"
				onChange={handleInputChange('address')}
				value={address}
			/>
			<InputGroup>
				<Col span={6}>
					<Input
						placeholder="Code postal"
						onChange={handleInputChange('postalCode')}
						value={postalCode}
					/>
				</Col>
				<Col span={18}>
					<Input
						placeholder="Ville"
						onChange={handleInputChange('city')}
						value={city}
					/>
				</Col>
			</InputGroup>
			<h2>Groupes à évaluer</h2>
			<Select
				mode="multiple"
				placeholder="Sélectionnez les groupes à évaluer"
				onSelect={handleGroupSelect}
				onDeselect={handleGroupDeselect}
				value={groups.map(group => group.name)}
				notFoundContent="Aucun résultat"
			>
				{filteredGroups.map(group =>
					<Option key={`${group.id}`}>{group.name}</Option>
				)}
			</Select>
			<div className="actions">
				<Button onClick={() => history.goBack()}>Annuler</Button>
				<Button type="primary" onClick={onSave} className="save">Sauvegarder</Button>
			</div>
		</Card>
	);
}

export default withRouter(TestForm as any);
