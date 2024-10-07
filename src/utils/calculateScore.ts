type AnswerQuestion = {
    userAnswer?: string;
    answer: string[];
    question: string;
    correct_answer?: string;
};

type Quiz = {
    difficult: string;
    allAnswerAndQuestion: AnswerQuestion[];
    endDate: string;
    startDate: string;
    name: string;
};

function calculateScore(quiz: Quiz): { correct: number; incorrect: number; totalScore: number } {
    let correct = 0;
    let incorrect = 0;

    quiz.allAnswerAndQuestion.forEach((item) => {
        if (item.correct_answer !== undefined) {
            if (item.userAnswer === item.correct_answer) {
                correct += 1;
            } else if (item.userAnswer) {
                incorrect += 1;
            }
        }
    });

    const totalScore = correct * 10;

    return { correct, incorrect, totalScore };
}

export default calculateScore
