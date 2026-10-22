import './App.css'
import { Flavors } from './toppings';

function App() {
  const flavor = Flavors.Vanilla;

  return (
    <>
    <div>{flavor.name} ${(flavor.priceCents / 100).toFixed(2)}</div>
    </>
  )
}

export default App
