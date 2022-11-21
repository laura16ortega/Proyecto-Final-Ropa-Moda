import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../assets/hooks";
import { fetchingTest } from "../../redux/thunk-actions/testActions";
import TestCard from '../TestCard/TestCard';

const Test = () => {

   const { allData, error, loading } = useAppSelector(state => state.data)
   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(fetchingTest())
   }, [dispatch])

   return (
      <div>
         <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            {loading && !error ? <h1>Cargando...</h1>
               : error ? <h1>Error: {error}</h1>
                  : allData?.map(e =>
                     <div>
                     <TestCard
                        key={e.id}
                        title={e.title}
                        price={e.price}
                        description={e.description}
                        category={e.category}
                        image={e.image}
                     />
                     <br />
                     </div>
                  )
            }
         </div>
      </div>
   )
}

export default Test