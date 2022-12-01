import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.body}>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.footerCol}>
              <h4>Ayuda</h4>
              <ul>
                <li>
                  <a href="/contact">Contacto</a>
                </li>
                <li>
                  <a>Soporte</a>
                </li>
                <li>
                  <a>Privacidad</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Cuenta</h4>
              <ul>
                <li>
                  <a href="/login">Acceso</a>
                </li>
                <li>
                  <a href="/register">Registro</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Mensajes</h4>
              <ul>
                <li>
                  <a href='https://www.facebook.com/people/Ropa-Y-Moda/100088461934792/' target="blank">Siganos</a>
                </li>
                <li>
                  <a>Historia</a>
                </li>
                <li>
                  <a>Lista</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
