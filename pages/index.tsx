import type { NextPage } from "next";
import Title from "./components/title";
import Display from "./components/display";
import Body from "./components/body";
import { useState, useEffect } from "react";
import { theme1, theme2, theme3 } from "../styles/themes";

const Home: NextPage = () => {
    const [state, setState] = useState(0); // 0: init, 1: first number, 2: operation selected, 3: second number  4: result
    const [firstOperand, setFirstOperand] = useState(0);
    const [secondOperand, setSecondOperand] = useState(0);
    const [operation, setOperation] = useState("");
    const [display, setDisplay] = useState("0");
    const [opResult, setOpResult] = useState(0);
    const [keyPress, setKeyPress] = useState("");

    const [theme, setTheme] = useState(theme1);

    useEffect(() => {
        if (state === 4) {
            setOpResult(result(operation));
            let dispNumber = result(operation).toString();
            dispNumber.length > 10 ? setDisplay("E: Too long") : setDisplay(dispNumber);
        }
    }, [state]);

    useEffect(() => {
        if (state === 0 || 1 || 2) {
            console.log(firstOperand);
            let dispNumber = firstOperand.toString().substring(0, 10);
            setDisplay(dispNumber);
        }
    }, [firstOperand]);

    useEffect(() => {
        if (state === 3) {
            let dispNumber = secondOperand.toString().substring(0, 10);
            setDisplay(dispNumber);
        }
    }, [secondOperand]);

    useEffect(() => {
        window.addEventListener("keydown", e => {
            setKeyPress(e.key);
        });
        window.addEventListener("keyup", () => {
            setKeyPress("");
        });
    });

    const result = (op: string): number => {
        switch (op) {
            case "+":
                return Number(firstOperand) + Number(secondOperand);
            case "-":
                return Number(firstOperand) - Number(secondOperand);
            case "/":
                return Number(firstOperand) / Number(secondOperand);
            case "*":
                return Number(firstOperand) * Number(secondOperand);
            default:
                return NaN;
        }
    };

    return (
        <div>
            <div className="calc-container">
                <style jsx global>{`
                    ${theme}
                `}</style>
                <Title setTheme={setTheme} theme={theme} />
                <Display display={display} setDisplay={setDisplay} theme={theme} />
                <Body
                    firstOperand={firstOperand}
                    setFirstOperand={setFirstOperand}
                    secondOperand={secondOperand}
                    setSecondOperand={setSecondOperand}
                    operation={operation}
                    setOperation={setOperation}
                    state={state}
                    setState={setState}
                    setDisplay={setDisplay}
                    opResult={opResult}
                    keyPress={keyPress}
                    setKeyPress={setKeyPress}
                />
            </div>
        </div>
    );
};

export default Home;
