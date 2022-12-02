import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllProducts } from "../thunk-actions/testActions";
import { mappedDbProductsType } from "../types/productTypes"

type InitialState = {
  loading: boolean;
  error: null | string;
  allData: mappedDbProductsType[];
  dataBackup: mappedDbProductsType[];
};

const initialState = {
  loading: false,
  error: null,
  allData: [],
  dataBackup: [],
} as InitialState;

type FilterTypedState = {
  category: [] | string[];
  [index: string]: string | string[];
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    filterSearch: (state, action: PayloadAction<string>) => {
      const filteredCards =
        state.allData &&
        state.allData.filter((card) => {
          return card.name
            .toLowerCase()
            .includes(action.payload.toLowerCase());
        });
      return {
        ...state,
        allData: filteredCards,
      };
    },
    filterElements: (state, action: PayloadAction<FilterTypedState>) => {
      const filters = action.payload;
      const cleanFilters = Object.fromEntries(Object.entries(filters).filter(([_, val]) => val.length > 0)) // Elimina objetos del filtrado que esten vacios
      const filteredCards =
        state.dataBackup &&
        state.dataBackup.filter((card) => {
          let isValid = true;
          for (let key in cleanFilters) {
            //                                                                        Tuve que meter tipo any en EL INDEX por el includes 
            isValid = isValid && (cleanFilters[key] as string[]).some((el) => card[key].includes(el));
          }
          return isValid;
        });
      return {
        ...state,
        allData: filteredCards,
      };
    },
    sortProducts: (state, action: PayloadAction<string>) => {
      const allProducts = state.allData && state.allData;

      allProducts?.sort((a, b) => {
        if (action.payload === "PriceASC") {
          return b.price - a.price;
        }
        if (action.payload === "PriceDESC") {
          return a.price - b.price;
        }
        if (action.payload === "Rating") {
          return b.ratingsAverage - a.ratingsAverage;
        } else {
          return a.id - b.id; // ! ???? no _id
        }
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<mappedDbProductsType[]>) => {
          state.loading = false;
          state.allData = action.payload;
          state.dataBackup = action.payload;
        }
      )
      .addCase(getAllProducts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  filterElements,
  sortProducts,
  filterSearch,
} = testSlice.actions;
export default testSlice.reducer;
