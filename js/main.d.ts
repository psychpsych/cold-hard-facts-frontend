interface QuestionData {
    id: number;
    question: string;
    answer: number;
    answer_type: string;
    correct_result: string;
    is_seen: boolean;
}
declare function getRandomQuestionId(): number;
declare const fetchQuestions: () => Promise<QuestionData | null>;
declare let currentQuestionData: QuestionData | null;
declare const renderQuestion: () => Promise<void>;
