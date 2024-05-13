import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

export const cart_reducer = (state: any, action: any) => {
  switch (action.type) {
    case ADD_TO_CART: {
      console.log("reducer");

      const tempCart = { ...state.cart };
      const id = action.payload.id;
      if (id in tempCart) {
        tempCart[id].count = tempCart[id].count + 1;
        if (tempCart[id].count > tempCart[id].stock) {
          tempCart[id].count = tempCart[id].stock;
        }
      } else {
        tempCart[id] = { ...action.payload, count: 1 };
      }

      return { ...state, cart: tempCart };
    }
    case REMOVE_CART_ITEM: {
      const tempCart = { ...state.cart };
      delete tempCart[action.payload];
      return { ...state, cart: tempCart };
    }
    case CLEAR_CART: {
      return { ...state, cart: {} };
    }
    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload;
      const tempCart = { ...state.cart };

      if (value === "inc") {
        tempCart[id].count = tempCart[id].count + 1;
        if (tempCart[id].count > tempCart[id].stock) {
          tempCart[id].count = tempCart[id].stock;
        }
      }
      if (value === "dec") {
        tempCart[id].count = tempCart[id].count - 1;
        if (tempCart[id].count === 0) {
          delete tempCart[id];
        }
      }

      console.log("tempCart", tempCart);

      return { ...state, cart: tempCart };
    }
    case COUNT_CART_TOTALS: {
      let total_count = 0;
      let total_price = 0;
      for (const key in state.cart) {
        total_count += state.cart[key].count;
        total_price += state.cart[key].count * state.cart[key].price;
      }
      return { ...state, total_count, total_price };
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};
