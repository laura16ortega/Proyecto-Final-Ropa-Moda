import { Container } from '@mui/system'
import React from 'react'
import AllCards from '../../components/AllCards/AllCards'
import Filters from '../../components/Filters/Filters'

const Home = () => {
  console.log(JSON.parse(localStorage.getItem("User")!));
  return (
    <div>
      <Container maxWidth={"xl"} sx={{ marginBottom: 5 }}>
        <Filters/>
        <AllCards/>
      </Container>
    </div>
  )
}

export default Home