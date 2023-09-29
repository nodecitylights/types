/**
 * A type that represents the NOT logic gate.
 *
 * The NOT logic gate has the following truth table:
 *
 * | A | NOT A |
 * |---|-------|
 * | 0 |   1   |
 * | 1 |   0   |
 *
 * @template A The boolean to negate
 * @example
 * ```ts
 * type Test1 = Not<true> // false
 * type Test2 = Not<false> // true
 * ```
 */
export type Not<A extends boolean> = A extends true
	? false
	: true

/**
 * A type that represents the AND logic gate.
 *
 * The AND logic gate has the following truth table:
 *
 * | A | B | A AND B |
 * |---|---|---------|
 * | 0 | 0 |    0    |
 * | 0 | 1 |    0    |
 * | 1 | 0 |    0    |
 * | 1 | 1 |    1    |
 *
 * @template A Boolean input A
 * @template B Boolean input B
 * @example
 * ```ts
 * type Test1 = And<true, true>   // true
 * type Test2 = And<true, false>  // false
 * type Test3 = And<false, true>  // false
 * type Test4 = And<false, false> // false
 * ```
 */
export type And<A extends boolean, B extends boolean> =
	A extends true
		? ( B extends true
			? true
			: false
	) : false

/**
 * A type that represents the NAND logic gate.
 *
 * The NAND logic gate has the following truth table:
 * 
 * | A | B | A NAND B |
 * |---|---|----------|
 * | 0 | 0 |     1    |
 * | 0 | 1 |     1    |
 * | 1 | 0 |     1    |
 * | 1 | 1 |     0    |
 *
 * @template A Boolean input A
 * @template B Boolean input B
 * @example
 * ```ts
 * type Test1 = Nand<true, true>   // false
 * type Test2 = Nand<true, false>  // true
 * type Test3 = Nand<false, true>  // true
 * type Test4 = Nand<false, false> // true
 * ```
 */
export type Nand<A extends boolean, B extends boolean> = Not<And<A, B>>

/**
 * A type that represents the XOR logic gate.
 *
 * The XOR logic gate has the following truth table:
 * 
 * | A | B | A XOR B |
 * |---|---|---------|
 * | 0 | 0 |    0    |
 * | 0 | 1 |    1    |
 * | 1 | 0 |    1    |
 * | 1 | 1 |    0    |
 *
 * @template A Boolean input A
 * @template B Boolean input B
 * @example
 * ```ts
 * type Test4 = Xor<false, false> // false
 * type Test3 = Xor<false, true>  // true
 * type Test2 = Xor<true, false>  // true
 * type Test1 = Xor<true, true>   // false
 * ```
 */
export type Xor<A extends boolean, B extends boolean> = 
	Nand<
		Nand<A, Nand<A, B>>,
		Nand<B, Nand<A, B>>
	>

/**
 * A type that represents the XNOR logic gate.
 * 
 * The XNOR logic gate has the following truth table:
 * 
 * | A | B | A XNOR B |
 * |---|---|----------|
 * | 0 | 0 |     1    |
 * | 0 | 1 |     0    |
 * | 1 | 0 |     0    |
 * | 1 | 1 |     1    |
 *
 * @template A Boolean input A
 * @template B Boolean input B
 * @example
 * ```ts
 * type Test1 = Xnor<true, true>   // true
 * type Test3 = Xnor<false, true>  // false
 * type Test2 = Xnor<true, false>  // false
 * type Test4 = Xnor<false, false> // true
 * ```
 */
export type Xnor<A extends boolean, B extends boolean> =
	Nand<
		Nand<Nand<A, A>, Nand<B, B>>,
		Nand<A, B>
	>

/**
 * A type that represents the OR logic gate.
 *
 * The OR logic gate has the following truth table:
 *
 * | A | B | A OR B |
 * |---|---|--------|
 * | 0 | 0 |   0    |
 * | 0 | 1 |   1    |
 * | 1 | 0 |   1    |
 * | 1 | 1 |   1    |
 *
 * @template A Boolean input A
 * @template B Boolean input B
 * @example
 * ```ts
 * type Test4 = Or<false, false> // false
 * type Test3 = Or<false, true>  // true
 * type Test2 = Or<true, false>  // true
 * type Test1 = Or<true, true>   // true
 * ```
 */
export type Or<A extends boolean, B extends boolean> = Nand<Not<A>, Not<B>>

/**
 * A type that represents the NOR logic gate.
 *
 * The NOR logic gate has the following truth table:
 * 
 * | A | B | A NOR B |
 * |---|---|---------|
 * | 0 | 0 |    1    |
 * | 0 | 1 |    0    |
 * | 1 | 0 |    0    |
 * | 1 | 1 |    0    |
 *
 * @template A Boolean input A
 * @template B Boolean input B
 * @example
 * ```ts
 * type Test4 = Nor<false, false> // true
 * type Test3 = Nor<false, true>  // false
 * type Test2 = Nor<true, false>  // false
 * type Test1 = Nor<true, true>   // false
 * ```
 */
export type Nor<A extends boolean, B extends boolean> = Not<Or<A, B>>
