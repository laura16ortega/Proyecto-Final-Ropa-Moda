import { Container } from '@mui/system'
import React from 'react'
import AllCards from '../../components/AllCards/AllCards'
import Filters from '../../components/Filters/Filters'
import styles from  './home.module.css';

const Home = () => {
  console.log(JSON.parse(localStorage.getItem("User")!));
  return (
    <div className={styles.home_container}>
      <Container maxWidth={"xl"} sx={{ marginBottom: 5 }}>
        <Filters/>
        <AllCards/>
      </Container>
    </div>
  )
}

export default Home