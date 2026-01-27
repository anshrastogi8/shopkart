import { createContext, useReducer, useContext, useMemo } from "react";

const CartContext = createContext();

const initialState = { cart: [] ,totalPrice: 0 };
const buildKey = ({ product, selectedSize, selectedColor }) =>
  `${product?.id}__${selectedSize}__${selectedColor}`;

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const {
        product,
        selectedSize,
        selectedColor,
        quantity = 1,
      } = action.payload;
      const key = buildKey({ product, selectedSize, selectedColor });

      const existing = state.cart.find((i) => i.key === key);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + quantity } : i
          ),
        };
      }
      const item = { key, product, selectedSize, selectedColor, quantity };
      return { ...state, cart: [...state.cart, item] };
    }

    case "UPDATE_CART_QUANTITY": {
      const { key, quantity } = action.payload;
      const q = Math.max(1, Math.min(99, Number(quantity) || 1));
      return {
        ...state,
        cart: state.cart.map((i) =>
          i.key === key ? { ...i, quantity: q } : i
        ),
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((i) => i.key !== action.payload),
      };

    case "SET_CART":
      return {
        ...state,
        cart:  action.payload,
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

    const totalPrice = useMemo(()=>{
    return state.cart?.reduce((sum,item)=> sum + item.unitPrice * item.quantity,0)
    },[state.cart])

  const cartCount = useMemo(()=>{
    return state.cart?.length;
    },[state.cart])

  return (
    <CartContext.Provider value={{ cart: state.cart,totalPrice,cartCount, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
