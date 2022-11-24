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
                  <a href="/">Contacto</a>
                </li>
                <li>
                  <a href="/">Soporte</a>
                </li>
                <li>
                  <a href="/">Privacidad</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Cuenta</h4>
              <ul>
                <li>
                  <a href="/">Acceso</a>
                </li>
                <li>
                  <a href="/">Registro</a>
                </li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Mensajes</h4>
              <ul>
                <li>
                  <a href="/">Respaldo</a>
                </li>
                <li>
                  <a href="/">Historia</a>
                </li>
                <li>
                  <a href="/">Lista</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
