import React from 'react'

// Tipo de los props destructurados
type cardProps = {
    title: string
    price: number
    description: string
    category: string
    image: string
}

const TestCard = ({ title, price, description, category, image }: cardProps) => {
    return (
        <div style={{width: "500px"}}>
            <img src={image} alt={title} style={{width: "300px", height: "300px", objectFit: "contain"}}/>
            <h1>Titulo: {title}</h1>
            <p>Descripcion: {description}</p>
            <p>Precio: <strong>{`$${price}`}</strong></p>
            <p>Categoria: {category}</p>
        </div>
    )
}

export default TestCard