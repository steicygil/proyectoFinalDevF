import styles from './Header.module.css'

function Header() {
    
    return(
    <header className={styles.header}>
    <img className={styles.logo} src='https://static.tvmaze.com/images/tvm-header-logo.png' alt='Logo de nuestro sitio'></img>
    <ul className={styles.nav}>
        <li><a href="#">Todo</a></li>
        <li><a href="#">Series</a></li>
        <li><a href="#">Peliculas</a></li>
        <li><a href="#">Categorias</a></li>
        
    </ul>
</header>
);
   
}

export default Header