/** 
 * A type representing a function with an arity of 1,
 * or a function that takes 1 parameter.
 *
 * @template T1 The type of parameter #1
 * @template R The return type of the function
 */
export type FnArity1<T1, R> = (t1: T1) => R

/**
 * A type representing a function with an arity of 2,
 * or a function that takes 2 parameters.
 *
 * @template T1 The type of parameter #1
 * @template T2 The type of parameter #2
 * @template R The return type of the function
 */
export type FnArity2<T1, T2, R> = (t1: T1, t2: T2) => R

/**
 * A type representing a function with an arity of 3,
 * or a function that takes 3 parameters.
 *
 * @template T1 The type of parameter #1
 * @template T2 The type of parameter #2
 * @template T3 The type of parameter #3
 * @template R The return type of the function
 */
export type FnArity3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R

/**
 * A type representing a function with an arity of 4,
 * or a function that takes 4 parameters.
 *
 * @template T1 The type of parameter #1
 * @template T2 The type of parameter #2
 * @template T3 The type of parameter #3
 * @template T4 The type of parameter #4
 * @template R The return type of the function
 */
export type FnArity4<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R

/**
 * A type representing a predicate function with an arity of 1,
 * or a function that takes 5 parameters and returns a `boolean`
 *
 * @template T1 The type of parameter #1
 * @template R The return type of the function
 */
export type PredicateFnArity1<T1> = FnArity1<T1, boolean>

/**
 * A type representing a predicate function with an arity of 2,
 * or a function that takes 2 parameters and returns a `boolean`
 * 
 * @template T1 The type of parameter #1
 * @template T2 The type of parameter #2
 * @template R The return type of the function
 */
export type PredicateFnArity2<T1, T2> = FnArity2<T1, T2, boolean>

/**
 * A type representing a predicate function with an arity of 3,
 * or a function that takes 3 parameters and returns a `boolean`
 * 
 * @template T1 The type of parameter #1
 * @template T2 The type of parameter #2
 * @template T3 The type of parameter #3
 * @template R The return type of the function
 */
export type PredicateFnArity3<T1, T2, T3> = FnArity3<T1, T2, T3, boolean>

/**
 * A type representing a predicate function with an arity of 4,
 * or a function that takes 4 parameters and returns a `boolean`
 * 
 * @template T1 The type of parameter #1
 * @template T2 The type of parameter #2
 * @template T3 The type of parameter #3
 * @template T4 The type of parameter #4
 * @template R The return type of the function
 */
export type PredicateFnArity4<T1, T2, T3, T4> = FnArity4<T1, T2, T3, T4, boolean>
