import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import classNames from 'classnames';
import { Exercise } from '../../types';
import './ExerciseItem.css';

const ExerciseItem: FC<{
    exercise: Exercise;
    onDelete: () => void;
    className: string;
}> = ({ exercise, onDelete, className }) => {
	return (
		<div className={classNames("ExerciseItem", className)}>
      <img className="image" src={exercise.image} alt="Upload"/>
      <span className="name">{exercise.name}</span>
      <span className="description">{exercise.description}</span>
			<div className="actions">
        <Link to={`/exercises/${exercise.id}/edit`}>
          <EditIcon className="edit" />
        </Link>
				<DeleteIcon
					className="delete"
					onClick={onDelete}
				/>
			</div>
		</div>
	);
}

export default ExerciseItem;
