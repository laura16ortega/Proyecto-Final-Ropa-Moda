import React from 'react'
import { Box, Typography, Rating, Button, Avatar } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';

/* { username, userImage, comment, rating } <<-- placeholder */
/* { userId(getUser), comment, rating} <<-- api */

type ReviewType = {
   username: string
   image: string
   comment: string
   rating: number
}

type ReviewProps = {
   review: ReviewType
}

const Review = ({ review }: ReviewProps) => {
   return (
      <Box sx={{ textAlign: "left", borderTop: "2px solid #DFDFDF", borderLeft: "2px solid #DFDFDF", borderRight: "2px solid #DFDFDF", padding: "2.625rem 2.5rem" }}>
         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
               <Avatar src={review.image} alt={review.username} sx={{ height: "56px", width: "56px" }}>S</Avatar>
               <Typography variant="h6" sx={{ marginLeft: "1rem" }}>
                  {review.username}
               </Typography>
            </Box>
            <Box>
               <Button>
                  <MoreVertIcon />
               </Button>
            </Box>
         </Box>
         <Box sx={{ display: "flex", alignItems: "center", marginY: "1rem" }}>
            <Rating value={review.rating} size="large" readOnly precision={0.5} />
            <Typography variant="subtitle2" sx={{ marginLeft: "1rem" }}>
               29/11/2022
            </Typography>
         </Box>
         <Box>
            <Typography variant="subtitle1" sx={{ color: "#818689" }}>
               {`"${review.comment}"`}
            </Typography>
         </Box>
      </Box>
   )
}

export default Review