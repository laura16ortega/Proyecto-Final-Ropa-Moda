import React from "react";
import Footer from "../../components/Footer/Footer";


function LandingPage () {
    return (
        <div id="main">
            {/* <Navbar /> */}
            <div className="name"> 
                <h1><span>Cambiá tu estilo </span>cambiá tu vida</h1>
                <p className="details">No podés comprar la felicidad, pero podés comprar ropa y es casi lo mismo.</p>
                <a href="#" className="cv-btn">Ver Nuestras Marcas</a>    
            </div>
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGllbmRhJTIwZGUlMjByb3BhfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="dan" width="100%"/>
            <Footer />
        </div>
    )
}

export default LandingPage;

