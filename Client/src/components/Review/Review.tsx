import React,{useEffect, useState} from 'react'
import { Box, Typography, Rating, Button, Avatar } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAppDispatch } from '../../assets/hooks/index';
import { getReview } from '../../redux/thunk-actions/reviewActions';
import { useParams } from 'react-router-dom';


/* { username, userImage, comment, rating } <<-- placeholder */
/* { userId(getUser), comment, rating} <<-- api */

type ReviewType = {
   username: string
   image: string
   comment: string
   rating: number
}

type ReviewProps = {
   id: string
}

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
   return (
      <Box sx={{ textAlign: "left", borderTop: "2px solid #DFDFDF", borderLeft: "2px solid #DFDFDF", borderRight: "2px solid #DFDFDF", padding: "2.625rem 2.5rem" }}>
         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
               <Avatar src={fetchReview.image} alt={fetchReview.username} sx={{ height: "56px", width: "56px" }}>S</Avatar>
               <Typography variant="h6" sx={{ marginLeft: "1rem" }}>
                  {fetchReview.username}
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
               29/11/2022
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