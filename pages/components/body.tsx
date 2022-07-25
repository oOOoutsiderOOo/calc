import { useEffect, MouseEvent } from "react";

type NumberImput = string & {
    currentTarget?: {
        value: string;
    };
};

export default function Body(props: any) {
    useEffect(() => {
        if (props.keyPress !== "") {
            if (props.keyPress.search(/1|2|3|4|5|6|7|8|9|0|\./) !== -1) {
                console.log(`tecla ${props.keyPress}`);
                numberHandler(props.keyPress);
            } else if (props.keyPress.search(/\+|-|\*|\//) !== -1) {
                console.log(`tecla ${props.keyPress}`);
                opHandler(props.keyPress);
            } else if (props.keyPress.search(/Enter/) !== -1) {
                console.log(`tecla ${props.keyPress}`);
                returnHandler();
            }
        }
    }, [props.keyPress]);

    const numberHandler = (e: NumberImput | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>): void => {
        let num: string = "0";
        e.currentTarget ? (num = e.currentTarget.value) : (num = e);

        switch (props.state) {
            case 0:
                if (num !== "0") {
                    props.setFirstOperand(num);
                    props.setState(1);
                    break;
                }
                break;
            case 1:
                props.setFirstOperand(props.firstOperand.concat(num));
                break;
            case 2:
                if (num !== "0") {
                    props.setSecondOperand(num);
                    props.setState(3);
                    break;
                }
                break;
            case 3:
                props.setSecondOperand(props.secondOperand.concat(num));
            default:
                break;
        }
    };

    const opHandler = (e: NumberImput | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        let op: string = "";
        e.currentTarget ? (op = e.currentTarget.value) : (op = e);
        if (props.state === 1) {
            props.setOperation(op);
            props.setState(2);
        } else if (props.state === 4) {
            props.setFirstOperand(props.opResult);
            props.setOperation(op);
            props.setState(2);
        }
    };

    const returnHandler = () => {
        props.state === 3 && props.setState(4);
    };

    const resetHandler = () => {
        props.setState(0);
        props.setFirstOperand("0");
        props.setSecondOperand("0");
    };

    const delHandler = () => {
        if (props.state === 0 || props.state === 1) {
            props.setFirstOperand("0");
            props.setState(0);
        } else {
            props.setSecondOperand("0");
            props.setState(2);
            props.setDisplay(0);
        }
    };

    return (
        <div className="buttons-container">
            <button className="normal" value="7" onClick={e => numberHandler(e)}>
                <div className="button-text">7</div>
            </button>
            <button className="normal" value="8" onClick={e => numberHandler(e)}>
                <div className="button-text">8</div>
            </button>
            <button className="normal" value="9" onClick={e => numberHandler(e)}>
                <div className="button-text">9</div>
            </button>
            <button className="accent-1" value="DEL" onClick={() => delHandler()}>
                <div className="button-text">DEL</div>
            </button>
            <button className="normal" value="4" onClick={e => numberHandler(e)}>
                <div className="button-text">4</div>
            </button>
            <button className="normal" value="5" onClick={e => numberHandler(e)}>
                <div className="button-text">5</div>
            </button>
            <button className="normal" value="6" onClick={e => numberHandler(e)}>
                <div className="button-text">6</div>
            </button>
            <button className="normal" value="+" onClick={e => opHandler(e)}>
                <div className="button-text">+</div>
            </button>
            <button className="normal" value="1" onClick={e => numberHandler(e)}>
                <div className="button-text">1</div>
            </button>
            <button className="normal" value="2" onClick={e => numberHandler(e)}>
                <div className="button-text">2</div>
            </button>
            <button className="normal" value="3" onClick={e => numberHandler(e)}>
                <div className="button-text">3</div>
            </button>
            <button className="normal" value="-" onClick={e => opHandler(e)}>
                <div className="button-text">-</div>
            </button>
            <button className="normal" value="." onClick={e => numberHandler(e)}>
                <div className="button-text">.</div>
            </button>
            <button className="normal" value="0" onClick={e => numberHandler(e)}>
                <div className="button-text">0</div>
            </button>
            <button className="normal" value="/" onClick={e => opHandler(e)}>
                <div className="button-text">/</div>
            </button>
            <button className="normal" value="*" onClick={e => opHandler(e)}>
                <div className="button-text">X</div>
            </button>
            <button className="accent-1 reset-btn" value="RESET" onClick={() => resetHandler()}>
                <div className="button-text">RESET</div>
            </button>
            <button className="accent-2 equals-btn" value="=" onClick={() => returnHandler()}>
                <div className="button-text">=</div>
            </button>
        </div>
    );
}
