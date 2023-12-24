import wordWrap from 'word-wrap';

import type { ConceptValue } from './conceptTypes';
import {
	IetfDataTrackerLabelProvider,
	UrlLabelProvider,
	W3OrgLabelProvider,
	WicgLabelProvider
} from './UrlLabelProvider';

export function makeDocTag(annotation: string, value: string): string {
	return `@${annotation} ${value}`;
}

export function makeDocSeeTag(label: string, link: URL): string {
	return makeDocTag('see', `[${label}](${link})`);
}

export function makeDocBlock(values: string[]): string {
	let docBlock = '/**\n';
	for(const value of values) {
		docBlock += ` *${value === '' ? '\n' : ` ${value}\n`}`;
	}
	docBlock += ' */';
	return docBlock;
}

const labelProvider = new UrlLabelProvider([
	new W3OrgLabelProvider(),
	new WicgLabelProvider(),
	new IetfDataTrackerLabelProvider(),
]);

export function makeFullDocBlock(conceptValue: ConceptValue): string {
	const description = wordWrap(conceptValue.details[0].description, { width: 60, indent: '' });
	const lines = description.split('\n');

	const docLinks: string[] = [];
	const specLinks: string[] = [];

	for(const detail of conceptValue.details) {
		docLinks.push(makeDocSeeTag(
			`Documentation → ${labelProvider.provideLabel(detail, true)}`,
			new URL(detail.documentation)));

		specLinks.push(makeDocSeeTag(
			`Specification → ${labelProvider.provideLabel(detail, false)}`,
			new URL(detail.specification)));
	}

	const docBlock = makeDocBlock([
		...lines.map((line) => line.trim()),
		'',
		...docLinks,
		...specLinks,
	]);

	return docBlock;
}