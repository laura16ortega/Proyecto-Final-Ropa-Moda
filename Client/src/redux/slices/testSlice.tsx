import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAllProducts } from "../thunk-actions/testActions";
import { mappedDbProductsType } from "../types/productTypes"

type InitialState = {
  loading: boolean;
  error: null | string;
  allData: null | mappedDbProductsType[];
  dataBackup: null | mappedDbProductsType[];
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
      const filteredCards =
        state.dataBackup &&
        state.dataBackup.filter((card) => {
          let isValid = true;
          for (let key in filters) {
            console.log("filters[key]: ", filters[key])
            if (filters[key].length <= 0) return true;
            isValid =
              isValid && // Tuve que meter tipo any en EL INDEX por el includes
              (filters[key] as string[]).some((el) => card[key].includes(el)); // ! Cuando no tiene nada se limpia y no tira resultados - Arreglado 3 lineas arriba, dejo por las dudas
            //card[key].toLowerCase().includes((filters[key] as string[])[0] || (filters[key] as string[])[1]) <-- funcion previa, filtra solo por el primer string del array
          }
          return isValid;
        });
      //state.allData = filteredCards
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
          return b.ratingsAverage - a.ratingsAverage; // ! (a, b).ratingsAverage
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
