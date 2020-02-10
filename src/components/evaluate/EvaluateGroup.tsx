import React, { FC, useEffect, useState, useRef } from 'react';
import { withRouter, match } from 'react-router';

import { Menu, Col, Button, Icon } from 'antd';

import './EvaluateGroup.css';

import EvaluateExercise from './EvaluateExercise';

import { Card, Loading } from '../custom';

import * as api from '../../api';
import { Rank, Test, ExerciseScale, Member, ExerciseResult, TestResult } from '../../types';
import { create as createExerciseReult } from '../../utils/ExerciseResult.utils';

const EvaluateGroup: FC<{
    match: match<any>;
    history: any;
}> = ({ match, history }) => {
    const [ test, setTest ] = useState<Test>(undefined);
    const [ performers, setPerformers ] = useState<Array<Member>>([]);
    const [ exercisesScales, setExercisesScales ] = useState<Array<ExerciseScale>>([]);
    const [ performer, setPerformer ] = useState<Member>(undefined);
    const [ exerciseScale, setExerciseScale ] = useState<ExerciseScale>(undefined);
    const [ testsResults, setTestsResults ] = useState<Array<TestResult>>([]);
    const [ testResult, setTestResult ] = useState<TestResult>(undefined);
    const [ exerciseResult, setExerciseResult ] = useState<{
        base: ExerciseResult;
        modified: ExerciseResult;
    }>(undefined);

    useEffect(() => {
        const testId = match.params.id;
        Promise.all([
            api.Tests.byId(testId),
            api.TestResults.byTestId(testId),
            api.Members.byTestId(testId),
        ]).then(([ test, testsResults, performers ]) => {
            setTest(test);
            setTestsResults(testsResults);
            setPerformers(performers);
            setPerformer(performers.length > 0 ? performers[0] : undefined);
            if (test.type === 'PROGRAM')
                initExercisesScales(test.program.exercisesScales);
            if (test.type === 'RANK')
                api.Ranks.byTestId(test.id)
                    .then((ranks: Rank[]) => {
                        initExercisesScales(
                            ranks.reduce((exercisesScales: ExerciseScale[], rank: Rank) => 
                                exercisesScales.concat(rank.exercisesScales)
                            , [])
                        );
                    });
        });

        const unlistenSave = history.listen(save);
        window.addEventListener("beforeunload", save);
        return () => {
            window.removeEventListener("beforeunload", save);
            unlistenSave();
        }
    }, []);

    useEffect(() => {
        save();

        if (!performer || !exerciseScale) {
            setExerciseResult(undefined);
            return;
        }
        const testResult = testsResults.find(testResult =>
            testResult.performerId === performer.id
        );
        setTestResult(testResult);
        api.ExerciseResults.byTestResultIdAndExerciseScaleId(testResult.id, exerciseScale.id)
            .then((exercisesResults: ExerciseResult[]) => {
                const exerciseResult = exercisesResults.length > 0 ? exercisesResults[0] : createExerciseReult(exerciseScale);
                setExerciseResult({
                    base: exerciseResult,
                    modified: exerciseResult
                });
            });
    }, [performer, exerciseScale]);

    const initExercisesScales = (exercisesScales: ExerciseScale[]) => {
        setExercisesScales(exercisesScales);
        setExerciseScale(exercisesScales.length > 0 ? exercisesScales[0] : undefined)
    }

    const handleExerciseResultChange = (modified: ExerciseResult) => setExerciseResult({
        ...exerciseResult,
        modified
    });

    const handleNext = () => {
        const performerIndex = performers.indexOf(performer);
        if (performerIndex !== performers.length - 1)
            setPerformer(performers[performerIndex + 1]);
        else {
            setPerformer(performers[0]);
            const exerciseScaleIndex = exercisesScales.indexOf(exerciseScale);
            setExerciseScale(exercisesScales[(exerciseScaleIndex + 1) % exercisesScales.length]);
        }
    }

    const exerciseResultRef = useRef(exerciseResult);
    const testResultRef = useRef(testResult);
    useEffect(() => {
        exerciseResultRef.current = exerciseResult;
        testResultRef.current = testResult;
    }, [exerciseResult, testResult]);
    const save = () => {
        const exerciseResult = exerciseResultRef.current;
        const testResult = testResultRef.current;
        if (exerciseResult && exerciseResult.base !== exerciseResult.modified) {
            if (exerciseResult.modified.id)
                api.ExerciseResults.update(exerciseResult.modified);
            else 
                api.ExerciseResults.create(testResult.id, exerciseResult.modified);
        }
    }

    if (!test)
        return <Loading />;
    return (
        <Card className="EvaluateGroup">
            <Col className="list" xs={5} sm={5} md={5} lg={5} xl={5}>
                <div className="list-header">Exercices</div>
                <Menu selectedKeys={exerciseScale ? [exerciseScale.id+''] : []}>
                    {exercisesScales.map(exerciseScale => 
                        <Menu.Item
                            key={exerciseScale.id}
                            onClick={() => setExerciseScale(exerciseScale)}
                        >
                            <span>{exerciseScale.exercise.name}</span>
                        </Menu.Item>
                    )}
                </Menu>
            </Col>
            <Col className="list" xs={5} sm={5} md={5} lg={5} xl={5}>
                <div className="list-header">Pratiquants</div>
                <Menu selectedKeys={performer ? [performer.id+''] : []}>
                    {performers.map((performer) =>
                        <Menu.Item
                            key={performer.id}
                            onClick={() => setPerformer(performer)}
                        >
                            <span>{performer.firstName + " " + performer.lastName}</span>
                        </Menu.Item>
                    )}
                </Menu>
            </Col>
            <Col xs={14} sm={14} md={14} lg={14} xl={14} className="exercise-panel">
                <EvaluateExercise
                    exerciseResult={exerciseResult ? exerciseResult.modified : undefined}
                    onChange={handleExerciseResultChange}
                />
                <div className="next">
                    <Button onClick={handleNext} type="primary">SUIVANT <Icon type="right"/></Button>
                </div>
            </Col>
        </Card>
    );
}

export default withRouter(EvaluateGroup as any);
