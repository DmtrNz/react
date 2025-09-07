import { createContext, useContext, useEffect, useReducer, useRef, memo } from "react";
import { createRoot } from "react-dom/client";

// Создаем контекст с начальным значением 0
const CountContext = createContext<number>(0);

// Редьюсер для управления состоянием счетчика
const countReducer = (state: number, action: { type: "increment" }) => {
    console.log("1"); //
    return action.type === "increment" ? state + 1 : state;
};

// Мемоизированный компонент, использующий контекст
const ContextConsumer = memo(() => {
    console.log("2"); //2

    const count = useContext(CountContext);

    useEffect(() => {
        console.log("3");  //4
    }, []);

    return <div>{count}</div>;
});

// Мемоизированный компонент, использующий ref
const RefComponent = memo(() => {
    console.log("4"); //3

    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (divRef.current) {
            console.log("5");  //5
        }
    }, []);

    return <div ref={divRef} />;
});

// Родительский компонент, содержащий состояние и эффекты
const ParentComponent = () => {
    console.log("6"); //1

    const [count, dispatch] = useReducer(countReducer, 0);

    useEffect(() => {
        console.log("7"); //6

        setTimeout(() => {
            dispatch({ type: "increment" });
        }, 3000);
    }, []);

    return (
        <CountContext.Provider value={count}>
            <ContextConsumer />
            <RefComponent />
        </CountContext.Provider>
    );
};

// Создаем корень и рендерим приложение
const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<ParentComponent />);
