import { useState, useEffect, useCallback } from 'react';

import './App.css';

const ROWS = 20;
const COLUMNS = 20;

function App() {
  // create a 2D array of states for each cell
  const [grid, setGrid] = useState(() => {
    const r = [];
    for(let i = 0; i < ROWS; i++) {
      r.push(Array(COLUMNS).fill(0));
    }
    return r;
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const playing = useCallback(() => {
    console.log('hey!');
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const loop = setInterval(playing, 1000);
    return () => clearInterval(loop);
  }, [isPlaying, playing]);

  return (
    <>
      <table cellSpacing={0}>
        {
          grid.map((rows, i) => (
            <tbody key={i}>
              <tr key={`${i}r`}>
              {
                rows.map((_, k) => (
                  <td
                    key={`${i}${k}`}
                    style={{
                      border: '1px solid black',
                      backgroundColor: grid[i][k] === 1 ? 'black': 'transparent',
                      width: '15px',
                      height: '15PX',
                    }}
                    onClick={() => {
                      const tempGrid = [...grid];
                      tempGrid[i][k] = 1;
                      setGrid(tempGrid);
                    }}
                  />
                ))
              }
              </tr>
            </tbody>
          ))
        }
      </table>
      {console.log('rerender')}
      <button
        onClick={() => setIsPlaying(isPlaying ? false : true)}
      >
        {
          isPlaying ? 'Stop Playing' : 'Play'
        }
      </button>
    </>
  )
}

export default App;
