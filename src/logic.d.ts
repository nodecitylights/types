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
