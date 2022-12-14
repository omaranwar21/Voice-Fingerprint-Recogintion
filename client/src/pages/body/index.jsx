import { Container, Row, Col } from "react-bootstrap";
import RecordingButton from "../../components/recording_btn";
// import style from "./style.module.css";

const Body = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <RecordingButton />
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
