import fs from 'fs';

import type { Concept } from './conceptTypes';
import { makeDocBlock, makeFullDocBlock } from './docUtils';
import { getHttpMethodAsCamelCase, isForbiddenHttpRequestHeader } from './httpUtils';
import { asCamelCase, capitalize } from './stringUtils';
import { makeExcludeType, makeStringType, makeType, makeUnionType } from './typeUtils';

const READ_FILE_PATH = './build/concepts.json';

function generate(
	writeFilePath: string,
	conceptName: string,
	endMessage: (concept: Concept) => string,
	generateFn: (concept: Concept, writeStream: fs.WriteStream) => void,
) {
	console.time(writeFilePath);
	fs.readFile(READ_FILE_PATH, 'utf8', (err, data) => {
		if(err) {
			console.error(err);
			return;
		}

		// setup file and timer
		fs.truncateSync(writeFilePath, 0);
		console.log(`${writeFilePath}: emptied`);

		const writeStream: fs.WriteStream = fs.createWriteStream(writeFilePath, {flags:'a'});
		writeStream.write(makeDocBlock([
			'This file is generated by the `build/generateHttpTypes.ts` script.',
			'To run it, run `npm run build`.',
			'Do NOT edit this file directly.',
		]) + '\n\n');

		// iterate over data
		const concepts: Concept[] = JSON.parse(data);
		const specificConcept = concepts.find((val) => val['concept'] === conceptName) as Concept;
		generateFn(specificConcept, writeStream);

		// cleanup
		writeStream.end();
		console.timeEnd(writeFilePath);
		console.log(`${writeFilePath}: ${endMessage(specificConcept)}\n`);
	});
}

// Generate HTTP methods
generate(
	'./src/httpMethods.ts',
	'http-method',
	(concepts) => `Exported ${concepts.values.length} HTTP methods`,
	(concept, writeStream) => {
		const httpMethodTypes: string[] = [];

		// generate each individual HTTP method type
		for(const conceptValue of concept.values) {
			const httpMethodType = `HttpMethod${getHttpMethodAsCamelCase(conceptValue.value)}`;
			httpMethodTypes.push(httpMethodType);

			const httpMethodName = conceptValue.value;
			const tsType = makeStringType(httpMethodType, httpMethodName);

			const docBlock = makeFullDocBlock(conceptValue);
			writeStream.write(`${docBlock}\n${tsType}\n\n`);
		}

		writeStream.write(makeUnionType('HttpMethod', httpMethodTypes) + '\n');
	},
);

// Generate HTTP status codes
generate(
	'./src/httpStatusCodes.ts',
	'http-status-code',
	(concepts) => `Exported ${concepts.values.length} HTTP status codes`,
	(concept, writeStream) => {
		const httpStatusCodeTypes: string[] = [];

		// categories
		const statusCodes100: string[] = [];
		const statusCodes200: string[] = [];
		const statusCodes300: string[] = [];
		const statusCodes400: string[] = [];
		const statusCodes500: string[] = [];

		// generate each individual HTTP status code type
		for(const conceptValue of concept.values) {
			const httpStatusCodeType = `HttpStatusCode${asCamelCase(conceptValue.value)}`;
			httpStatusCodeTypes.push(httpStatusCodeType);

			const httpStatusCodeName = conceptValue.value;
			const tsType = makeType(httpStatusCodeType, httpStatusCodeName, false);

			const docBlock = makeFullDocBlock(conceptValue);
			writeStream.write(`${docBlock}\n${tsType}\n\n`);

			const statusCodeFirstDigit = httpStatusCodeName[0];
			switch(statusCodeFirstDigit) {
			case '1': statusCodes100.push(httpStatusCodeType); break;
			case '2': statusCodes200.push(httpStatusCodeType); break;
			case '3': statusCodes300.push(httpStatusCodeType); break;
			case '4': statusCodes400.push(httpStatusCodeType); break;
			case '5': statusCodes500.push(httpStatusCodeType); break;
			}
		}

		// generate union type of all HTTP status codes
		writeStream.write(makeUnionType('HttpInfoStatusCode', statusCodes100) + '\n\n');
		writeStream.write(makeUnionType('HttpSuccessStatusCode', statusCodes200) + '\n\n');
		writeStream.write(makeUnionType('HttpRedirectStatusCode', statusCodes300) + '\n\n');
		writeStream.write(makeUnionType('HttpClientErrorStatusCode', statusCodes400) + '\n\n');
		writeStream.write(makeUnionType('HttpServerErrorStatusCode', statusCodes500) + '\n\n');
		writeStream.write(makeUnionType('HttpStatusCode', [
			'HttpInfoStatusCode',
			'HttpSuccessStatusCode',
			'HttpRedirectStatusCode',
			'HttpClientErrorStatusCode',
			'HttpServerErrorStatusCode',
		]) + '\n');
	},
);

// Generate HTTP headers
generate(
	'./src/httpHeaders.ts',
	'http-header',
	(concept) => `Exported ${concept.values.length} HTTP headers`,
	(concept, writeStream) => {
		const httpHeaderTypes: string[] = [];
		const forbiddenHttpRequestHeaders: string[] = [];

		// generate each individual HTTP header type
		for(const conceptValue of concept.values) {
			const httpHeaderType = `HttpHeader${asCamelCase(conceptValue.value)}`;
			httpHeaderTypes.push(httpHeaderType);

			const httpHeaderName = capitalize(conceptValue.value);
			const tsType = makeStringType(httpHeaderType, httpHeaderName);
			if(isForbiddenHttpRequestHeader(httpHeaderName)) {
				forbiddenHttpRequestHeaders.push(httpHeaderType);
			}

			const docBlock = makeFullDocBlock(conceptValue);
			writeStream.write(`${docBlock}\n${tsType}\n\n`);
		}

		// generate union type of all HTTP headers
		writeStream.write(makeUnionType('HttpHeader', httpHeaderTypes) + '\n\n');
		writeStream.write(makeUnionType('ForbiddenHttpRequestHeader', forbiddenHttpRequestHeaders) + '\n\n');
		writeStream.write(makeUnionType('ForbiddenHttpResponseHeader', [ 'HttpHeaderSetCookie', 'HttpHeaderSetCookie2' ]) + '\n\n');
		writeStream.write(makeExcludeType('HttpRequestHeader', 'HttpHeader', 'ForbiddenHttpRequestHeader') + '\n\n');
		writeStream.write(makeExcludeType('HttpResponseHeader', 'HttpHeader', 'ForbiddenHttpResponseHeader') + '\n');
	},
);
