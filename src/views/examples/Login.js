import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAgent } from 'react-useragent';
import { UAParser } from 'ua-parser-js';
import {
  Button,
  Card,
  // CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login = () => {
  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [requestInProcess, setRequestInProcess] = useState(false);
  const navigate = useNavigate();

  const tryLogIn = async () => {
    console.log(userLogin, userPassword);
    setRequestInProcess(true);
    try {
      const response = await axios.get("/", {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      console.log(UAParser(UserAgent))
      if (response.status !== 200) {
        throw new Error(`Error! status: ${response.status}`);
      }
      navigate("/admin/*")
    }
    catch (err) {
      console.log(err.message);
    }
    finally {
      setRequestInProcess(false);
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={e => setUserLogin(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={e => setUserPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" disabled={requestInProcess} onClick={e => { !requestInProcess && tryLogIn() }}>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => navigate("/auth/register")}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
