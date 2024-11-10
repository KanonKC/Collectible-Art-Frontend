
const STACK: (number | string)[] = [];
let pointer: number = -1;
let size: number = 0;

function push(value: number | string): void {
	if (pointer + 1 === size) {
		size += 1;
		STACK.push(value);
	} else {
		STACK[pointer + 1] = value;
	}
	pointer += 1;
}

function empty(): boolean {
	return pointer === -1;
}

function pop(remove: boolean = true): number | string | null {
	if (pointer === -1) {
		return null;
	}

	const rtn = STACK[pointer];
	if (remove) {
		pointer -= 1;
	}
	return rtn;
}

function toPostfix(expression: (string | number)[]): string {
	const operators: string[] = ["-", "+", "/", "*"];
	const result: (string | number)[] = [];

	for (const char of expression) {
		if (!operators.includes(char as string)) {
			result.push(char);
		} else {
			while (!empty()) {
				if (
					operators.indexOf(pop(false) as string) >=
					operators.indexOf(char as string)
				) {
					result.push(pop() as string);
				} else {
					break;
				}
			}
			push(char);
		}
	}

	while (!empty()) {
		result.push(pop() as string);
	}

	return result.join(" ");
}

function postfixCalculate(expression: (string | number)[]): number {
	const operators: string[] = ["-", "+", "/", "*"];
	let result: number = 0;

	for (const char of expression) {
		if (!operators.includes(char as string)) {
			push(parseInt(char as string));
		} else {
			const op1 = pop() as number;
			const op2 = pop() as number;
			result = 0;

			if (char === "-") {
				result = op2 - op1;
			} else if (char === "+") {
				result = op2 + op1;
			} else if (char === "/") {
				result = op2 / op1;
			} else if (char === "*") {
				result = op2 * op1;
			}
			push(result);
		}
	}

	return result;
}

function createNonNegativeExpressionList(expression: string[]): string[] {
	const expressionList: string[] = expression;
	for (let i = 0; i < expressionList.length - 1; i++) {
		if (expressionList[i] === "-") {
			expressionList[i] = "+";
			expressionList[i + 1] = `-${expressionList[i + 1]}`;
		}
	}
	return expressionList;
}

export function calculateExpression(expression: string) {
	const nonNegativeList = createNonNegativeExpressionList(
		expression.split(" ")
	);
	const postfix = toPostfix(nonNegativeList);
	return postfixCalculate(postfix.split(" "));
}
