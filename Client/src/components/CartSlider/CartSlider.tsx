import React from 'react'
import { Box } from "@mui/material"
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Scrollbar } from "swiper";
import Card from "../Card/Card"
import { mappedDbProductsType } from "../../redux/types/productTypes"

type CartSliderProps = {
    allData: mappedDbProductsType[]
}

const CartSlider = ({ allData }: CartSliderProps) => {

    const slideData = allData.slice(-6)

    return (
        <Box sx={{ marginBottom: "2rem", marginX: "2rem"}}>
            <Swiper
                spaceBetween={2}
                slidesPerView={3}
                freeMode
                rewind
                scrollbar
                modules={[FreeMode, Scrollbar]}
                breakpoints={{
                    1200: {
                        width: 1200,
                        slidesPerView: 3
                    },
                    900: {
                        width: 900,
                        slidesPerView: 2
                    },
                    600: {
                        width: 600,
                        slidesPerView: 1
                    }
                }}>
                {slideData.map((e, i) => 
                <SwiperSlide key={i + 1}>
                    <Card product={e} margin="0 7px"/>
                </SwiperSlide>
                )}
            </Swiper>
        </Box>
    )
}

export default CartSlider