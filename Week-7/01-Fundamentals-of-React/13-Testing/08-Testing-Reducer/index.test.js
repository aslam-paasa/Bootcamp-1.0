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
 * 
*/

describe("testing cart", () => {
    it("should add item to the cart", () => {
      /**
       * Step-1:Initial State:
      */
      const initialState = {
        items: [{ product: "book", price: 200 }],
        totalPrice: 200,
        totalQuantity: 1
      };
  
      /**
       * Step-2: Send Payload:
      */
      const action = {
        type: "ADD_TO_CART",
        payload: {
          item: { product: "shades", price: 399 }
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
          { product: "book", price: 200 },
          { product: "shades", price: 399 }
        ],
        totalPrice: 599,
        totalQuantity: 2
      });
    });
  });