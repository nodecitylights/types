export type FnArity1<T1, R> = (t1: T1) => R
export type FnArity2<T1, T2, R> = (t1: T1, t2: T2) => R
export type FnArity3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R
export type FnArity4<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R

export type PredicateFnArity1<T1> = FnArity1<T1, boolean>
export type PredicateFnArity2<T1, T2> = FnArity2<T1, T2, boolean>
export type PredicateFnArity3<T1, T2, T3> = FnArity3<T1, T2, T3, boolean>
export type PredicateFnArity4<T1, T2, T3, T4> = FnArity4<T1, T2, T3, T4, boolean>
