import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, InvoiceDraft } from "@/types/PosProTypes";
import { formatNumber } from "@/utils/formatNumber";
import { createSelector } from 'reselect';
import type { WritableDraft } from "immer";


type CartItem = Product & { quantity: number ; subtotal: number; };

type POSState = {
  cart: CartItem[];
  selectedRow: CartItem | null;
  invoiceDrafts: InvoiceDraft[];
  activeInvoice: InvoiceDraft | null;
};

  

const initialState: POSState = {
  cart: [],
  selectedRow: null,
  invoiceDrafts: [], 
  activeInvoice: null,
};





const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    addProductToCart(state, action: PayloadAction<{ product: Product; quantity: number }>) {
      const { product, quantity } = action.payload;
    
      if (!state.activeInvoice) return;
    
      const priceCategory = state.activeInvoice.priceCategory || 1; // Default price category
      const currencyRate = state.activeInvoice.selectedCurrency?.usdtocurr || 1; // Default to 1 if no currency rate
    
      // Calculate subtotal for a cart item
      const calculateSubtotal = (item: CartItem) => {
        const price = (item.prices[priceCategory] || 0) * currencyRate; // Adjust price by category and currency
        const vat = item.vat || 0;
        const discount = item.percentDisc || 0;
        return item.quantity * price * (1 + vat / 100) * (1 - discount / 100);
      };
    
      // Check if the product already exists in the cart
      const existingCartItem = state.activeInvoice.cart.find((item) => item.code === product.code);
      if (existingCartItem) {
        existingCartItem.quantity += quantity; // Update quantity
        existingCartItem.subtotal = calculateSubtotal(existingCartItem); // Recalculate subtotal
      } else {
        // Add new product with specified quantity
        const newCartItem: CartItem = {
          ...product,
          quantity,
          subtotal: calculateSubtotal({ ...product, quantity } as CartItem), // Initialize subtotal
        };
        state.activeInvoice.cart.push(newCartItem);
      }
    
      // Recalculate total items
      state.activeInvoice.totalItems = state.activeInvoice.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
    
      // Recalculate total price
      state.activeInvoice.totalPrice = state.activeInvoice.cart.reduce(
        (total, item) => total + item.subtotal,
        0
      );
    
      // Update the corresponding draft in invoiceDrafts
      const existingDraftIndex = state.invoiceDrafts.findIndex(
        (draft) => draft.draftKey === state.activeInvoice?.draftKey
      );
      if (existingDraftIndex !== -1) {
        state.invoiceDrafts[existingDraftIndex] = { ...state.activeInvoice };
      }
    }
    
