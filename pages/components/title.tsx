import axios from "axios";
import { useState, useEffect, MouseEvent } from "react";
import { theme1, theme2, theme3 } from "../../styles/themes";

export default function Title(props) {
    const [themeId, setThemeId] = useState("1");

    useEffect(() => {
        if (localStorage.getItem("theme")) {
            setThemeId(localStorage.getItem("theme"));
        }
    }, []);

    useEffect(() => {
        switch (themeId) {
            case "1":
                props.setTheme(theme1);
                break;
            case "2":
                props.setTheme(theme2);
                break;
            case "3":
                props.setTheme(theme3);
                break;
            default:
                break;
        }
    }, [themeId]);

    function clickHandler(e: any) {
        setThemeId(e.target.value);
        console.log(e.target.value);

        localStorage.setItem("theme", e.target.value);
    }

    return (
        <div className="first-row-container">
            <h2>calc</h2>
            <div className="theme-widget">
                <h3>THEME</h3>
                <div className="selector-grid">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div className="selector-background">
                        <button className={themeId === "1" ? "toggle" : "toggle toggle-hidden"} value="1" onClick={clickHandler}></button>
                        <button className={themeId === "2" ? "toggle" : "toggle toggle-hidden"} value="2" onClick={clickHandler}></button>
                        <button className={themeId === "3" ? "toggle" : "toggle toggle-hidden"} value="3" onClick={clickHandler}></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
