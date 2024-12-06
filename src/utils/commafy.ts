export function commafy(num: number | string) {
	if (num) {
		return num.toLocaleString();
	}
	return num;
}
