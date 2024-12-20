import { useRef, useState } from "react";
import { Cell } from "../Cell";
import { isCompleted } from "../../utils";

type GridItemsProps = {
    board: number[][];
};

type Pos = {
    i: number;
    j: number;
} | null;

export function GridItems({ board }: GridItemsProps) {
    const [boardStatus, setBoardStatus] = useState(
        Array.from({ length: board.length })
            .fill([])
            .map(() =>
                Array.from({ length: board[0].length }).fill(false)
            ) as boolean[][]
    );
    const [prevPos, setPrevPos] = useState<Pos>(null);
    const completed = useRef(0);
    const isNotMiddle = useRef(true);

    function handleNotSame(pos: NonNullable<Pos>, prevC: NonNullable<Pos>) {
        if (board[pos.i][pos.j] === board[prevC.i][prevC.j]) {
            isNotMiddle.current = true;
            completed.current += 2;
            return;
        }
        setTimeout(() => {
            boardStatus[pos.i][pos.j] = false;
            boardStatus[prevC.i][prevC.j] = false;
            setBoardStatus([...boardStatus]);
            isNotMiddle.current = true;
        }, 1 * 1000);
    }

    function setVisible(pos: NonNullable<Pos>, value: boolean) {
        // first click
        if (!prevPos && isNotMiddle.current) {
            boardStatus[pos.i][pos.j] = value;
            setBoardStatus([...boardStatus]);
            setPrevPos(pos);
            return;
        }

        //second click
        if (
            prevPos &&
            isNotMiddle.current &&
            (prevPos.i !== pos.i || prevPos.j !== pos.j)
        ) {
            boardStatus[pos.i][pos.j] = value;
            setBoardStatus([...boardStatus]);
            setPrevPos(null);

            isNotMiddle.current = false;
            handleNotSame({ ...pos }, { ...prevPos });
        }
    }

    return (
        <>
            {isCompleted(completed.current, board) ? (
                <h1 style={{ textAlign: "center" }}>Completed</h1>
            ) : (
                board.map((row, i) => (
                    <div key={i}>
                        {row.map((col, j) => (
                            <Cell
                                key={j}
                                data={col}
                                setVisible={setVisible}
                                visible={boardStatus[i][j]}
                                pos={{ i, j }}
                            />
                        ))}
                    </div>
                ))
            )}
        </>
    );
}
