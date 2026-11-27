// Given a type, the built in keyof operator produces a type from the keys of a type
export type PetTypeKeys = keyof { name: string; age: number };

// Given an object, return an array of type (keyof T)
export const keysOf = <T extends object>(obj: T) =>
  Object.keys(obj) as (keyof T)[];

// Given an object, keysOf produces an array of keys
export const salutationsKeys = keysOf({ hi: "there", bye: "now" });

// The typeof operator converts it to a type
export type SalutationsKeysType = typeof salutationsKeys; // ("hi" | "bye")[]

//Note that this is different from keyof
export type SalutationsKeysAlt = keyof { hi: "there"; bye: "now" }; // "hi" | "bye"

export type Flavor = {
  readonly name: string;
  readonly priceCents: number;
};

export type Topping = {
  readonly name: string;
  readonly priceCents: number;
};

// Satisfies preserves the exact key names, not just that they are strings. It also checks each entry against Flavor.
// 'as const' keeps the literal values ("Chocolate", 130) and makes every level readonly.
// Using a type like Flavors: Record<string, Flavor> would make FlavorKey just 'string' and would allow other keys to be added.
export const Flavors = {
  Chocolate: { name: "Chocolate", priceCents: 130 },
  Vanilla: { name: "Vanilla", priceCents: 100 },
  Fudge: { name: "Fudge", priceCents: 140 },
} as const satisfies Record<string, Flavor>;

export type FlavorKey = keyof typeof Flavors;

export const Toppings = {
  Sprinkles: { name: "Sprinkles", priceCents: 50 },
  WetNuts: { name: "Wet Nuts", priceCents: 5 },
} as const satisfies Record<string, Topping>;

export type ToppingKey = keyof typeof Toppings;

export type Combination = {
  readonly flavor: Flavor;
  readonly topping: Topping;
};

// Template literal types build every combination of Flavor and Topping
export type CombinationKey = `${FlavorKey}-${ToppingKey}`;

// A Record<CombinationKey, …> must have every key, so {} alone won't type-check.
// The cast tells the compiler "trust me"; the loops below keep that promise by visiting each key combination
const combinations = {} as Record<CombinationKey, Combination>;
for (const flavorKey of keysOf(Flavors)) {
  for (const toppingKey of keysOf(Toppings)) {
    combinations[`${flavorKey}-${toppingKey}`] = {
      flavor: Flavors[flavorKey],
      topping: Toppings[toppingKey],
    };
  }
}

export const Combinations: Readonly<typeof combinations> = combinations;

/* Prevented by the Readonly above
Combinations["Chocolate-Sprinkles"] = {
  flavor: Flavors.Fudge,
  topping: Toppings.WetNuts,
};
*/

/* Prevented by the readonly on flavor within Combination
Combinations["Chocolate-Sprinkles"].flavor = Flavors.Fudge;
*/

const fudgeWithExtras = { name: "Fudge", priceCents: 140, secretRecipe: true };

export const flavor: Flavor = fudgeWithExtras; // allowed: it has name and priceCents

// But this fails cause TS is strange
/*
const fancyFromLiteralWithType: Flavor = {
  name: "Fudge",
  priceCents: 140,
  secretRecipe: true,
};
*/
