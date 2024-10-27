var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
function getRandomQuestionId() {
    return Math.floor(Math.random() * 20);
}
var fetchQuestions = function () { return __awaiter(_this, void 0, void 0, function () {
    var question_id, response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                question_id = getRandomQuestionId();
                return [4 /*yield*/, fetch("http://127.0.0.1:8000/question/".concat(question_id))];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("HTTP error! status: ".concat(response.status));
                }
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, {
                        id: data.id,
                        question: data.question,
                        answer: data.answer,
                        answer_type: data.answer_type,
                        correct_result: data.correct_result,
                        is_seen: data.is_seen,
                    }];
            case 3:
                error_1 = _a.sent();
                console.error("Error fetching question: ", error_1);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
var currentQuestionData = null;
var renderQuestion = function () { return __awaiter(_this, void 0, void 0, function () {
    var data, questionArea, answerTypeArea, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetchQuestions()];
            case 1:
                data = _a.sent();
                if (data) {
                    currentQuestionData = data;
                    questionArea = document.getElementById('question');
                    answerTypeArea = document.getElementById('guess_type');
                    if (questionArea && answerTypeArea) {
                        questionArea.innerHTML = "".concat(data.question);
                        answerTypeArea.value = "".concat(data.answer_type);
                    }
                }
                else {
                    console.log("No question data available");
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error("Error rendering question: ", error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
document.addEventListener('DOMContentLoaded', function () {
    var guessAnswer = 0;
    var attempts = 3;
    var guessElement = document.getElementById('guess');
    var submitButton = document.getElementById('submit-button');
    if (guessElement && submitButton) {
        guessElement.addEventListener('input', function (event) {
            guessAnswer = parseInt(event.target.value, 10);
            submitButton.disabled = guessAnswer === 0;
        });
        submitButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
            var correctAnswer, resultArea;
            return __generator(this, function (_a) {
                if (currentQuestionData && attempts > 0) {
                    correctAnswer = currentQuestionData.answer;
                    resultArea = document.getElementById('result-area');
                    if (guessAnswer === correctAnswer) {
                        if (resultArea) {
                            resultArea.innerHTML = "".concat(currentQuestionData.correct_result);
                        }
                        console.log("Correct guess: ".concat(guessAnswer));
                        submitButton.disabled = true;
                    }
                    else {
                        attempts--;
                        if (resultArea) {
                            resultArea.innerHTML = "Incorrect guess. Attempts left: ".concat(attempts);
                        }
                        console.log("Incorrect guess: ".concat(guessAnswer));
                    }
                }
                else {
                    console.log("No question data or no attempts left.");
                }
                return [2 /*return*/];
            });
        }); });
    }
    renderQuestion();
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === "childList") {
                var currentAnswerButton = document.getElementById('correct-answer');
                if (currentAnswerButton) {
                    currentAnswerButton.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                        var data, resultArea, error_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, fetchQuestions()];
                                case 1:
                                    data = _a.sent();
                                    resultArea = document.getElementById('result-area');
                                    if (resultArea && data) {
                                        resultArea.innerHTML = "".concat(data.correct_result);
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_3 = _a.sent();
                                    console.error("Error fetching correct answer: ", error_3);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                    observer.disconnect();
                }
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
});
//# sourceMappingURL=main.js.map