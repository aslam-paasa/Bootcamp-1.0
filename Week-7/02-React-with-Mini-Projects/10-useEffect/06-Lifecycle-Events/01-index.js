/**
 * Lifecycle Events:
 * In React, lifecycle events(or lifecycle methods) refer to the specific
 * points in a component's life where you can execute code in response to
 * changes or actions. These events help you manage tasks such as data
 * fetching, subscriptions, and cleaning up resources.
*/


/**
 * Class-Based Lifecycle Methods:
 * In class components, lifecycle methods are divided into three phases:
 * 
 * 1. Mounting: When the component is being inserted into the DOM.
 *    a. constructor() : Called when the component is initialized.
 *    b. componentDidMount() : Called immediately after the component is
 *       mounted. Ideal for data fetching.
 * 2. Updating: When the component is being re-rendered due to changes in
 *    props or state.
 *    a. componentDidUpdate(prevProps, prevState) : Called after the component
 *       has updated. Good for operations based on prop/state changes.
 * 3. Unmounting : When the component is being removed from the DOM.
 *    a. componentWillUnmount() : Ideal for cleanup tasks, like invalidating
 *       timers or canceling network requests.
*/


/**
 * Class-Based Lifecycle Methods Example:
*/
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    componentDidMount() {
        console.log('Component mounted');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Component updated');
    }

    componentWillUnmount() {
        console.log('Component will unmount');
    }

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>Increment</button>
            </div>
        )
    }
}


/**
 * Functional Lifecycle Methods Example:
*/
function MyComponent() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('Component mounted or updated');
    }, [count]); // Runs on mount and when count changes

    useEffect(() => {
        console.log('Component mounted');
        return () => {
            console.log('Component will unmount');
        }
    }, []);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    ) 
}






/**
 * [Interview Question]
 * Which lifecycle hooks in class component are replaced wit useEffect
 * in functional components?
 * 1. componentDidMount(): Equivalent to useEffect with empty array.
 * 
 *    useEffect(() => {
 *       console.log("Called on initial mount only once");
 *    }, [])
 * 
 * 2. componentDidUpdate(): Equivalent to useEffect with array of
 *    dependencies
 * 
 *    useEffect(() => {
 *       console.log("Called on every dependency update")
 *    }, [props.isFeature, props.content])
 * 
 *    This will be called whatever dependency value changes.
 *    [Here, isFeature or content].
 * 
 * 3. componentDidUnmount(): Equivalent to useEffect with return
 *    statement.
 * 
 *    useEffect(() => {
 *       return () => {
 *          console.log(`Any cleanup activities or unsubscribing etc here);
 *       }
 *    })
*/