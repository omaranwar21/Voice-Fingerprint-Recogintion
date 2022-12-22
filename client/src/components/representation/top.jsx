// import React, { useContext } from "react";

import { Row, Col } from "react-bootstrap";
import style from "./style.module.css";
// import { AppContext } from "../../context/index";

const TopRepresenation = () => {
  // fetch files from the context
  // const { fileName } = useContext(AppContext);
  return (
    <Row className={style.repersenationPanel}>
      <Col className={style.repersenationSection}>
        <h3>Voice Recognition</h3>

        <li>
          About this app: our webapp is a voice recognition application, where
          we used SVM classifier , in this model, the data is mapped in a
          hyperplan in multidimensional feature space so the points can be
          categorized, even if its not linearly separable The app allows the
          user to Recognize: which person is talking (fingerprints), whether the
          user is from a certain group of people or not, and Whether the
          password is correct or wrong Some of the used libraries: react,
          sklearn,librosa, pandas,numpy, pickle. Frameworks used: falsk, js,
          Hope you enjoy using our app!
        </li>
      </Col>
      <Col className={style.repersenationSection}>
        <img
          className={style.customImage}
          src="http://localhost:5000/api/file/model.png"
          alt=""
        />
      </Col>
    </Row>
  );
};

export default TopRepresenation;
