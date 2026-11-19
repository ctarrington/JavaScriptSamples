import { useState } from "react";
import "./App.css";
import { Combinations, keysOf, type CombinationKey } from "./toppings";

const combinationKeys = keysOf(Combinations);

const formatCents = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100,
  );

function App() {
  const [selectedKey, setSelectedKey] = useState<CombinationKey>(
    combinationKeys[0],
  );
  const { flavor, topping } = Combinations[selectedKey];

  return (
    <>
      <select
        value={selectedKey}
        // Options only come from combinationKeys, so the value is always a CombinationKey.
        onChange={(e) => setSelectedKey(e.target.value as CombinationKey)}
      >
        {combinationKeys.map((key) => (
          <option key={key} value={key}>
            {Combinations[key].flavor.name} with{" "}
            {Combinations[key].topping.name}
          </option>
        ))}
      </select>

      <div>Flavor: {flavor.name}</div>
      <div>Topping: {topping.name}</div>
      <div>Price: {formatCents(flavor.priceCents + topping.priceCents)}</div>
    </>
  );
}

export default App;
