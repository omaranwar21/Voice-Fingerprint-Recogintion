import { Container, Row, Col } from "react-bootstrap";
import RecordingButton from "../../components/recording_btn";
import TopRepresenation from "../../components/representation/top";
import BottomRepresenation from "../../components/representation/bottom";
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
          <TopRepresenation />
          <BottomRepresenation />
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
