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
import axios from "axios";
import { UserAgent } from 'react-useragent';
import { UAParser } from 'ua-parser-js';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [login, setLogin] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const hostName = UAParser(UserAgent).browser.name + " " + UAParser(UserAgent).os.name;
  const [isReady, setIsReady] = useState(false);
  const [requestInProcess, setRequestInProcess] = useState(false);
  const navigate = useNavigate();

  const SingIn = async () => {
    setRequestInProcess(true);
    try {
      const response = await axios.post("https://scribesbookapi-evhk1f08.b4a.run/users/sign_in",
        {
          "login": login,
          "mail": mail,
          "name_first": firstName,
          "name_last": lastName,
          "password": password,
          "host_name": hostName
        })
      console.log(response)
      if (response.status !== 200) {
        throw new Error(`Error! status: ${response.status}`);
      }
      else {
        localStorage.setItem("jwt", response.data.access_token)
        console.log(response.data)
        console.log(localStorage.getItem("jwt"))
        navigate("/admin/*")
      }
      
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
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Login" type="text" onChange={e => setLogin(e.target.value)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Имя" type="text" onChange={e => setFirstName(e.target.value)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <Input placeholder="Фамилия" type="text" onChange={e => setLastName(e.target.value)} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={e => setMail(e.target.value)}
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
                    onChange={e => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password strength:{" "}
                  <span className="text-success font-weight-700">strong</span>
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      onClick={e => setIsReady(!isReady)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="button" disabled={!isReady && !requestInProcess} onClick={e => { SingIn() }}>
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
