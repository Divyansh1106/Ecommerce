import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCounterStore = create(
  persist(
    (set, get) => ({
      
      products: {},

      count: 0,

      // ➕ Add product
      addProduct: (pro) =>
        set((state) => {
          const newQty = (state.products[pro.id] || 0) + 1;

          return {
            products: {
              ...state.products,
              [pro.id]: newQty,
            },
            count: state.count + 1,
          };
        }),

      // ➖ Remove product (one quantity)
      removeProduct: (pro) =>
        set((state) => {
          if (!state.products[pro.id]) return state;

          const newProducts = { ...state.products };

          if (newProducts[pro.id] === 1) {
            delete newProducts[pro.id];
          } else {
            newProducts[pro.id] -= 1;
          }


          return {
            products: newProducts,
            count: state.count - 1,
          };
        }),
         removeItem: (pro) =>
        set((state) => {
          const qty = state.products[pro.id];
          if (!qty) return state;

          const newProducts = { ...state.products };
          delete newProducts[pro.id];

          return {
            products: newProducts,
            count: state.count - qty,
          };
        }),

      // 🧹 Clear cart
      clearCart: () =>
        set({
          products: {},
          count: 0,
        }),
    }),
    {
      name: "cart-store", // key in localStorage
    }
  )
);

export default useCounterStore;
