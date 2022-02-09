// function shortestCellPath(grid, sr, sc, tr, tc) {

//     const numberOfRows = grid.length;
//     const numberOfColumns = grid[0].length;
//     let moves = 0;
//     let flag= false;
//     let visited = {};

//     bfs(grid, sr, sc, visited)

//    function bfs(grid, sR,sC ,visited)
//      {
//        if(sR<0|| sR>= numberOfRows || sC<0||sC>= numberOfColumns||grid[sR][sC] == 0)
//          {
//            return
//          }

//        if(sR == tr && sC == tc)
//          {
//             flag= true;
//            return
//          }
//        if(flag) return
//        if(visited[`${sR} ${sC}`]) return;

//        visited[`${sR} ${sC}`] = true;
//         moves++;
//          bfs(grid,sR,sC - 1,visited)
//          bfs(grid,sR+1,sC,visited)
//          bfs(grid,sR,sC + 1,visited)
//          bfs(grid,sR -1,sC ,visited)
//      }

//      if(flag)
//        {
//          return moves
//      }else{
//        return -1
//       }
//   }

const grid = [
  [1, 1, 1, 0, 1],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 1, 0],
  [1, 1, 1, 1, 0],
]

const isEven = (num) => num % 2 === 0;

console.log([2, 4, 33, 4, 2, 8, 10].some(isEven))