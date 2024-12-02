export function commafy(num: number) {
	if (num) {
		return num.toLocaleString();
	}
	return num;
}
