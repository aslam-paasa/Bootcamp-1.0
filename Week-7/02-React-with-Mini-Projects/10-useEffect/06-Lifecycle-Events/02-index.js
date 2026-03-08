/**
 * What is Component Life Cycle of React class component?
 * React life cycle consists of 3-phases:
 * a. Mounting
 * b. Updating
 * c. Unmounting
*/


/**
 * Mounting:
 * - In this phase, the component is generally mounted into the DOM.
 * - It is an initialization phase where we can do some operations like
 *   getting data from API, Subscribing to events, etc.
 * 
 * 1. Constructor:
 *    - It is a place to set the initial state and other initial values.
 * 
 * 2. getDerivedStateFromProps:
 *    - This is called right before rendering the elements into the DOM.
 *    - Its a natural place to set the state object based on the initial
 *      props.
 *    - It takes state as an argument and returns an object with changes
 *      to the state.
 * 
 *      getDerivedStateFromProps(props, state) {
 *         return { favColor: props.favColor }
 *      }
 * 
 * 3. render:
 *    - It contains all the html elements and is method that actually
 *      outputs the html into the DOM.
 * 
 * 4. ComponentDidMount:
 *    - This is called once component is mounted into the DOM.
 *    - Ex: Fetch API Calls, Subscribing to Events, etc.
*/

/**
 * Updating Phase:
 * This is when the component is updated. The component will be updated
 * wheneven there is change in state or props.
 * 
 * 1. getDerivedStateFromProps: Same as above
 * 
 * 2. ShouldComponentUpdate:
 *    - This will return boolean value that specifies whether react
 *      should continue with the rendering or not. Default is true.
 * 
 *      shouldComponentUpdate() {
 *         return true/false;
 *      }
 * 
 * 3. Render: Same as above
 * 
 * 4. getSnapshotBeforeUpdate:
 *    - It will have access to the props and state before update.
 *    - Means that even after the update you can check what are the
 *      values were before update.
 * 
 *      getSnapshoptBeforeUpdate(prevProps, prevState) {
 *         console.log(prevProps, prevState); 
 *      }
 * 
 * 5. ComponentDidUpdate: 
 *    - Called after the component is updated in the DOM.
*/

/**
 * Unmounting Phase:
 * In this phase the component will be removed from the DOM. Here, we
 * can do ubsubscribe to some events or destroying the existing dialogs
 * etc.
 * 
 * 1. ComponentWillUnmount:
 *    - This is called when component is about to be removed from the
 *      DOM.
*/