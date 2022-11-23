import React, { useState } from 'react'
import { Box, Typography } from "@mui/material"
import FilterPopup from '../FilterPopup/FilterPopup';
import s from "./Filters.module.css"
import ClearIcon from '@mui/icons-material/Clear';

export type FilterTypedState = {
   talle: [] | string[]
   categoria: [] | string[]
   genero: [] | string[]
   marca: [] | string[]
   [index: string]: string | string[]
}

const Filters = () => {

   const [filter, setFilter] = useState<FilterTypedState>({
      talle: [],
      categoria: [],
      genero: [],
      marca: []
   })

   console.log("filters state: ", Object.keys(filter))
   const filterTypes = [
      { name: "talle", options: ["XS", "S", "M", "L", "XL"] },
      { name: "categoria", options: ["Pantalon", "Campera", "Buzo", "Remera", "Calzado"] },
      { name: "genero", options: ["Hombre", "Mujer"] },
      { name: "marca", options: ["Adidas", "Nike", "Puma"] },
   ]

   const sortTypes = [
      { name: "For you", value: "default" },
      { name: "Price - low to high", value: "PriceDESC" },
      { name: "Price - high to low", value: "PriceASC" },
      { name: "Rating", value: "Rating" },
   ]

   return (
      <Box>
         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingY: "0.5rem", marginY: "2rem", borderTop: "1px solid rgb(224, 222, 220)", borderBottom: "1px solid rgb(224, 222, 220)" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
               <Typography variant='h6' sx={{ marginRight: "1.5rem" }}>
                  Filtros:
               </Typography>
               <Box className={s.filtersContainer}>
                  {filterTypes.map(e => (
                     <FilterPopup key={e.name} filterDetails={e} filter={filter} setFilter={setFilter} />
                  ))}
               </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
               <Typography variant='h6' sx={{ marginRight: "1rem" }}>
                  Orden:
               </Typography>
               <Box>
                  {/* El sort de por ahi a la izquierda */}
               </Box>
            </Box>
         </Box>
         {/*<Box> cart.length items </Box>*/}
         <Box sx={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
               {/* Mappear los filtros agregados + nth child 2 (0.5marginleft) */}
               <Box sx={{paddingY: "0.5rem", paddingX: "1rem", backgroundColor: "rgb(245, 245, 245)", borderRadius: "9999px", display: "flex", alignItems: "center"}}>
                     <Typography variant='subtitle2' letterSpacing={.6}>
                        Filtro1
                     </Typography>
                     <ClearIcon sx={{marginLeft: ".75rem"}}/>
               </Box>
               <Box sx={{paddingY: "0.5rem", paddingX: "1rem", backgroundColor: "rgb(245, 245, 245)", borderRadius: "9999px", display: "flex", alignItems: "center"}}>
                     <Typography variant='subtitle2'>
                        Filtro 2 asdhasbdhasbda
                     </Typography>
                     <ClearIcon sx={{marginLeft: ".75rem"}}/>
               </Box>
            </Box>
            <Box sx={{ marginLeft: "1.5rem" }}>
               <Typography variant="subtitle1">
               Remover filtros {/* Filtros agregados.length? rmvr filtros : "" */}
               </Typography>
            </Box>
         </Box>
      </Box>
   )
}

export default Filters