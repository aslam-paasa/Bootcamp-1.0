// type IncrementAction = { type: "INCREMENT" };
// type DecrementAction = { type: "DECREMENT" };
// type CounterAction = IncrementAction | DecrementAction;
export type CounterAction = { type: "INCREMENT" } | { type: "DECREMENT" };
export type CounterState = { count: number };

export const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + 1 };
        case "DECREMENT":
            return { count: state.count - 1 };
        default:
            return state;
    }
}