,    
      
      
      
    updateCartQuantity(state, action: PayloadAction<{ code: string; quantity: number }>) {
      const item = state.cart.find(cartItem => cartItem.code === action.payload.code);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeProductFromCart(state, action: PayloadAction<string>) {
      const productCode = action.payload;
    
      // Update the cart in the root state
      state.cart = state.cart.filter(item => item.code !== productCode);
    
      // Check if activeInvoice is not null before updating it
      if (state.activeInvoice) {
        state.activeInvoice.cart = state.activeInvoice.cart.filter(item => item.code !== productCode);
    
        // Recalculate totals
        state.activeInvoice.totalItems = state.activeInvoice.cart.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.activeInvoice.totalPrice = state.activeInvoice.cart.reduce(
          (total, item) => total + item.quantity * (item.prices[state.activeInvoice?.priceCategory || 1] || 0),
          0
        );
      }
    }
,    
    setSelectedRow(state, action: PayloadAction<CartItem | null>) {
      state.selectedRow = action.payload;
    },



    updateSelectedRow(state, action: PayloadAction<{ field: string; value: number }>) {
      if (!state.selectedRow || !state.activeInvoice) {
        console.warn("No selected row or active invoice.");
        return;
      }
    
      const { field, value } = action.payload;
      const priceCategory = state.activeInvoice.priceCategory || 1;
      const usdtocurr = state.activeInvoice.selectedCurrency?.usdtocurr || 1;
    
      const cartItem = state.activeInvoice.cart.find(
        (item) => item.code === state.selectedRow?.code
      );
    
      if (cartItem) {
        if (field === "price") {
          cartItem.prices[priceCategory] = value / usdtocurr;
          state.selectedRow.prices[priceCategory] = value / usdtocurr;
        } else {
          (cartItem as any)[field] = value;
          (state.selectedRow as any)[field] = value;
        }
    
        // Recalculate subtotal for the row
        const price = (cartItem.prices[priceCategory] || 0) * usdtocurr;
        const vat = cartItem.vat || 0;
        const discount = cartItem.percentDisc || 0;
        cartItem.subtotal = cartItem.quantity * price * (1 + vat / 100) * (1 - discount / 100);
        state.selectedRow.subtotal = cartItem.subtotal; // Update selected row's subtotal
      }
    
      // Recalculate total price
      state.activeInvoice.totalPrice = state.activeInvoice.cart.reduce((total, item) => total + item.subtotal, 0);
    
      // Trigger a re-render by re-assigning the cart array
      state.activeInvoice.cart = [...state.activeInvoice.cart];
    }
,    
    
    
    
    
    createDraft(state, action: PayloadAction<InvoiceDraft>) {
      state.invoiceDrafts.push(action.payload);
      state.activeInvoice = action.payload;
      state.cart = []; // Clear cart for the new invoice
    },
    
    saveDraft(state, action: PayloadAction<InvoiceDraft>) {
    const existingDraftIndex = state.invoiceDrafts.findIndex(
      (draft) => draft.draftKey === action.payload.draftKey
    );

    if (existingDraftIndex !== -1) {
      // Update the existing draft
      state.invoiceDrafts[existingDraftIndex] = action.payload;
    } else {
      // Add a new draft
      state.invoiceDrafts.push(action.payload);
    }
    },

  // Delete a specific draft
  deleteDraft(state, action: PayloadAction<string>) {
    state.invoiceDrafts = state.invoiceDrafts.filter(
      (draft) => draft.draftKey !== action.payload
    );
  },

  updateInvoiceCurrency(state, action: PayloadAction<{ id: number; usdtocurr: number }>) {
    if (!state.activeInvoice) return;
  
    const activeInvoice = state.activeInvoice;
    activeInvoice.selectedCurrency = action.payload;
  
    const priceCategory = activeInvoice.priceCategory;
    const usdtocurr = action.payload.usdtocurr;
  
    // Update subtotals in the cart
    activeInvoice.cart.forEach((item) => {
      const price = (item.prices[priceCategory] || 0) * usdtocurr;
      const vat = item.vat || 0;
      const discount = item.percentDisc || 0;
  
      item.subtotal = item.quantity * price * (1 + vat / 100) * (1 - discount / 100);
    });
  
    // Recalculate the total price
    activeInvoice.totalPrice = activeInvoice.cart.reduce((total, item) => total + item.subtotal, 0);
  
    // Update the corresponding draft in invoiceDrafts
    const existingDraftIndex = state.invoiceDrafts.findIndex(
      (draft) => draft.draftKey === activeInvoice.draftKey
    );
    if (existingDraftIndex !== -1) {
      state.invoiceDrafts[existingDraftIndex].selectedCurrency = action.payload;
    }
  },
  

  updateInvoiceCustomer(state, action: PayloadAction<string>) {
    if (state.activeInvoice) {
      state.activeInvoice.customer = action.payload;
  
      // Update the corresponding draft in invoiceDrafts
      const existingDraftIndex = state.invoiceDrafts.findIndex(
        (draft) => draft.draftKey === state.activeInvoice?.draftKey
      );
      if (existingDraftIndex !== -1) {
        state.invoiceDrafts[existingDraftIndex].customer = action.payload;
      }
    }
  },
  
  updateInvoiceType(state, action: PayloadAction<string>) {
    if (state.activeInvoice) {
      state.activeInvoice.invoiceType = action.payload;
  
      // Update the corresponding draft in invoiceDrafts
      const existingDraftIndex = state.invoiceDrafts.findIndex(
        (draft) => draft.draftKey === state.activeInvoice?.draftKey
      );
      if (existingDraftIndex !== -1) {
        state.invoiceDrafts[existingDraftIndex].invoiceType = action.payload;
      }
    }
  },

  updateInvoiceInternalNote(state, action: PayloadAction<string>) {
    if (!state.activeInvoice) {
      console.warn("No active invoice found.");
      return;
    }

    // Update the active invoice's internal note
    state.activeInvoice.internalNote = action.payload;

    // Update the corresponding draft in invoiceDrafts
    const existingDraftIndex = state.invoiceDrafts.findIndex(
      (draft) => draft.draftKey === state.activeInvoice?.draftKey
    );
    if (existingDraftIndex !== -1) {
      state.invoiceDrafts[existingDraftIndex].internalNote = action.payload;
    }
  },

  updateInvoiceGeneralNote(state, action: PayloadAction<string>) {
    if (!state.activeInvoice) {
      console.warn("No active invoice found.");
      return;
    }

    // Update the active invoice's general note
    state.activeInvoice.generalNote = action.payload;

    // Update the corresponding draft in invoiceDrafts
    const existingDraftIndex = state.invoiceDrafts.findIndex(
      (draft) => draft.draftKey === state.activeInvoice?.draftKey
    );
    if (existingDraftIndex !== -1) {
      state.invoiceDrafts[existingDraftIndex].generalNote = action.payload;
    }
  },
  
  
  
  // Set the active invoice
  setActiveInvoice(state, action: PayloadAction<string>) {
    const draftKey = action.payload;
  
    // Save the current active invoice's state to its draft
    if (state.activeInvoice) {
      const existingDraftIndex = state.invoiceDrafts.findIndex(
        (draft) => draft.draftKey === state.activeInvoice?.draftKey
      );
      if (existingDraftIndex !== -1) {
        // Update the existing draft with the current active invoice's data
        state.invoiceDrafts[existingDraftIndex] = { ...state.activeInvoice };
      }
    }
  
    // Set the new active invoice
    const newActiveDraft = state.invoiceDrafts.find((draft) => draft.draftKey === draftKey);
    if (newActiveDraft) {
      state.activeInvoice = { ...newActiveDraft };
    }
  }
,  

updateInvoicePriceCategory(state, action: PayloadAction<number>) {
  if (!state.activeInvoice) return;

  const activeInvoice = state.activeInvoice;
  activeInvoice.priceCategory = action.payload;

  const priceCategory = action.payload;
  const usdtocurr = activeInvoice.selectedCurrency?.usdtocurr || 1;

  // Update subtotals in the cart
  activeInvoice.cart.forEach((item) => {
    const price = (item.prices[priceCategory] || 0) * usdtocurr;
    const vat = item.vat || 0;
    const discount = item.percentDisc || 0;

    item.subtotal = item.quantity * price * (1 + vat / 100) * (1 - discount / 100);
  });

  // Recalculate the total price
  activeInvoice.totalPrice = activeInvoice.cart.reduce((total, item) => total + item.subtotal, 0);

  // Update the corresponding draft in invoiceDrafts
  const existingDraftIndex = state.invoiceDrafts.findIndex(
    (draft) => draft.draftKey === activeInvoice.draftKey
  );
  if (existingDraftIndex !== -1) {
    state.invoiceDrafts[existingDraftIndex].priceCategory = action.payload;
  }
},

  updateInvoiceDiscount(state, action: PayloadAction<number>) {
    if (!state.activeInvoice) {
      console.warn("No active invoice found.");
      return;
    }
  
    state.activeInvoice.discount = action.payload;
  
    // Calculate the discounted total immediately
    const { usdtocurr } = state.activeInvoice.selectedCurrency || { usdtocurr: 1 };
    const priceCategory = state.activeInvoice.priceCategory;
  
    const rawTotal = state.activeInvoice.cart.reduce((total, item) => {
      const price = (item.prices[priceCategory] || 0) * usdtocurr;
      const vat = item.vat || 0;
      const discount = item.percentDisc || 0;
      const subtotal = item.quantity * price * (1 + vat / 100) * (1 - discount / 100);
      return total + subtotal;
    }, 0);
  
    state.activeInvoice.totalPrice = rawTotal * (1 - action.payload / 100); // Apply the discount
  },
  
  
  
  
  // Clear the active invoice
  clearActiveInvoice(state) {
    state.activeInvoice = null;
    state.cart = []; // Clear the cart when the invoice is cleared
  },
}});

