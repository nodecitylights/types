/**
 * A thin TypeScript wrapper over the `window.matchMedia()` API,
 * providing intelliSense for names and values of media query features.
 * 
 * @example
 * ```ts
 * import { matchMediaFeature } from '@neoncitylights/typed-css-utils';
 * 
 * const userPrefersDark: MediaQueryList = matchMediaFeature('prefers-color-scheme', 'dark');
 * const prefersLessMotion: MediaQueryList = matchMediaFeature('prefers-reduced-motion', 'reduce');
 * ```
 * @note Global browser support is at 99.65% as of November 2022,
 * and therefore stable to use.
 * 
 * | Chrome  |   Edge   | Safari  | Firefox  |  Opera   |
 * | :-----: | :------: | :-----: | :------: | :------: |
 * |  **9**  |  **12**  | **5.1** | **12.1** | **12.1** |
 *
 * @see [Can I use? / Browser support for `matchMedia()`](https://caniuse.com/matchmedia)
 * @see [W3C CSSOM View Module (**Editor's Draft**)](https://w3c.github.io/csswg-drafts/cssom-view/#dom-window-matchmedia)
 */
export function matchMediaFeature<F extends MqFeature>(feature: F, value: MqFeatureValue<F>): MediaQueryList {
	return window.matchMedia(`(${feature}: ${value})`);
}

export type MqFeature = keyof MediaQueries;
export type MqFeatureValue<K extends MqFeature> = MediaQueries[K];

/**
 * A category of user-agent (UA) devices on which a document can be displayed.
 * The main three categories that are usable in media queries are:
 *  - `all` - All devices.
 *  - `print` - Printers, and devices intended to reproduce a printed display.
 *  - `screen` -  All devices not matched by `print`.
 *
 * @note The media types `tty`, `tv`, `projection`, `handheld`, `braille`,
 * `embossed`, `speech`, and `aural` are not usable in media queries; user
 * agents must make them match nothing.
 * @see [CSS Media Queries Level 5 (**Editor's Draft**) § Definition of `all`](https://www.w3.org/TR/mediaqueries-5/#valdef-media-all)
 * @see [CSS Media Queries Level 5 (**Editor's Draft**) § Definition of `print`](https://www.w3.org/TR/mediaqueries-5/#valdef-media-print)
 * @see [CSS Media Queries Level 5 (**Editor's Draft**) § Definition of `screen`](https://www.w3.org/TR/mediaqueries-5/#valdef-media-screen)
 */
export type MediaType =
	| 'all'
	| 'print'
	| 'screen'
	| 'tty'
	| 'tv'
	| 'projection'
	| 'handheld'
	| 'braille'
	| 'embossed'
	| 'aural'
	| 'speech';

/**
 * Type of acceptable values for a media feature:
 *  - `discrete`: a feature that take values from a set with no intrinsic order
 *  - `range`: a feature that take values from a range, where all values are comparable
 *
 * @see [Media Queries Level 5 (**Editor's Draft**)](https://drafts.csswg.org/mediaqueries-5/#mq-ranges)
 */
export type MediaFeatureType = 'range' | 'discrete';

/**
 * An integer with value '0' or '1'.
 * @see [Media Queries Level 5 (**Editor's Draft**)](https://drafts.csswg.org/mediaqueries-5/#typedef-mq-boolean)
 */
export type MqBoolean = 0 | 1;

// Viewport/page characteristics media features
// @see https://drafts.csswg.org/mediaqueries-5/#mf-viewport-characteristics

export type MqAspectRatio = number; // CSSRatioValue
export type MqHeight = number; // CSSLengthValue
export type MqWidth = number; // CSSLengthValue
export type MqOrientation = 'portrait' | 'landscape';
export type MqOverflowBlock = 'none' | 'scroll' | 'optional-paged' | 'paged';
export type MqOverflowInline = 'none' | 'scroll';
export type MqHorizontalViewportSegments = number;
export type MqVerticalViewportSegments = number;
export type MqDisplayMode = 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser' | 'windows-controls-overlay';

// Display quality media features
// @see https://drafts.csswg.org/mediaqueries-5/#mf-display-quality

export type MqResolution = number; // CSSResolutionValue
export type MqScan = 'interlace' | 'progressive';
export type MqGrid = undefined | MqBoolean;
export type MqUpdate = 'none' | 'slow' | 'fast';
export type MqEnvironmentBlending = 'opaque' | 'additive' | 'subtractive';

