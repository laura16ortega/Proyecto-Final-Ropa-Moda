import React, { useEffect } from 'react'
import { Box, Typography, Rating, Button, Avatar } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ReviewType } from "../../redux/types/reviewTypes"

/* { username, userImage, comment, rating } <<-- placeholder */
/* { userId(getUser), comment, rating} <<-- api */

type ReviewDbType = {
   comment: string
   createdAt: string
   rating: number
   updatedAt: string
   userId: string
   _id: string
}

type ReviewProps = {
   review: ReviewType
}

const Review = ({ review }: ReviewProps) => {
   
   return (
      <Box sx={{ textAlign: "left", borderTop: "2px solid #DFDFDF", borderLeft: "2px solid #DFDFDF", borderRight: "2px solid #DFDFDF", padding: "2.625rem 2.5rem" }}>
         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
               <Avatar src={/*review.image*/`https://secure.gravatar.com/avatar/4853f7e001a2804ce7602d6f922d05c5?s=60&d=mm&r=g`} alt={review.name} sx={{ height: "56px", width: "56px" }}/>
               <Typography variant="h6" sx={{ marginLeft: "1rem" }}>
                  {`${review.name}`}
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
               {/*`Fecha de createdAt(nonexistent)`*/}
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