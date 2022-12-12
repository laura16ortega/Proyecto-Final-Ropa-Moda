import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Collapse,
  SelectChangeEvent,
} from "@mui/material";
import FilterPopup from "../FilterPopup/FilterPopup";
import s from "./Filters.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import { filterElements, sortProducts } from "../../redux/slices/testSlice";
import { useAppDispatch } from "../../assets/hooks";
import ConditionalRendering from "../FilterPopup/ConditionalRendering";

export type FilterTypedState = {
  // Previamente tenian un array vacio como posible tipo, causando errores en ConditionalRendering
  category: string[];
  gender: string[];
  tallaCamiseta: string[];
  tallaPantalón: string[];
  marca: string[];
  [index: string]: string | string[];
};

type arrConstTest = {
  key: string | string[];
  value: string[] | string;
};

const SortFilter = () => {
  const dispatch = useAppDispatch();
  const [sort, setSort] = useState<string>("default");
  const [filters, setFilters] = useState<FilterTypedState>({
    category: [],
    gender: [],
    tallaCamiseta: [],
    tallaPantalón: [],
    marca: [],
  });

  const filterTypes = [
    {
      nameToDisplay: "Genero",
      name: "gender",
      options: ["Mujer", "Hombre", "Unisex"],
    },
    {
      nameToDisplay: "Categoria",
      name: "category",
      options: ["Camiseta", "Pantalones"],
    },
    {
      nameToDisplay: "Marca",
      name: "marca",
      options: ["quechua", "x-warm", "forclaz", "adidas", "urb", "le coq"],
    },
  ];

  const conditionalSizes = [
    {
      nameToDisplay: "Talle camiseta",
      name: "tallaCamiseta",
      nameValue: "Camiseta",
      options: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    {
      nameToDisplay: "Talle pantalon",
      name: "tallaPantalón",
      nameValue: "Pantalones",
      options: ["28", "30", "32", "34"],
    },
  ];

  const sortTypes = [
    { name: "Precio descendente", value: "PriceDESC" },
    { name: "Precio ascendente", value: "PriceASC" },
    { name: "Mejor rating", value: "Rating" },
  ];

  const activeFilters = Object.values(filters).flat(); // Utilizado para el display de filtros activos, cambiarlo a filters

  const handleDeleteFilter = (category: string, value: string) => {
    setFilters({
      ...filters,
      [category]: (filters[category] as string[]).filter((f) => f !== value),
    });
  };

  const handleFiltersReset = (e: React.MouseEvent<HTMLSpanElement>) => {
    setFilters({
      category: [],
      gender: [],
      tallaCamiseta: [],
      tallaPantalón: [],
      marca: [],
    });
  };

  const handleSort = (e: SelectChangeEvent<string>) => {
    setSort(e.target.value);
    dispatch(sortProducts(e.target.value));
  };

  const arr: arrConstTest[] = []; // Array a mapear para mostrar filtros activos
  for (let key in filters) {
    (filters[key] as string[]).map((opt) => arr.push({ key: key, value: opt }));
  }

  useEffect(() => {
    dispatch(filterElements(filters));
    setSort("default");
    dispatch(sortProducts("default"));
  }, [filters]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingY: "0.5rem",
          marginY: "2rem",
          borderTop: "1px solid rgb(224, 222, 220)",
          borderBottom: "1px solid rgb(224, 222, 220)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ marginRight: "1.5rem" }}>
            Filtros:
          </Typography>
          <Box className={s.filtersContainer}>
            {filterTypes.map((e) => (
              <FilterPopup
                key={e.name}
                filterDetails={e}
                filters={filters}
                setFilters={setFilters}
              />
            ))}
            {conditionalSizes.map((e) => (
              <ConditionalRendering
                key={e.name}
                filterDetails={e}
                filters={filters}
                setFilters={setFilters}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx={{ marginRight: "1rem" }}>
            Orden:
          </Typography>
          <Box>
            <Select
              displayEmpty
              value={sort}
              onChange={(e) => handleSort(e)}
              className={s.selectSort}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "right",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "right",
                } /* Para que aparezca desde arriba a la derecha en vez del centro :s */,
              }}
            >
              <MenuItem value="default">Por defecto</MenuItem>
              {sortTypes.map((e) => (
                <MenuItem key={e.value} value={e.value}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>
      <Collapse in={activeFilters.length > 0}>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}
        >
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            {arr.map((e, i) => (
              <Box key={i + 1} className={s.selectedFiltersContainer}>
                <Typography variant="subtitle2" letterSpacing={0.6}>
                  {e.value}
                </Typography>
                <ClearIcon
                  sx={{ marginLeft: ".5rem", cursor: "pointer" }}
                  onClick={(event) =>
                    handleDeleteFilter(e.key as string, e.value as string)
                  }
                />
              </Box>
            ))}
          </Box>
          <Box sx={{ marginLeft: "1.5rem" }}>
            {!activeFilters.length ? (
              ""
            ) : (
              <Typography
                variant="subtitle1"
                onClick={(e) => handleFiltersReset(e)}
                sx={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Remover filtros
              </Typography>
            )}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default SortFilter;