// Color media features
// @see https://drafts.csswg.org/mediaqueries-5/#mf-color

export type MqColor = number;
export type MqColorIndex = number;
export type MqMonochrome = undefined | number;
export type MqColorGamut = 'srgb' | 'p3' | 'rec2020';
export type MqDynamicRange = 'standard' | 'high';
export type MqInvertedColors = 'none' | 'inverted';

// Interaction media features
// @see https://drafts.csswg.org/mediaqueries-5/#mf-interaction

export type MqPointer = 'none' | 'coarse' | 'fine';
export type MqHover = 'none' | 'hover';
export type MqAnyPointer = 'none' | 'coarse' | 'fine';
export type MqAnyHover = 'none' | 'hover';
export type MqNavControls = 'none' | 'back';

// Video media features
// @see https://drafts.csswg.org/mediaqueries-5/#video-prefixed-features

export type MqVideoColorGamut = 'srgb' | 'p3' | 'rec2020';
export type MqVideoDynamicRange = 'standard' | 'high';

// Scripting media features
// @see https://drafts.csswg.org/mediaqueries-5/#mf-scripting

export type MqScripting = 'none' | 'initial-only' | 'enabled';

// User preference media features
// @see https://drafts.csswg.org/mediaqueries-5/#mf-user-preferences

export type MqPrefersColorScheme = 'light' | 'dark';
export type MqPrefersContrast = 'no-preference' | 'more' | 'less' | 'custom';
export type MqForcedColors = 'none' | 'active';
export type MqPrefersReducedData = 'no-preference' | 'reduce';
export type MqPrefersReducedMotion = 'no-preference' | 'reduce';
export type MqPrefersReducedTransparency = 'no-preference' | 'reduce';

export interface MediaQueries {
	// Viewport/page characteristics media features
	'aspect-ratio': MqAspectRatio,
	'min-aspect-ratio': MqAspectRatio,
	'max-aspect-ratio': MqAspectRatio,
	'height': MqHeight,
	'min-height': MqHeight,
	'max-height': MqHeight,
	'width': MqWidth,
	'min-width': MqWidth,
	'max-width': MqWidth,
	'orientation': MqOrientation,
	'overflow-block': MqOverflowBlock,
	'overflow-inline': MqOverflowInline,
	'horizontal-viewport-segments': MqHorizontalViewportSegments,
	'min-horizontal-viewport-segments': MqHorizontalViewportSegments,
	'max-horizontal-viewport-segments': MqHorizontalViewportSegments,
	'vertical-viewport-segments': MqVerticalViewportSegments,
	'min-vertical-viewport-segments': MqVerticalViewportSegments,
	'max-vertical-viewport-segments': MqVerticalViewportSegments,
	'display-mode': MqDisplayMode,

	// Display quality media features
	'resolution': MqResolution,
	'min-resolution': MqResolution,
	'max-resolution': MqResolution,
	'scan': MqScan,
	'grid': MqGrid,
	'update': MqUpdate,
	'environment-blending': MqEnvironmentBlending,

	// Color media features
	'color': MqColor,
	'min-color': MqColor,
	'max-color': MqColor,
	'color-index': MqColorIndex,
	'monochrome': MqMonochrome,
	'min-monochrome': MqMonochrome,
	'max-monochrome': MqMonochrome,
	'color-gamut': MqColorGamut,
	'min-color-index': MqColorIndex,
	'max-color-index': MqColorIndex,
	'dynamic-range': MqDynamicRange,
	'inverted-colors': MqInvertedColors,

	// Interaction media features
	'pointer': MqPointer,
	'hover': MqHover,
	'any-pointer': MqAnyPointer,
	'any-hover': MqAnyHover,
	'nav-controls': MqNavControls,

	// Video media features
	'video-color-gamut': MqVideoColorGamut,
	'video-dynamic-range': MqVideoDynamicRange,

	// Scripting media features
	'scripting': MqScripting,

	// User preference media features
	'prefers-color-scheme': MqPrefersColorScheme,
	'prefers-contrast': MqPrefersContrast,
	'forced-colors': MqForcedColors,
	'prefers-reduced-data': MqPrefersReducedData,
	'prefers-reduced-motion': MqPrefersReducedMotion,
	'prefers-reduced-transparency': MqPrefersReducedTransparency,
}
