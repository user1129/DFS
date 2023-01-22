import { useState } from "react";
import "./style.css";

function dfs(grid, y, x) {
  grid[y][x] = 0;

  for (let [dx, dy] of [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]) {
    const nextX = x + dx;
    const nextY = y + dy;

    if (
      withinGrid(grid.length, grid[0].length, nextX, nextY) &&
      grid[nextY][nextX] === 1
    ) {
      dfs(grid, nextY, nextX);
    }
  }
}

function withinGrid(h, w, x, y) {
  return 0 <= x && x < w && 0 <= y && y < h;
}

function updater(){
    let list = []
    for(let i = 0;i<15;i++){
        let row = []
        for(let j = 0;j<15;j++){
            let item = Math.round(Math.random());
            row.push(item)
        }
        list.push(row)
    }
    return list
}

function Grid({ array }) {
  const [state, setState] = useState(0);
  const [matrix,setMatrix] = useState(array)
  return (
    
    <div className="GridBox">
      {matrix.map((row, i) => {
        return (
          <div className="row">
            {row.map((item, j) => {
              return (
                <div
                  className={item === 0 ? "sea" : "island"}
                  onClick={() => {
                    if (item === 1) {
                      dfs(matrix, i, j);
                      setState(state + 1);
                    }
                  }}
                ></div>
              );
            })}
          </div>
        );
      })}
      <button id="button" onClick={() => setMatrix(updater())}>Update Grid</button>
    </div>
  );
}
export default Grid;
