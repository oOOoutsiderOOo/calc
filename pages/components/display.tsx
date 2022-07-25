export default function Display(props: any) {
    return (
        <div className="display-container">
            <h1 className="display-numbers">{props.display}</h1>
        </div>
    );
}
