/**
 * Utility union type for use with generic types like
 * `AffixedWith` and `RemoveAffix`
 *
 * @example
 * ```ts
 * type Test1 = AffixedWith<'Hello', 'H', 'prefix'> // true
 * type Test2 = AffixedWith<'Hello', 'H', 'suffix'> // false
 * 
 * type Test3 = RemoveAffix<'HelloWorld', 'Hello', 'prefix'> // 'World'
 * type Test4 = RemoveAffix<'HelloWorld', 'World', 'suffix'> // 'Hello'
 * ```
 */
export type Affix = 'suffix' | 'prefix'

/**
 * A type that indicates whether a string starts with a given prefix,
 * and evaluates to a boolean
 *
 * @template V The string value to check
 * @template P The prefix to check for
 * @example
 * ```ts
 * type Test1 = StartsWith<'Hello', 'H'> // true
 * type Test2 = StartsWith<'Hello', 'e'> // false
 * ```
 */
export type StartsWith<V extends string, P extends string> = V extends `${P}${string}` ? true : false

/**
 * A type that indicates whether a string ends with a given suffix,
 * and evaluates to a boolean
 *
 * @template V The string value to check
 * @template S The suffix to check for
 * @example
 * ```ts
 * type Test1 = EndsWith<'Hello', 'o'> // true
 * type Test2 = EndsWith<'Hello', 'H'> // false
 * ```
 */
export type EndsWith<V extends string, S extends string> = V extends `${string}${S}` ? true : false

/**
 * A type that indicates whether a string starts with a given prefix or suffix,
 * and evaluates to a boolean
 *
 * @template V The string value to check
 * @template Lit The prefix or suffix to check for
 * @template A The kind of affix to check for (`'prefix'` or `'suffix'`)
 * @example
 * ```ts
 * type Test1 = AffixedWith<'Hello', 'H', 'prefix'> // true
 * type Test2 = AffixedWith<'Hello', 'e', 'suffix'> // false
 * ```
 */
export type AffixedWith<V extends string, Lit extends string, A extends Affix> =
  A extends 'suffix' ? EndsWith<V, Lit> :
  A extends 'prefix' ? StartsWith<V, Lit> : never

/**
 * A type that creates a new string literal given
 * a prefix of `P` and string value of `V`
 *
 * @template V The string value to prefix
 * @template P The prefix to prepend
 * @example
 * ```ts
 * type Test1 = PrefixWith<'Alice!', 'Hi'> // 'Hi Alice!'
 * type Test2 = PrefixWith<'Bob!', 'Hi'> // 'Hi Bob!'
 * ```
 */
export type PrefixWith<V extends string, P extends string> = `${P}${V}`

/**
 * A type that creates a new string literal given
 * a suffix of `S` and string value of `V`
 * 
 * @template V The string value to suffix
 * @template S The suffix to append to
 * @example
 * ```ts
 * type Test1 = SuffixWith<'Hi', '!'> // 'Hi!'
 * ```
 */
export type SuffixWith<V extends string, S extends string> = `${V}${S}`

/**
 * A type that creates a new string literal given
 * a string value of `V` and a prefix of `Lit`.
 *
 * If `V` does not start with `Lit`, then `V` is returned.
 *
 * @template V The string value to remove the prefix from
 * @template Lit The prefix literal to remove
 * @example
 * ```ts
 * type Test1 = RemovePrefix<'HelloWorld', 'Hello'> // 'World'
 * type Test2 = RemovePrefix<'HelloWorld', 'World'> // 'HelloWorld'
 * ```
 */
export type RemovePrefix<V extends string, Lit extends string> = V extends `${Lit}${infer P}` ? P : V;

/**
 * A type that creates a new string literal given
 * a string value of `V` and a suffix of `Lit`.
 * 
 * If `V` does not end with `Lit`, then `V` is returned.
 * 
 * @template V The string value to remove the suffix from
 * @template Lit The suffix literal to remove
 * @example
 * ```ts
 * type Test1 = RemoveSuffix<'HelloWorld', 'World'> // 'Hello'
 * type Test2 = RemoveSuffix<'HelloWorld', 'Hello'> // 'HelloWorld'
 * ```
 */
export type RemoveSuffix<V extends string, Lit extends string> = V extends `${infer P}${Lit}` ? P : V;

/**
 * A type that creates a new string literal given
 * a string value of `V`, a literal of `Lit`,
 * and an affix kind of `A`
 * 
 * - If `A` is `'prefix'`, then `Lit` is removed from the start of `V`.
 * - If `A` is `'suffix'`, then `Lit` is removed from the end of `V`.
 * - If `V` does not end/start with `Lit`, then `V` is returned.
 * 
 * @template V The string value to remove the affix from
 * @template Lit The affix literal to remove
 * @template A The kind of affix to remove (`'prefix'` or `'suffix'`)
 * @example
 * ```ts
 * type Test1 = RemoveAffix<'HelloWorld', 'Hello', 'prefix'> // 'World'
 * type Test2 = RemoveAffix<'HelloWorld', 'World', 'suffix'> // 'Hello'
 * ```
 */
export type RemoveAffix<V extends string, Lit extends string, A extends Affix> =
  A extends 'suffix' ? RemoveSuffix<V, Lit> :
  A extends 'prefix' ? RemovePrefix<V, Lit> : never
