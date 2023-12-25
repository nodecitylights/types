export function makeCamelCase(str: string): string {
	return str.split('-')
		.map((word) => capitalize(word))
		.join('');
}

export function capitalize(str: string): string {
	if( str === '' ) { return '' }
	return (str[0] as string).toUpperCase() + str.slice(1);
}
