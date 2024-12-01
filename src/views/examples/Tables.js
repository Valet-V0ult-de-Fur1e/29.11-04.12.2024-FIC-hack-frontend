import {
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Table1 from "./tableTest";

const Tables = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
      <Row className="mt-5">
        <Table1></Table1>
      </Row>
      </Container>
    </>
  );
};

export default Tables;
