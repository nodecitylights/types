export type Affix = 'suffix' | 'prefix'

export type StartsWith<V extends string, P extends string> = V extends `${P}${string}` ? true : false
export type EndsWith<V extends string, S extends string> = V extends `${string}${S}` ? true : false
export type AffixedWith<V extends string, Lit extends string, A extends Affix> = 
  A extends 'suffix' ? EndsWith<V, Lit> :
  A extends 'prefix' ? StartsWith<V, Lit> : never

export type PrefixWith<V extends string, P extends string> = `${P}${V}`
export type SuffixWith<V extends string, S extends string> = `${V}${S}`

export type RemovePrefix<V extends string, Lit extends string> = V extends `${Lit}${infer P}` ? P : V;
export type RemoveSuffix<V extends string, Lit extends string> = V extends `${infer P}${Lit}` ? P : V;
export type RemoveAffix<V extends string, Lit extends string, A extends Affix> =
  A extends 'suffix' ? RemoveSuffix<V, Lit> :
  A extends 'prefix' ? RemovePrefix<V, Lit> : never
