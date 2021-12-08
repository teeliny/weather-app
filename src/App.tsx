import React, { useState } from 'react';
import TempSelector from './components/TempSelector';
import PaginationArrows from './components/PaginationArrows';

function App() {
  const [tempUnit, setTempUnit] = useState<string>('0');

  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTempUnit(e.target.value);
  }
  console.log(tempUnit);
  return (
    <div className="App">
      <p>Weather App from Payoneer</p>
      <TempSelector value={tempUnit} handleChange={handleUnitChange} />
      <PaginationArrows />
    </div>
  );
}

export default App;
