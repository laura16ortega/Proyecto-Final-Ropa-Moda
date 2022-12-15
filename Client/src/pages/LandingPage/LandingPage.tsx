
// import React from "react";
// // import Footer from '../../components/Footer/Footer';
// //import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import useEffect from 'react';
import { useValidateSession } from '../../assets/hooks/useValidateSession';
import s from './landingPage.module.css';

const LandingPage = () => {
    const {isAuthenticated} = useAuth0()
    useValidateSession()
    if(isAuthenticated){
        window.location.href = "/products";
    }

    const filterTypes =[
      {nameToDisplay: "Categoria"},
      {name: "pantalon y camisetas"},
      {options: ["Camiseta", "Pantalones"]},
    ]
  
    return (
      <div className={s.bodyContainer}>
         <div className={s.separator}>
            <div className={s.featuredContainer}>
               <div className={s.featuredWrapper}>
                  <div className={s.featuredLeft}>
                     <div className={s.leftContents}>
                        <div className={s.titleContainer}>
                           <p>Cambiá tu estilo, Cambiá tu vida</p>
                           <h1>
                              ROPA DE MODA
                           </h1>
                        </div>
                        <div>
                           <p>No podés comprar la felicidad, pero podés comprar ropa y es casi lo mismo</p>
                        </div>
                        <div className={s.buttonContainer}>
                           <Link to="/products">
                              <div className={s.buttonDesc}>
                                 <div>VER PRODUCTOS</div>
                              </div>
                           </Link>
                        </div>
                     </div>
                  </div>
                  <div className={s.img}>
                     <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGllbmRhJTIwZGUlMjByb3BhfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt=""/>
                  </div>
               </div>
            </div>
         </div>
         <div className={s.categories}>
                  <h1>ALGUNAS PRENDAS</h1>
                  <div className={s.categoriesLink}>
                        {filterTypes.map(e => 
                           <div key={e.name} style={{padding: "0 15px"}}>
                              <div>
                                 <img src="https://i.pinimg.com/236x/09/c5/12/09c5129bfa37c81159ca663555587707.jpg" alt={e.name}  style={{width: "277px", height: "auto"}}/>
                              </div>
                              <div>
                                 <h2>
                                    {e.name}
                                 </h2>
                              </div>
                           </div>
                        )}
                  </div>
               </div>
            </div>
      
   )

}


export default LandingPage;