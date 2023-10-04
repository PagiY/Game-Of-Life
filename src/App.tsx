import { useState, useEffect, useCallback } from 'react';

import './App.css';

const ROWS = 10;
const COLUMNS = 10;

const neighbors = [
  [0, -1],    // up
  [0, 1],     // down
  [1, 0],     // right
  [-1, 0],    // left
  [-1, -1],   // upper-left
  [1, -1],    // upper-right
  [-1, 1],    // lower-left
  [1, 1],     // lower-right
];

function App() {
  // create a 2D array of states for each cell
  const [grid, setGrid] = useState(() => {
    const r = [];
    for(let i = 0; i < ROWS; i++) {
      r.push(Array(COLUMNS).fill(0));
    }
    return r;
  });

  // is user playing state
  const [isPlaying, setIsPlaying] = useState(false);

  // game logic
  const playing = useCallback(() => {
    // tempGrid is used for saving the state of the new grid temporarily
    // this will be used for manipulation into the new state of the grid
    const tempGrid = JSON.parse(JSON.stringify(grid)) // create deep copy...

    for(let i = 0; i < ROWS; i++) {
      for(let j = 0; j < COLUMNS; j++) {
        // live cell
        if (grid[i][j] === 1) {

          let liveNeighbors = 0;

          neighbors.forEach(([x,y]) => {
            const neighborX = i+x;
            const neighborY = j+y;
            if ((neighborX >= 0 && neighborX < ROWS) && (neighborY >= 0 && neighborY < COLUMNS)) {
              if(grid[neighborX][neighborY] === 1){
                liveNeighbors++;
              }
            }
          })
          /**
           * Any live cell with fewer than two live neighbours dies, as if by underpopulation. 
           * Any live cell with two or three live neighbours lives on to the next generation.
           * Any live cell with more than three live neighbours dies, as if by overpopulation.
          */
          // die condition
          if (liveNeighbors < 2 || liveNeighbors > 3) {
            tempGrid[i][j] = 0;
          }
        // dead cell
        } else {
  
          let liveNeighbors = 0;

          neighbors.forEach(([x,y]) => {
            const neighborX = i+x;
            const neighborY = j+y;
            if ((neighborX >= 0 && neighborX < ROWS) && (neighborY >= 0 && neighborY < COLUMNS)) {
              if(grid[neighborX][neighborY] === 1){
                liveNeighbors++;
              }
            }
          })
          // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
          // live condition
          if (liveNeighbors === 3) {
            tempGrid[i][j] = 1;
          }
        }

      }
    }
    setGrid(tempGrid);
  }, [grid]);

  // run the game if playing
  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    const loop = setInterval(playing, 100);
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
                      tempGrid[i][k] === 1 ? tempGrid[i][k] = 0 : tempGrid[i][k] = 1;
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
