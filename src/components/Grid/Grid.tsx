import styles from "./Grid.module.css";

type GridProps = {
    children: React.ReactNode;
}

export function Grid({ children }: GridProps) {
    return (
        <div className={styles.grid}>
            {children}
        </div>
    );
}