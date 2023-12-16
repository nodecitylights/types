import { PropertiesHyphen } from 'csstype';

export type CSSProperty = keyof PropertiesHyphen;
export type CSSPropertyValue<K extends CSSProperty> = Required<PropertiesHyphen[K]>;

/**
 * A TypeScript implementation of `CSS.supports()`, which provides
 * intellisense (autocomplete suggestions) and validation for CSS
 * property names and CSS property values.
 *
 * @example
 * ```ts
 * import { cssSupports } from '@neoncitylights/typed-css-utils';
 *
 * const supportsGrid = cssSupports('display', 'grid');
 * const supportsFlex = cssSupports('display', 'flex');
 * ```
 * @note Global browser support is at 98.79% as of November 2022,
 * and therefore stable to use.
 *
 * |  Chrome  |   Edge   | Safari  | Firefox  |  Opera   |
 * | :------: | :------: | :-----: | :------: | :------: |
 * |  **61**  |  **79**  |  **9**  |  **55**  |  **15**  |
 *
 * @see https://caniuse.com/css-supports-api
 * @see https://w3c.github.io/csswg-drafts/css-conditional/#at-supports-ext
 */
export function cssSupports<K extends CSSProperty>(property: K, value: CSSPropertyValue<K>): boolean {
	return CSS.supports(property, value.toString());
}
