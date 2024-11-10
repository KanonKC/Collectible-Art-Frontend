import { calculateExpression } from "./calculateExpression";

export function createMathGame() {
    const expressionCount = Math.floor(Math.random() * 2) + 3;
    const expressionList = [];

    const operators = ["+", "-", "*"];

    for (let i = 0; i < expressionCount - 1; i++) {
        const randomOperatorIndex = Math.floor(Math.random() * operators.length);
        
        const number = Math.floor(Math.random() * 11);
        const operator = operators[randomOperatorIndex];

        expressionList.push(number);
        expressionList.push(operator);
    }

    expressionList.push(Math.floor(Math.random() * 11));

    const expression = expressionList.join(" ");
    const answer = calculateExpression(expression)

    return {
        expression,
        answer,
    };

}