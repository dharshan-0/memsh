import { useState } from "react";
import "./App.css";
import { GridItems } from "./components/GridItems";
import { Grid } from "./components/Grid";
import { Wrapper } from "./components/Wrapper";

function App() {
    const [board] = useState([
        [1, 2, 6],
        [4, 5, 5],
        [4, 1, 2],
    ]);

    return (
        <>
            <Wrapper>
                <Grid>
                    <GridItems board={board} />
                </Grid>
            </Wrapper>
        </>
    );
}

export default App;
