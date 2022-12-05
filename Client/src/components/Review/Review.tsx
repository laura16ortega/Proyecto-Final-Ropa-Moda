import React,{useEffect, useState} from 'react'
import { Box, Typography, Rating, Button, Avatar } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ReviewType } from "../../redux/types/reviewTypes"
import { useAppDispatch, useAppSelector } from '../../assets/hooks';
import { useParams } from 'react-router-dom';
import { getReview } from '../../redux/thunk-actions/reviewActions';

/* { username, userImage, comment, rating } <<-- placeholder */
/* { userId(getUser), comment, rating} <<-- api */

type ReviewProps = {
   id: string
}

const Review = ({ id }: ReviewProps) => {

   const dispatch = useAppDispatch();
   const {productId} = useParams()
   const [fetchReview, setFechReview] = useState<ReviewType>({
      name: "",
      picture: "",
      comment: "",
      rating: 0,
      date: ""
   })

   useEffect(()=>{
      const fetchReview = async()=>{
         try {
            const { payload } : any = await dispatch(getReview(id));
            setFechReview({
               name: payload.name,
               picture: payload.picture,
               comment: payload.comment,
               rating: payload.rating,
               date: payload.date
            })
         } catch (error) {
            console.log("Fetch review error: ",error)
         }
      }
      fetchReview()
   },[productId])
   return (
      <Box sx={{ textAlign: "left", borderTop: "2px solid #DFDFDF", borderLeft: "2px solid #DFDFDF", borderRight: "2px solid #DFDFDF", padding: "2.625rem 2.5rem" }}>
         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
               <Avatar src={fetchReview.picture} alt={fetchReview.name} sx={{ height: "56px", width: "56px" }}>S</Avatar>
               <Typography variant="h6" sx={{ marginLeft: "1rem" }}>
                  {fetchReview.name}
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
               {`${fetchReview.date.split("T")[0].split("-").reverse().join("/")}`}
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