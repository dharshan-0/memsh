import styles from "./Cell.module.css";

type CellProps = {
    data: number;
    pos: { i: number; j: number };
    visible: boolean;
    setVisible(pos: Record<"i" | "j", number>, value: boolean): void;
};

export function Cell({ data, pos, visible, setVisible }: CellProps) {
    function handleClick() {
        setVisible(pos, true);
    }

    const cell = (
        <div
            onClick={() => handleClick()}
            className={
                `${styles.cell} ` + (visible ? `${styles["cell-active"]}` : "")
            }
        >
            {visible && data}
        </div>
    );

    return cell;
}
