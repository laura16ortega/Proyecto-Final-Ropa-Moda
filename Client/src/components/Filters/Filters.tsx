import React, { useEffect, useState } from 'react'
import { Box, Typography, Select, MenuItem, Collapse, SelectChangeEvent } from "@mui/material"
import FilterPopup from '../FilterPopup/FilterPopup';
import s from "./Filters.module.css"
import ClearIcon from '@mui/icons-material/Clear';
import { filterElements, sortProducts } from '../../redux/slices/testSlice';
import { useAppDispatch } from '../../assets/hooks';

export type FilterTypedState = {

   category: [] | string[]
   [index: string]: string | string[]
}

type arrConstTest = {
   key: string | string[]
   value: string[] | string
}


const SortFilter = () => {

   const dispatch = useAppDispatch()
   const [sort, setSort] = useState<string>("default")
   const [filters, setFilters] = useState<FilterTypedState>({
      category: [],
   })

   const filterTypes = [
      { name: "category", options: ["jewelery", "electronics"] },
   ]

   const sortTypes = [
      { name: "Price - low to high", value: "PriceDESC" },
      { name: "Price - high to low", value: "PriceASC" },
      { name: "Rating", value: "Rating" },
   ]

   const activeFilters = Object.values(filters).flat() // Utilizado para el display de filtros activos, cambiarlo a filters

   const handleDeleteFilter = (category: string, value: string) => {
      setFilters({
         ...filters,
         [category]: (filters[category] as string[]).filter(f => f !== value)
      })
   }

   const handleFiltersReset = (e: React.MouseEvent<HTMLSpanElement>) => {
      setFilters({
         category: [],
         // Demas proximos filtros
      })
   }

   const handleSort = (e: SelectChangeEvent<string>) => {
      setSort(e.target.value)
      dispatch(sortProducts(e.target.value))
   }

   const arr: arrConstTest[] = [] // Array a mapear para mostrar filtros activos
   for (let key in filters) {

      (filters[key] as string[]).map(opt =>
         arr.push({ key: key, value: opt })
      )
   }

   useEffect(() => {
      dispatch(filterElements(filters))
      setSort("default")
      dispatch(sortProducts("default"))
   }, [filters])

   return (
      <Box>
         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingY: "0.5rem", marginY: "2rem", borderTop: "1px solid rgb(224, 222, 220)", borderBottom: "1px solid rgb(224, 222, 220)" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
               <Typography variant='h6' sx={{ marginRight: "1.5rem" }}>
                  Filtros:
               </Typography>
               <Box className={s.filtersContainer}>
                  {filterTypes.map(e => (
                     <FilterPopup key={e.name} filterDetails={e} filters={filters} setFilters={setFilters} />
                  ))}
               </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
               <Typography variant='h6' sx={{ marginRight: "1rem" }}>
                  Orden:
               </Typography>
               <Box>
                  <Select displayEmpty value={sort} onChange={e => handleSort(e)} className={s.selectSort} MenuProps={{
                     anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "right"
                     },
                     transformOrigin: {
                        vertical: "top",
                        horizontal: "right"
                     }, /* Para que aparezca desde arriba a la derecha en vez del centro :s */
                  }}>
                     <MenuItem value="default">For you</MenuItem>
                     {sortTypes.map(e =>
                        <MenuItem key={e.value} value={e.value}>{e.name}</MenuItem>
                     )}
                  </Select>
               </Box>
            </Box>
         </Box>
         <Collapse in={activeFilters.length > 0}>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
               <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                  {arr.map((e, i) =>
                     <Box key={i + 1} className={s.selectedFiltersContainer}>
                        <Typography variant='subtitle2' letterSpacing={.6}>
                           {e.value}
                        </Typography>
                        <ClearIcon sx={{ marginLeft: ".5rem", cursor: "pointer" }} onClick={event => handleDeleteFilter((e.key as string), (e.value as string))} />
                     </Box>
                  )}
               </Box>
               <Box sx={{ marginLeft: "1.5rem" }}>
                  {!activeFilters.length ? "" :
                     <Typography variant="subtitle1" onClick={e => handleFiltersReset(e)} sx={{ cursor: "pointer", textDecoration: "underline" }}>
                        Remover filtros
                     </Typography>
                  }
               </Box>
            </Box>
         </Collapse>
      </Box>
   )
}

export default SortFilter