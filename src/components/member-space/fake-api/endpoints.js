import * as api from '../../../api';

export const Ranks = {
    byId: (id) => api.Ranks.byId(id).then(rank => {
        const { exercisesScales } = rank;
        for (let i = 0; i < 3; i++)
            rank.exercisesScales = rank.exercisesScales.concat(exercisesScales);
        rank.description = "Description du grade Petit Panda, nanani na nan na na nian ian ian a ann an a ian ia n.";
        return rank;
    }),
};

export const ExerciseResults = {
    byId: (id) => fakeExerciseResults(1).then(exerciseResults => exerciseResults[0]),
    byTestResultIdAndExerciseId: (testId) => api.ExerciseResults.byTestResultId(testId),
    update: (exerciseResult) =>  api.ExerciseResults.update(exerciseResult),
    byRankIdAndPerformerId: (rankId, performerId) => fakeExerciseResults(rankId),
    byTestIdAndPerformerId: (testId, performerId) => fakeExerciseResults(testId),
};

const fakeExerciseResults = (rankId) => Ranks.byId(rankId).then(rank => {
    const randomScore = (scale) => Math.floor((Math.random() * scale) + 1);
    return rank.exercisesScales.map((exerciseScale, index) => {
        var exerciseResult = {
            id: index,
            exerciseScale,
            type: exerciseScale.exercise.type,
        }
        switch (exerciseResult.type) {
            case 'TAOLU':
                exerciseResult.criterionResults = exerciseScale.criterionScales.map(criteriaScale => ({
                    criteriaScale,
                    score: randomScore(criteriaScale.scale),
                }));
                break;
            case 'FIGHT':
                exerciseResult.roundsResults = exerciseScale.roundsScales.map(roundScale => ({
                    roundScale,
                    criterionResults: roundScale.criterionScales.map(criteriaScale => ({
                        criteriaScale,
                        score: randomScore(criteriaScale.scale),
                    })),
                }));
                break;
            case 'PHYSICAL':
                exerciseResult.score = randomScore(20);
                break;
            case 'THEORETICAL':
                exerciseResult.score = randomScore(exerciseResult.exerciseScale.scale);
                break;
            default:
                break;
        }
        return exerciseResult;
    });
});

export const Tests = {
    byId: (testId) => api.Tests.byId(testId),
    allUpcomingByMemberId: (memberId) => api.Tests.all(),
};

export const TestResults = {
    allStartedByMemberId: (memberId) => fakeTestResults(),
    allCompletedByMemberId: (memberId) => fakeTestResults(),
}

const fakeTestResults = () => api.Tests.all().then(tests => tests.map(test => {
    return {
        test,
        performerGroup: {
            id: 1,
            name: "Groupe 1",
        },
    };
}));
