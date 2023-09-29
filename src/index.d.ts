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

export type Not<A extends boolean> = A extends true
  ? false
  : true

export type And<A extends boolean, B extends boolean> =
  A extends true
    ? ( B extends true
      ? true
      : false
  ) : false

export type Nand<A extends boolean, B extends boolean> = Not<And<A, B>>

export type Xor<A extends boolean, B extends boolean> = 
  Nand<
    Nand<A, Nand<A, B>>,
    Nand<B, Nand<A, B>>
  >

export type Xnor<A extends boolean, B extends boolean> =
  Nand<
    Nand<Nand<A, A>, Nand<B, B>>,
    Nand<A, B>
  >

export type Or<A extends boolean, B extends boolean> = Nand<Not<A>, Not<B>>
export type Nor<A extends boolean, B extends boolean> = Not<Or<A, B>>

export type FnArity1<T1, R> = (t1: T1) => R
export type FnArity2<T1, T2, R> = (t1: T1, t2: T2) => R
export type FnArity3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R
export type FnArity4<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R

export type PredicateFnArity1<T1> = FnArity1<T1, boolean>
export type PredicateFnArity2<T1, T2> = FnArity2<T1, T2, boolean>
export type PredicateFnArity3<T1, T2, T3> = FnArity3<T1, T2, T3, boolean>
export type PredicateFnArity4<T1, T2, T3, T4> = FnArity4<T1, T2, T3, T4, boolean>
