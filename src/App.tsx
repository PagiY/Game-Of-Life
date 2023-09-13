import { useState } from 'react';
import Grid from './components/Grid';
// import { Canvas } from './Canvas';
import './App.css';

function App() {
  const [cellCountX, setCellCountX] = useState(50);
  const [cellCountY, setCellCountY] = useState(50);

  const rows: React.ReactNode[] = [];
  const cols: React.ReactNode[] = [];

  const createCells = () => {
    for(let i = 0; i < cellCountY; i++) {
      rows.push(<Grid />);
    }
    for(let i = 0; i < cellCountX; i++) {
      cols.push(<tr key={i}>{rows}</tr>);
    }
    return cols;
  }

  return (
    <>
      <table cellSpacing={0}>
        {
          createCells()
        }
      </table>
      <form>
        <input
          type="range"
          min={10}
          max={50}
          step={1}
          value={cellCountX}
          onChange={(e) => {
            setCellCountX(Number(e.target.value));
          }}
        />
        <input
          type="range"
          min={10}
          max={50}
          step={1}
          value={cellCountY}
          onChange={(e) => {
            setCellCountY(Number(e.target.value));
          }}
        />
      </form>
    </>
  )
}

export default App;
