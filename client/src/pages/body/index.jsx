import { Container, Row, Col } from "react-bootstrap";
import RecordingButton from "../../components/recording_btn";
import style from "./style.module.css";

const Body = () => {
  return (
    <Container fluid className={style.container}>
      <Row fluid className={style.mainRow}>
        <Col xs={4} className={style.recordePanel}>
          <Row>
            <RecordingButton />
          </Row>
        </Col>
        <Col xs={8} className={style.repersenationContainer}>
          <Row className={style.repersenationPanel}>
            <Col className={style.repersenationSection}>
              <h3>Headline</h3>
              <li>
                First Point: Lorem Ipsum is simply dummy text of the printing
                and typesetting industry.
              </li>
              <li>
                Second Point: Lorem Ipsum is simply dummy text of the printing
                and typesetting industry.
              </li>
              <li>
                Third Point: Lorem Ipsum is simply dummy text of the printing
                and typesetting industry.
              </li>
              <li>
                Forth Point: Lorem Ipsum is simply dummy text of the printing
                and typesetting industry.
              </li>
            </Col>
            <Col className={style.repersenationSection}>
              <img
                src="https://lightningchart.com/lightningchart-js-interactive-examples/images/spectrogram.png"
                alt=""
              />
            </Col>
          </Row>
          <Row className={style.repersenationPanel}>
            <Col className={style.repersenationSection}>
              <h3>Headline</h3>
              <li>
                First Point: Lorem Ipsum is simply dummy text of the printing
                and typesetting industry.
              </li>
              <li>
                Second Point: Lorem Ipsum is simply dummy text of the printing
                and typesetting industry.
              </li>
              <li>
                Third Point: Lorem Ipsum is simply dummy text of the printing
                and typesetting industry.
              </li>
              <li>
                Forth Point: Lorem Ipsum is simply dummy text of the printing
                and typesetting industry.
              </li>
            </Col>
            <Col className={style.repersenationSection}>
              <img
                src="https://www.faberacoustical.com/wpblog/wp-content/uploads/2015/05/Spectrogram3D1024.png"
                alt=""
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
