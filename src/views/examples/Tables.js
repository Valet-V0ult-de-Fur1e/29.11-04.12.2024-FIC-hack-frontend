import {
  Container,
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import Table1 from "./tableTest";
// import Table2 from "./tableTest2";
const Tables = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
      <Row className="mt-5">
        <div></div>
        <Table1></Table1>
        {/* <Table2></Table2> */}
      </Row>
      </Container>
    </>
  );
};

export default Tables;
