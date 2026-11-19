export const keysOf = <T extends object>(obj: T) =>
  Object.keys(obj) as (keyof T)[];

export type Flavor = {
  name: string;
  priceCents: number;
};

export type Topping = {
  name: string;
  priceCents: number;
};

export const Flavors = {
  Chocolate: { name: "Chocolate", priceCents: 130 },
  Vanilla: { name: "Vanilla", priceCents: 100 },
} as const satisfies Record<string, Flavor>;

export type FlavorKey = keyof typeof Flavors;

export const Toppings = {
  Sprinkles: { name: "Sprinkles", priceCents: 50 },
  WetNuts: { name: "Wet Nuts", priceCents: 5 },
} as const satisfies Record<string, Topping>;

// Satisfies preserves the the exact literal values for the keys, not just that they are strings.
// Using a type like Toppings : Record<string, Topping> does not remember the literal values

export type ToppingKey = keyof typeof Toppings;

export type Combination = {
  flavor: Flavor;
  topping: Topping;
};

export type CombinationKey = `${FlavorKey}-${ToppingKey}`;

// Starts empty; the loops below fill in every CombinationKey.
export const Combinations = {} as Record<CombinationKey, Combination>;
for (const flavorKey of keysOf(Flavors)) {
  for (const toppingKey of keysOf(Toppings)) {
    Combinations[`${flavorKey}-${toppingKey}`] = {
      flavor: Flavors[flavorKey],
      topping: Toppings[toppingKey],
    };
  }
}
