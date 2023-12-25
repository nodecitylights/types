import { asCamelCase, capitalize } from './stringUtils';

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
	default: return capitalize(asCamelCase(method.toLowerCase()));
	}
}

const ForbiddenHttpRequestHeaders = [
	'Accept-Charset',
	'Accept-Encoding',
	'Access-Control-Request-Headers',
	'Access-Control-Request-Method',
	'Connection',
	'Content-Length',
	'Cookie',
	'DNT',
	'Date',
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
];

export function isForbiddenHttpRequestHeader(header: string): boolean {
	return header.startsWith('Proxy')
		|| header.startsWith('Sec')
		|| binarySearch(ForbiddenHttpRequestHeaders, header);
}

function binarySearch(array: string[], value: string): boolean {
	let left = 0;
	let right = array.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		const midValue = array[mid];
	
		if (midValue === value) {
			return true; // Found the target string
		} else if (midValue < value) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return false;
}
