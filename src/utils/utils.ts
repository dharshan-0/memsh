export function isCompleted(cells: number, board: number[][]) {
    const total = board.length * board[0].length;
    return cells >= total - 1;
}
