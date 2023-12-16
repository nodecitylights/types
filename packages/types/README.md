# types

A small library of utility types for TypeScript.

## Install

```shell
npm install @neoncitylights/types
```

## API

### Functions (`fn.d.ts`)

- [`FnArity1<T1, R>`](packages/src/fn.d.ts) - A type representing a function with an arity of 1, or a function that takes 1 argument (`T1`) and a return type of `R`.
- [`FnArity2<T1, T2, R>`](packages/src/fn.d.ts) - A type representing a function with an arity of 2, or a function that takes 2 arguments (`T1`, `T2`) and a return type of `R`.
- [`FnArity3<T1, T2, T3, R>`](packages/src/fn.d.ts) - A type representing a function with an arity of 3, or a function that takes 3 arguments (`T1`, `T2`, `T3`) and a return type of `R`.
- [`FnArity4<T1, T2, T3, T4, R>`](packages/src/fn.d.ts) - A type representing a function with an arity of 4, or a function that takes 4 arguments (`T1`, `T2`, `T3`, `T4`) and a return type of `R`.
- [`PredicateFnArity1<T1>`](packages/src/fn.d.ts) - A type representing a predicate function with an arity of 1, or a function that takes 1 argument (`T1`) and returns a `boolean`.
- [`PredicateFnArity2<T1, T2>`](packages/src/fn.d.ts) - A type representing a predicate function with an arity of 2, or a function that takes 2 arguments (`T1`, `T2`) and returns a `boolean`.
- [`PredicateFnArity3<T1, T2, T3>`](packages/src/fn.d.ts) - A type representing a predicate function with an arity of 3, or a function that takes 3 arguments (`T1`, `T2`, `T3`) and returns a `boolean`.
- [`PredicateFnArity4<T1, T2, T3, T4>`](packages/src/fn.d.ts) - A type representing a predicate function with an arity of 4, or a function that takes 4 arguments (`T1`, `T2`, `T3`, `T4`) and returns a `boolean`.

### Logic gates (`logic.d.ts`)

- [`Not<A>`](packages/src/logic.d.ts): A type representing the logical **NOT** gate of `A`, or logical negation.
- [`And<A, B>`](packages/src/logic.d.ts): A type representing the logical **AND** gate of `A` and `B`, or logical conjunction.
- [`Or<A, B>`](packages/src/logic.d.ts): A type representing the logical **OR** gate of `A` and `B`, or logical disjunction.
- [`Nor<A, B>`](packages/src/logic.d.ts): A type representing the logical **NOR** gate of `A` and `B`, or logical non-disjunction. A special type of gate that is *functionally complete* (capable of expressing all possible truth tables).
- [`Nand<A, B>`](packages/src/logic.d.ts): A type representing the logical **NAND** gate of `A` and `B`. A special type of gate that is *functionally complete* (capable of expressing all possible truth tables).
- [`Xor<A, B>`](packages/src/logic.d.ts): A type representing the logical **XOR** gate of `A` and `B`, or exclusive disjunction/exclusive OR.
- [`Xnor<A, B>`](packages/src/logic.d.ts): A type representing the logical **XNOR** gate of `A` and `B`, or logical biconditional.

### Strings (`strings.d.ts`)

- [`Affix`](packages/src/strings.d.ts): A string union type representing the possible affixes of a string: `'prefix'` or `'suffix'`. Intended for use with generic types such as `AffixedWith` or `RemoveAffix`.
- [`StartsWith<V, P>`](packages/src/strings.d.ts): A conditional type representing whether a string value `V` starts with a prefix `P`; evaluates to a `boolean`.
- [`EndsWith<V, S>`](packages/src/strings.d.ts): A conditional type representing whether a string value `V` ends with a suffix `S`; evaluates to a `boolean`.
- [`AffixedWith<V, Lit, A>`](packages/src/strings.d.ts): A conditional type representing whether a string value `V` is affixed with an affix `Lit` with an affix kind of `A`; evaluates to a `boolean`.
- [`PrefixWith<V, Lit>`](packages/src/strings.d.ts): A template literal type representing the result of prefixing a string value `V` with a prefix `Lit`; evaluates to a string literal.
- [`SuffixWith<V, Lit>`](packages/src/strings.d.ts): A template literal type representing the result of suffixing a string value `V` with a suffix `S`; evaluates to a string literal.
- [`RemovePrefix<V, Lit>`](packages/src/strings.d.ts): A template literal type representing the result of removing a prefix `Lit` from a string value `V`; evaluates to a string literal.
- [`RemoveSuffix<V, Lit>`](packages/src/strings.d.ts): A template literal type representing the result of removing a suffix `Lit` from a string value `V`; evaluates to a string literal.
- [`RemoveAffix<V, Lit, A>`](packages/src/strings.d.ts): A template literal type representing the result of removing an affix `Lit` from a string value `V` with an affix kind of `A`; evaluates to a string literal.

## License

This library is licensed under the MIT license ([`LICENSE-MIT`](../../LICENSE) or <http://opensource.org/licenses/MIT>).

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the MIT license, shall be licensed as above, without any additional terms or conditions.
