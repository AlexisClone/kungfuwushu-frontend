import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './ExerciseItem.css';
import { ExerciseScale, ExerciseResult } from '../../types';

import classNames from 'classnames';

import { ReactComponent as FailedIcon } from '../../icons/failed.svg';
import { ReactComponent as ValidatedIcon } from '../../icons/validated.svg';

import { isValidated as isExerciseResultValidated } from '../../utils/ExerciseResult.utils';

const ExerciseItem: FC<{
    exerciseScale: ExerciseScale;
    exerciseResult?: ExerciseResult;
    testId? : number;
}> = ({ exerciseScale, exerciseResult, testId }) => {
    const isResult = !!exerciseResult;
    const isValidated = isResult ? isExerciseResultValidated(exerciseResult) : undefined;
    
    const { exercise } = exerciseScale;

    return (
        <Link
            to={isResult ?
                `/exercises-results/${exerciseResult.id}/${testId}` :
                `/exercises-scales/${exerciseScale.id}`
            }
        >
            <div 
                className={classNames(
                    "ExerciseItem",
                    isResult ? classNames(
                        "is-result",
                        isValidated ? "validated" : "failed"
                    ) : "",
                )}
            >
                <img src={exercise.image} alt={exercise.name} />
                <div className="details">
                    <span className="name">{exercise.name}</span>
                    <span className="type">{exercise.type}</span>
                </div>
                {isResult && (isValidated ?
                    <div className="result">
                        <ValidatedIcon className="result-icon" />
                        <span>Validé</span>
                    </div>
                :
                    <div className="result">
                        <FailedIcon className="result-icon" />
                        <span>Échoué</span>
                    </div>
                )}
            </div>
        </Link>
    );
}

export default ExerciseItem;