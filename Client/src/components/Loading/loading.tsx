import React from "react";
import styles from "./Loading.module.css";
import image from "../../assets/images/gif_robot.gif";

const Loading = () => {
  return (
    <div>
      <img src={image} alt="Gif" className={styles.img} />
    </div>
  );
};

export default Loading;
