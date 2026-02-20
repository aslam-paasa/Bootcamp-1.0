const { cartReducer } = require('./index')

/**
 * Testing Reducers:
 * Q. Write this for this reducer:
 *    Add two products and test that the output is as expected times.
 * => Our reducer takes two arguments: initialState & action.
 *    a. initialState: It is the initial state of the reducer.
 *    b. action: It is the action that is performed on the reducer.
 * => We need to test that the output is as expected.
 * 
 * Q. In the previous reducer implement the functionality to remove an item.
 * Q. Change the quantity of individual items: just do INCREMENT
 * => const action = {
 *      type: "INCREMENT_QUANTITY",
 *      payload: {
 *        itemId: "1236"
 *      }
 *    };
 * => individualQuantity increases
 * => totalQuantity is untouched
 * => but the overallPrice increases
 * 
*/

describe("testing cart", () => {

  /**
   * Q. Add two products and test that the output is as expected times.
  */
  it("should add item to the cart", () => {
    /**
     * Step-1:Initial State:
    */
    const initialState = {
      items: [{ id: 1, product: "book", price: 200 }],
      totalPrice: 200,
      totalQuantity: 1
    };

    /**
     * Step-2: Send Payload:
    */
    const action = {
      type: "ADD_TO_CART",
      payload: {
        item: { id: 2, product: "shades", price: 399 }
      }
    };

    /**
     * Step-3: Call the reducer with initialState & action:
     * => It will return the updated state.
    */
    const updatedState = cartReducer(initialState, action);

    /**
     * Step-4: Assert the output:
     * => We need to assert that the output is as expected.
     *    [If our reducer is working properly, then the output should be
     *     as expected.]
    */
    expect(updatedState).toEqual({
      items: [
        { id: 1, product: "book", price: 200 },
        { id: 2, product: "shades", price: 399 }
      ],
      totalPrice: 599,
      totalQuantity: 2
    });
  });



  /**
   * Q. In the previous reducer implement the functionality to remove an 
   *    item using TDD.
   * - TDD:
   *    a. Write a test
   *    b. Let it fail
   *    c. Write the code to pass the test
   *    d. Refactor the code
  */
  it("should remove an item from the cart", () => {
    /**
     * Step-1:Initial State:
    */
    const initialState = {
      items: [
        { id: 1, product: "book", price: 200 },
        { id: 2, product: "shades", price: 399 }
      ],
      totalPrice: 599,
      totalQuantity: 2
    };

    /**
     * Step-2: Send Payload:
    */
    const action = {
      type: "REMOVE_FROM_CART",
      payload: {
        item: { id: 1, product: "book", price: 200 }
      }
    };

    /**
     * Step-3: Call the reducer with initialState & action:
    */
    const updatedState = cartReducer(initialState, action);

    /**
     * Step-4: Assert the output:
    */
    expect(updatedState).toEqual({
      items: [{ id: 2, product: "shades", price: 399 }],
      totalPrice: 399,
      totalQuantity: 1
    });
  })



  /**
   * Q. Change the quantity of individual items: just do INCREMENT
   * => const action = {
   *      type: "INCREMENT_QUANTITY",
   *      payload: {
   *        itemId: "1236"
   *      }
   *    };
  */
  it("should increment the quantity of an item", () => {
    /**
     * Step-1:Initial State:
    */
    const initialState = {
      items: [{ id: 1, product: "book", price: 200, quantity: 1 }],
      totalPrice: 200,
      totalQuantity: 1
    }; 

    /**
     * Step-2: Send Payload:
    */
    const action = {
      type: "INCREMENT_QUANTITY",
      payload: { itemId: 1 }
    };

    /**
     * Step-3: Call the reducer with initialState & action:
    */
    const updatedState = cartReducer(initialState, action); 

    /**
     * Step-4: Assert the output:
    */
    expect(updatedState).toEqual({
      items: [{ id: 1, product: "book", price: 200, quantity: 2 }],
      totalPrice: 400,
      totalQuantity: 1
    });
  })


});