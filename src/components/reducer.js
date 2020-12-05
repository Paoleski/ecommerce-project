import { db } from '../firebase';

export const initialState = {
  basket: [],
  user: null,
  profile: [],
  menu: false,
  fullscreen:false,
  orders:[],
  images:{},
};

//selector
export const getBasketTotal = (basket) => {
  return basket?.reduce((amount, item) => item.price + amount, 0);
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      if (action.user) {
        db.collection('users')
          .doc(action.user.uid)
          .collection('basket')
          .doc(action.user.uid)
          .set({ basket: [...state.basket, action.item] });
      }

      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case 'REMOVE_FROM_BASKET':
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in the basket`
        );
      }
      if (action.user) {
        db.collection('users')
          .doc(action.user.uid)
          .collection('basket')
          .doc(action.user.uid)
          .set({ basket: newBasket });
      }

      return {
        ...state,
        basket: newBasket,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
        profile: action.profile,
        basket: action.basket,
      };

    case 'CREATE_USER':
      return {
        ...state,
        user:action.user,
        profile:action.profile,
        basket:[],
      }

    case 'SET_MENU':
      return {
        ...state,
        menu: action.menu,
      };

    case 'ADD_IMAGE':
      return {
        ...state,
        image:action.image,
      }

    case 'SET_ORDERS':
      return {
        ...state,
        orders:action.orders,
      }

    case 'SET_FULLSCREEN':
      return {
        ...state,
        fullscreen:action.fullscreen,
      }

    case 'EMPTY_BASKET':
      if (action.user) {
        db.collection('users')
          .doc(action.user.uid)
          .collection('basket')
          .doc(action.user.uid)
          .set({ basket: [] });
      }
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};

export default reducer;
