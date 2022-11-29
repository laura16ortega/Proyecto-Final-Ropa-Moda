import React from 'react'
import { Box, Button } from "@mui/material"
import { useAppDispatch } from '../../assets/hooks';
import { addProductToCart } from "../../redux/thunk-actions/cartActions";
import {
   increaseCartQuantity,
   decreaseCartQuantity,
} from "../../redux/slices/cartSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import s from "./IncreaseCartButton.module.css"

type IncreaseButtonProps = {
   id: string
   quantity: number
}

const IncreaseCartButton = ({ id, quantity }: IncreaseButtonProps) => {
   const dispatch = useAppDispatch()

   const handleIncreaseCart = (productId: string) => {
      // ! if quantity > stock === error
      dispatch(increaseCartQuantity(productId));
   };

   const handleDecreaseCart = (productId: string) => {
      dispatch(decreaseCartQuantity(productId));
   };

   return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center",}}>
         <Button disableElevation className={s.counterButton} onClick={() => handleDecreaseCart(id)}>
            <RemoveIcon sx={{ color: "rgb(17, 17, 17)", height: "100%", width: "100%", padding: "2px",}}/>
         </Button>
         <h2 style={{ marginRight: "1rem", marginLeft: "1rem" }}>
            {quantity}
         </h2>
         <Button disableElevation className={s.counterButton} onClick={() => handleIncreaseCart(id)}>
            <AddIcon sx={{ color: "rgb(17, 17, 17)", height: "100%", width: "100%", padding: "2px",}}/>
         </Button>
      </Box>
   )
}

export default IncreaseCartButton