
interface QuestionData {
    id: number;
    question: string;
    answer: number;
    answer_type: string;
    correct_result: string;
    is_seen: boolean;
}

function getRandomQuestionId(): number {
    return Math.floor(Math.random() * 20);
}

const fetchQuestions = async (): Promise<QuestionData | null> => {
    try {
        const question_id: number = getRandomQuestionId();
        const response = await fetch(`http://127.0.0.1:8000/question/${question_id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return {
            id: data.id,
            question: data.question,
            answer: data.answer,
            answer_type: data.answer_type,
            correct_result: data.correct_result,
            is_seen: data.is_seen,
        };
    } catch (error) {
        console.error("Error fetching question: ", error);
        return null;
    }
};

let currentQuestionData: QuestionData | null = null;

const renderQuestion = async () => {
    try {
        const data = await fetchQuestions();
        if (data) {
            currentQuestionData = data;
            const questionArea = document.getElementById('question');
            const answerTypeArea = document.getElementById('guess_type') as HTMLInputElement;

            if (questionArea && answerTypeArea) {
                questionArea.innerHTML = `${data.question}`;
                answerTypeArea.value = `${data.answer_type}`;
            }
        } else {
            console.log("No question data available");
        }
    } catch (error) {
        console.error("Error rendering question: ", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let guessAnswer: number = 0;
    let attempts: number = 3;
    const guessElement = document.getElementById('guess') as HTMLInputElement;
    const submitButton = document.getElementById('submit-button') as HTMLButtonElement;

    if (guessElement && submitButton) {
        guessElement.addEventListener('input', (event: Event) => {
            guessAnswer = parseInt((event.target as HTMLInputElement).value, 10);
            submitButton.disabled = guessAnswer === 0;
        });

        submitButton.addEventListener('click', async () => {
            if (currentQuestionData && attempts > 0) {
                const correctAnswer = currentQuestionData.answer;
                const resultArea = document.getElementById('result-area');

                if (guessAnswer === correctAnswer) {
                    if (resultArea) {
                        resultArea.innerHTML = `${currentQuestionData.correct_result}`;
                    }
                    console.log(`Correct guess: ${guessAnswer}`);
                    submitButton.disabled = true;
                } else {
                    attempts--;
                    if (resultArea) {
                        resultArea.innerHTML = `Incorrect guess. Attempts left: ${attempts}`;
                    }
                    console.log(`Incorrect guess: ${guessAnswer}`);
                }
            } else {
                console.log("No question data or no attempts left.");
            }
        });
    }

    renderQuestion();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                const currentAnswerButton = document.getElementById('correct-answer');
                if (currentAnswerButton) {
                    currentAnswerButton.addEventListener('click', async () => {
                        try {
                            const data = await fetchQuestions();
                            const resultArea = document.getElementById('result-area');
                            if (resultArea && data) {
                                resultArea.innerHTML = `${data.correct_result}`;
                            }
                        } catch (error) {
                            console.error("Error fetching correct answer: ", error);
                        }
                    });
                    observer.disconnect();
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
