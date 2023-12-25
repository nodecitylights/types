export function makeCamelCase(str: string): string {
	const words = str.split('-');
	return words[0] + words.slice(1).map((word) => capitalize(word)).join('');
}

export function capitalize(str: string): string {
	return str[0].toUpperCase() + str.slice(1);
}
