import { ConceptValueDetail } from './conceptTypes';
import w3 from './w3.json';

export function makeCamelCase(str: string): string {
	const words = str.split('-');
	return words[0] + words.slice(1).map((word) => capitalize(word)).join('');
}

export function capitalize(str: string): string {
	return str[0].toUpperCase() + str.slice(1);
}

export function getDocumentationLabel(detail: ConceptValueDetail) {
	const specName = detail['spec-name'];
	const link = new URL(detail.documentation);
	const path = link.pathname;
	const hash = link.hash;

	let label = '';
	switch(link.hostname) {
	case 'wicg.github.io': {
		const realSpecName = specName.substring('WICG '.length);
		label += `WICG ${realSpecName}`;
		break;
	}
	case 'www.w3.org': {
		// http://www.w3.org/TR/server-timing/ -> server-timing
		const technicalReport = path.substring('/TR/'.length, path.length - 1);
		const w3Json = w3 as { [key: string]: string };
		const technicalReportName = w3Json[technicalReport];
		label += technicalReportName;
		break;
	}
	case 'docs.oasis-open.org': {
		label += specName;
		break;
	}
	case 'datatracker.ietf.org': {
		// example URLs:
		// - https://datatracker.ietf.org/doc/html/rfc7694#section-3
		// - https://datatracker.ietf.org/doc/html/rfc7089#section-2.1.1
		// eslint-disable-next-line security/detect-unsafe-regex
		const regex = /(draft-(\w|-)+|rfc(\d{4,}))#section-(\d+)((.\d*)*)/;
		const ietfPath = path.substring('/doc/html/'.length) + hash;
		const matches = regex.exec(ietfPath);

		if(matches !== null) {
			const isDraft: boolean = matches[1].startsWith('draft');
			const specType: string = isDraft ? 'Internet Draft' : 'RFC';
			const specName: string = isDraft ? matches[1].substring('draft-'.length) : matches[3];
			const section: string = matches[4] + matches[5];

			return `${specType} ${specName} §${section}`;
		}
		break;
	}
	default:
		label += specName;
		break;
	}

	return label;
}

export function getHttpMethodAsCamelCase(method: string): string {
	switch(method) {
	case 'MKACTIVITY': return 'MkActivity';
	case 'MKCALENDAR': return 'MkCalendar';
	case 'MKCOL': return 'MkCol';
	case 'MKREDIRECTREF': return 'MkRedirectRef';
	case 'MKWORKSPACE': return 'MkWorkspace';
	case 'ORDERPATCH': return 'OrderPatch';
	case 'PROPFIND': return 'PropFind';
	case 'PROPPATCH': return 'PropPatch';
	case 'UPDATEREDIRECTREF': return 'UpdateRedirectRef';
	default: return capitalize(makeCamelCase(method.toLowerCase()));
	}
}

export function isForbiddenHttpRequestHeader(header: string): boolean {
	return header.startsWith('Proxy')
		|| header.startsWith('Sec')
		|| [
			'Accept-Charset',
			'Accept-Encoding',
			'Access-Control-Request-Headers',
			'Access-Control-Request-Method',
			'Connection',
			'Content-Length',
			'Cookie',
			'Date',
			'DNT',
			'Expect',
			'Feature-Policy',
			'Host',
			'Keep-Alive',
			'Origin',
			'Referer',
			'TE',
			'Trailer',
			'Transfer-Encoding',
			'Upgrade',
			'Via',
		].includes(header);
}
