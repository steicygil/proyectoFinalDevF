import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './Dashboard.module.css'
import Header from "./Header";

function Dashboard() {
return (
<>
    <Buscador/>
</>
)}

function Card({title, image}){
    return(
        <article className='card'>
            <img className='card-img-top' src={image} alt={`${title}`}/>
            <section className='card-body'>
            <h4 className='card-title'>
                {title}
            </h4>
            {/* <p className='card-text m-0'>hola</p> */}
            </section>
        </article>
        )
}

function Buscador() {
    const [texto, setTexto] = useState('');
    const [update, setUpdate] = useState('');
    const [showData, setShowData] = useState([]);

    const handleInputChange=(event) =>{
        setTexto(event.target.value)
    }

    const handleClick=() =>{
        setUpdate(texto)
    }

    useEffect(()=>{
        if (update != "") {
        fetch(`https://api.tvmaze.com/search/shows?q=${update}`)
        .then(response =>response.json())
        .then(data => {
            console.log(data)
            setShowData(data)
        })
        .catch(error => console.error('Error haciendo fetch', error))
    }
    },[update])

    return (
        
        <>
         <Header/>
    <div>

        <input id="buscador" type="text" onChange={handleInputChange} value={texto} className={styles.input}/>
        <button onClick={handleClick} className={styles.buttonSearch}>Buscar</button>
        {/* <p>Texto ingresado {update}</p>
        <p>Texto ingresado {texto}</p> */}
        {showData.length > 0 && (
                <div className='row g-4'>
                {showData.map((element) => (
                    <aside className="col-md-3">
                                <Link to={`/serie/${element.show.id}`}>
                                 {<Card title={element.show.name} image={element.show.image.medium} />     }
                                </Link>
                
                    </aside>
            ))}
            </div>
            )}
    </div>
    </>
    )
}

export default Dashboard

