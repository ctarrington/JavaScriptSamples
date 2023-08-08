import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [lastEvent, setLastEvent] = useState<string>('');
  useEffect(() => {
    document.addEventListener('mousemove', (event) => {
      console.log(event.type, event);
      setLastEvent(`${event.type}: screen (${event.screenX}, ${event.screenY})`);
      event.preventDefault();
    });
    document.addEventListener('touchmove', (event) => {
      console.log(event.type, event.touches.length, event);

      const touches = event.touches;
      let touchSummary = '';
      for (let index=0;index<touches.length; index++) {
        const touch = touches.item(index);
        if (!touch) {
          continue;
        }

        touchSummary += `${index} screen: (${touch.screenX}, ${touch.screenY}), `;
      }

      setLastEvent(`${event.type}: ${touchSummary}`);
    });
  });

  return (
    <div className="App">
      <div>hi</div>
      <div>{lastEvent}</div>
    </div>
  );
}

export default App;
