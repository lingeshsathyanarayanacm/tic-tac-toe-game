let player = "O",
  opponent = "X";

function isMovesLeft(board) {
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) if (board[i][j] === "") return true;

  return false;
}

function evaluate(b) {
  for (let row = 0; row < 3; row++) {
    if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
      if (b[row][0] === player) return +10;
      else if (b[row][0] === opponent) return -10;
    }
  }

  for (let col = 0; col < 3; col++) {
    if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
      if (b[0][col] === player) return +10;
      else if (b[0][col] === opponent) return -10;
    }
  }

  if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
    if (b[0][0] === player) return +10;
    else if (b[0][0] === opponent) return -10;
  }

  if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
    if (b[0][2] === player) return +10;
    else if (b[0][2] === opponent) return -10;
  }

  return 0;
}
function minimax(board, depth, isMax) {
  let score = evaluate(board);

  if (score === 10) return score;

  if (score === -10) return score;

  if (isMovesLeft(board) === false) return 0;

  if (isMax) {
    let best = -1000;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = player;
          best = Math.max(best, minimax(board, depth + 1, !isMax));
          board[i][j] = "";
        }
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === "") {
          board[i][j] = opponent;
          best = Math.min(best, minimax(board, depth + 1, !isMax));
          board[i][j] = "";
        }
      }
    }
    return best;
  }
}

export default function findBestMove(board) {
  let bestVal = -1000;
  let bestMove = {};
  bestMove.row = -1;
  bestMove.col = -1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        board[i][j] = player;
        let moveVal = minimax(board, 0, false);
        board[i][j] = "";
        if (moveVal > bestVal) {
          bestMove.row = i;
          bestMove.col = j;
          bestVal = moveVal;
        }
      }
    }
  }
  return bestMove;
}
