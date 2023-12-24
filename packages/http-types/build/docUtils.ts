import { makeDocBlock, makeDocSeeTag } from '@neoncitylights/codegen';
import wordWrap from 'word-wrap';

import type { ConceptValue } from './conceptTypes';
import {
	IetfDataTrackerLabelProvider,
	UrlLabelProvider,
	W3OrgLabelProvider,
	WicgLabelProvider,
} from './UrlLabelProvider';

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