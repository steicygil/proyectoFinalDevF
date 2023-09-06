import React from "react"
import { useParams } from "react-router-dom"
import { useState,useEffect } from "react";
import styles from './Descripcion.module.css'
import {HashLink} from 'react-router-hash-link'
import { Link } from "react-router-dom";

function Descripcion() {
    let {id}=useParams();
    const regex2 = /(<([^>]+)>)/gi;

    
    const [firstFetch, setFirstFetch] = useState(0);
    const [firstFetcha, setFirstFetcha] = useState(0);
    const [firstFetch2, setFirstFetch2] = useState(0);

    const [showData, setShowData] = useState({});
    const [showEpisodes, setShowEpisodes] = useState([]);
    const [seasonsData, setSeasonData]= useState([]);
    const [castData, setCastData]= useState([]);

    useEffect(()=>{  
        
           if(firstFetch!=0){
             fetch(`https://api.tvmaze.com/shows/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log("primer fetch"+firstFetch);
                console.log(data);
                setShowData(data)
    
            })
            .catch(error => console.error('Error haciendo fetch', error))
           }else{
            setFirstFetch(1)
           }
           
        

    },[firstFetch])

    useEffect(()=>{
        if(firstFetcha!=0){
        console.log("me ejecuto")
        fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
        .then(response => response.json())
        .then(dataSeason => {
            setSeasonData(dataSeason)  
        }
        )
        .catch(error => console.error('Error haciendo fetch', error))
    }else{
        setFirstFetcha(1)
    }
    
    },[firstFetcha])

    useEffect(()=>{  
        if(seasonsData.length > 0){
            console.log("me ejecuto b")
            console.log(seasonsData)

        fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
        .then(response => response.json())
        .then(dataEpisodes => {
            let arreglo = []
            for (let index = 0; index < seasonsData.length; index++) {
                const element = seasonsData[index];
                let episodes = dataEpisodes.filter(item => item.season == element.number)
                let ojson={
                    id:`${element.id}`,
                    number: `${element.number}`,
                    episodes: episodes
                }
                arreglo.push(ojson)
            }
            console.log("super arreglo")
            console.log(arreglo)
            setShowEpisodes(arreglo)

         })
        .catch(error => console.error('Error haciendo fetch', error))
        }
    },[seasonsData])



    
    useEffect(()=>{
        if(firstFetch2!=0){
        console.log("me ejecuto cast")
        fetch(`https://api.tvmaze.com/shows/${id}/cast`)
        .then(response => response.json())
        .then(castData => {
            console.log(castData);
            setCastData(castData)  
        }
        )
        .catch(error => console.error('Error haciendo fetch', error))
    }else{
        setFirstFetch2(1)
    }
    
    },[firstFetch2])


    return(
        <>

        <section className={styles.navFijo}>
        <div className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <img className={styles.logo} src='https://static.tvmaze.com/images/tvm-header-logo.png' alt='Logo de nuestro sitio'></img>
        <div className="container">
            <div className="row">
                <div className="col">
                    <HashLink smooth to={"#resumen"} className={styles.titulo}><a>Resumen</a></HashLink>
                </div>
                <div className="col">
                    <HashLink smooth to={"#temporada"} className={styles.titulo}><a>Temporadas</a></HashLink>
                </div>
                <div className="col">
                    <HashLink smooth to={"#elenco"} className={styles.titulo}><a>Elenco</a></HashLink>
                </div>
                <div className="col">
                {/* <a className={styles.titulo} onClick={() => window.history.back()}>Regresar</a> */}
                <Link className={styles.titulo} to="/">
                    <a>Inicio</a>
                </Link>
                </div>      
            </div> 
        </div>
        </div>
        </section>
        <h3 id={"resumen"} className={styles.tituloResumen}>Resumen</h3>
        <div>
        {(showData.name != undefined) && (<Image title={showData.name} image={showData.image.medium}/>
        )}
            
        </div>
        <div className={styles.resumen}>
            
        {showData.summary}
        </div> 

    

         <div className='row g-4'>
        <h1></h1>
        <h1/>
        <h1/>
         <h3 id={"temporada"}  className={styles.tituloTemporadas} >Temporadas</h3>
            {showEpisodes.map((element) => (
                
                    <ListaTemporada objectoEpisodios={element}/>
            ))}
            </div>
       
            <div>    
        {castData.length > 0 && (
                <div className='row g-4'>
                    <h3 id={"elenco"} className={styles.tituloElenco}>Elenco principal</h3>
                {castData.map((element) => (
                    <aside className="col-md-3">
                                 {<Card title={element.person.name} image={element.person.image.medium} character={element.character.name} />     }          
                    </aside>
            ))}
            </div>
            )}
    </div>
        </>


    )
}

function ListaTemporada({objectoEpisodios}){
    return(
    
        <div>
            <h1 className={styles.listaTempo}>Temporada {objectoEpisodios.number}</h1>
            {objectoEpisodios.episodes.map((element) => (
                <CardEpisodes title={element.name} image={element.image.medium} descripcion={element.summary}/>
                    
            ))}
        </div>
        

        
    )

}

function Image({image,title}){
    return(
        <>
            <h4 className={styles.tituloPrincipal}>{title}</h4>
            <img className={styles.imagenSummary} src={image} alt={`${title}`}/>
        </>
        )
}


function Card({title, image, character}){
    return(
        <article className='card'>
            <img className='card-img-top' src={image} alt={`${title}`}/>
            <section className='card-body'>
            <h4 className='card-title'>
                {title}
            </h4>
            <p className='card-text m-0'>as: {character}</p>
            </section>
        </article>
        )
}


function CardEpisodes({title, image, descripcion}){

    const regex = /(<([^>]+)>)/gi;
    return(
        <div className='container'>
            <div className='row p-3'>
                <div className='col-4'>
                <article className='card'>
            <img className='card-img-top' src={image} alt={`${title}`}/>
            <section className='card-body'>
            <h4 className='card-title'>
                {title}
            </h4>
            </section>
        </article>
                </div>
                <div className='col card'>
                <h4 className='textoCapitulo'> {descripcion.replace(regex,"")}</h4>
                </div>
            </div>


        </div>
        )
}

export default Descripcion;