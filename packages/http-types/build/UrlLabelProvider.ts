import { ConceptValueDetail } from './conceptTypes';
import w3 from './w3.json';

export class UrlLabelProvider {
	private providers: UrlLabelProviderForHost[];
	constructor(providers: UrlLabelProviderForHost[] = []) {
		this.providers = providers;
	}

	registerProviders(providers: UrlLabelProviderForHost[]) {
		this.providers.push(...providers);
	}

	provideLabel(detail: ConceptValueDetail, includeFragment: boolean): string {
		const link = new URL(detail.documentation);
		const hostName = link.hostname;
		const provider = this.providers.find((provider) => provider.matchesHostName(hostName));
		if(provider) {
			return provider.provideLabel(detail, includeFragment);
		} else {
			return detail['spec-name'];
		}
	}
}

export interface UrlLabelProviderForHost {
	matchesHostName(hostName: string): boolean;
	provideLabel(detail: ConceptValueDetail, includeFragment: boolean): string;
}

export class W3OrgLabelProvider implements UrlLabelProviderForHost {
	matchesHostName(hostName: string): boolean {
		return hostName === 'w3.org' || hostName === 'www.w3.org';
	}

	provideLabel(detail: ConceptValueDetail, _: boolean): string {
		const link = new URL(detail.documentation);
		const path = link.pathname;

		// http://www.w3.org/TR/server-timing/ -> server-timing
		const lastIndex = path.endsWith('/') ? path.length - 1 : path.length;
		let technicalReport = path.substring('/TR/'.length, lastIndex);
		const lastIndexDot = technicalReport.lastIndexOf('.');

		if ( lastIndexDot !== -1 ) {
			technicalReport = technicalReport.substring(0, lastIndexDot);
		}

		const w3Json = w3 as { [key: string]: string };
		const technicalReportName = w3Json[technicalReport];

		return technicalReportName;
	}
}

export class WicgLabelProvider implements UrlLabelProviderForHost {
	matchesHostName(hostName: string): boolean {
		return hostName === 'wicg.github.io';
	}

	provideLabel(detail: ConceptValueDetail, _: boolean): string {
		const specName = detail['spec-name'];
		const realSpecName = specName.substring('WICG '.length);
		return `WICG ${realSpecName}`;
	}
}

export class IetfDataTrackerLabelProvider implements UrlLabelProviderForHost {
	matchesHostName(hostName: string): boolean {
		return hostName === 'datatracker.ietf.org';
	}

	provideLabel(detail: ConceptValueDetail, includeFragment: boolean): string {
		if ( !includeFragment ) {
			return detail['spec-name'];
		}

		const link = new URL(detail.documentation);
		const path = link.pathname;
		const hash = link.hash;

		// eslint-disable-next-line security/detect-unsafe-regex
		const regex = /(draft-(\w|-)+|rfc(\d{4,}))#section-(\d+)((.\d*)*)/;
		const ietfPath = path.substring('/doc/html/'.length) + hash;
		const matches = regex.exec(ietfPath);

		if( matches === null ) {
			return '';
		}

		const isDraft: boolean = matches[1].startsWith('draft');
		const specType: string = isDraft ? 'Internet Draft' : 'RFC';
		const specName: string = isDraft ? matches[1].substring('draft-'.length) : matches[3];
		const section: string = matches[4] + matches[5];

		return `${specType} ${specName} §${section}`;
	}
}
