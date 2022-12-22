import { Row, Col } from "react-bootstrap";
import { AppContext } from "../../context/index";
import React, { useContext } from "react";
import style from "./style.module.css";

const BottomRepresenation = () => {
  // fetch files from the context
  const { bottomImg2, bottomImg1 } = useContext(AppContext);
  return (
    <Row className={style.repersenationPanel}>
      <Col className={style.repersenationSection}>
        <img className={style.customImage} src={bottomImg1} alt="" />
      </Col>
      <Col className={style.repersenationSection}>
        <img className={style.customImage} src={bottomImg2} alt="" />
      </Col>
    </Row>
  );
};

export default BottomRepresenation;
