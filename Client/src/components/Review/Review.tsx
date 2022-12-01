<<<<<<< HEAD
import React,{useEffect, useState} from 'react'
import { Box, Typography, Rating, Button, Avatar } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppDispatch } from '../../assets/hooks/index';
import { getReview } from '../../redux/thunk-actions/reviewActions';
import { useParams } from 'react-router-dom';

=======
import React, { useEffect } from 'react'
import { Box, Typography, Rating, Button, Avatar } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ReviewType } from "../../redux/types/reviewTypes"
>>>>>>> 3239a8e745ca7d03481583dfc93fe9bcd616d639

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
   id: string
}

<<<<<<< HEAD
const Review = ({ id }: ReviewProps) => {
   const dispatch = useAppDispatch();
   const {productId} = useParams()
   const [fetchReview, setFechReview] = useState({
      username: "",
      image: "",
      comment: "",
      rating: 0
   })

   useEffect(()=>{
      const fetchReview = async()=>{
         try {
            const {payload} = await dispatch(getReview(id));
            setFechReview({
               username: payload.name,
               image:payload.image,
               comment:payload.comment,
               rating:payload.rating
            })
         } catch (error) {
            console.log(error)
         }
      }
      fetchReview()
   },[productId])
=======
const Review = ({ review }: ReviewProps) => {
   
>>>>>>> 3239a8e745ca7d03481583dfc93fe9bcd616d639
   return (
      <Box sx={{ textAlign: "left", borderTop: "2px solid #DFDFDF", borderLeft: "2px solid #DFDFDF", borderRight: "2px solid #DFDFDF", padding: "2.625rem 2.5rem" }}>
         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
<<<<<<< HEAD
               <Avatar src={fetchReview.image} alt={fetchReview.username} sx={{ height: "56px", width: "56px" }}>S</Avatar>
               <Typography variant="h6" sx={{ marginLeft: "1rem" }}>
                  {fetchReview.username}
=======
               <Avatar src={/*review.image*/`https://secure.gravatar.com/avatar/4853f7e001a2804ce7602d6f922d05c5?s=60&d=mm&r=g`} alt={review.name} sx={{ height: "56px", width: "56px" }}/>
               <Typography variant="h6" sx={{ marginLeft: "1rem" }}>
                  {`${review.name}`}
>>>>>>> 3239a8e745ca7d03481583dfc93fe9bcd616d639
               </Typography>
            </Box>
            <Box>
               <Button>
                  <MoreVertIcon />
               </Button>
            </Box>
         </Box>
         <Box sx={{ display: "flex", alignItems: "center", marginY: "1rem" }}>
            <Rating value={fetchReview.rating} size="large" readOnly precision={0.5} />
            <Typography variant="subtitle2" sx={{ marginLeft: "1rem" }}>
               {/*`Fecha de createdAt(nonexistent)`*/}
            </Typography>
         </Box>
         <Box>
            <Typography variant="subtitle1" sx={{ color: "#818689" }}>
               {`"${fetchReview.comment}"`}
            </Typography>
         </Box>
      </Box>
   )
}

export default Review