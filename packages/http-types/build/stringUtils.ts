export function asCamelCase(str: string): string {
	return str.split('-').map((word) => capitalize(word)).join('');
}

export function capitalize(str: string): string {
	return str[0].toUpperCase() + str.slice(1);
}