export const {
    addProductToCart,
    updateCartQuantity,
    removeProductFromCart,
    setSelectedRow,
    updateSelectedRow,
    saveDraft,
    deleteDraft,
    setActiveInvoice,
    clearActiveInvoice,
    updateInvoiceCurrency,
    updateInvoiceDiscount,
    updateInvoiceCustomer,
    updateInvoiceType,
  updateInvoicePriceCategory,
  updateInvoiceInternalNote,
  updateInvoiceGeneralNote,
  } = posSlice.actions;
  

export default posSlice.reducer;


// Selector for total price
export const selectCartTotal = (state: { pos: POSState }) => 
    state.pos.cart.reduce((total, item) => total + (item.prices[1] || 0) * item.quantity, 0);
  

export const selectInvoiceDrafts = (state: { pos: POSState }) => state.pos.invoiceDrafts;

export const selectActiveInvoice = (state: { pos: POSState }) => state.pos.activeInvoice;

// Memoized selector for active invoice cart
export const selectActiveInvoiceCart = createSelector(
  [selectActiveInvoice],
  (activeInvoice) => activeInvoice?.cart || []
);

export const selectSelectedCurrency = createSelector(
  [selectActiveInvoice],
  (activeInvoice) => activeInvoice?.selectedCurrency || { id: 1, usdtocurr: 1 } 
);


// Memoized selector for active invoice total

export const selectActiveInvoiceTotal = createSelector(
  [selectActiveInvoice],
  (activeInvoice) => {
    if (!activeInvoice || !activeInvoice.totalPrice) return "0.00";

    // Format the already-discounted total price
    return formatNumber(activeInvoice.totalPrice);
  }
);






export const { createDraft } = posSlice.actions;