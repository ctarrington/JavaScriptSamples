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

export type ToppingKey = keyof typeof Toppings;

export type Combination = {
  flavor: Flavor;
  topping: Topping;
};

export type CombinationKey = `${FlavorKey}-${ToppingKey}`;
