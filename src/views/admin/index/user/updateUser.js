import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function UpdateUser({ setIsUpdate }) {
  return (
    <>
      <div
        style={{
          marginLeft: "10rem",
          height: "10rem",
          position: "absolute",
          backgroundColor: "white",
        }}
      >
        <div className="content-wraper-header d-lg-flex">
          <h2>Update User</h2>
          <div className="d-flex content-wraper-header-cl2">
            <a href="">
              <p style={{ color: "#0A58CA" }}>Home</p>
            </a>
            <p>/</p>
            <p className="gray">UpdateUser</p>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Nhập FirstName.."
                    name="firstName"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Nhập Last Name.."
                    name="lastName"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Nhập Username."
                    name="userName"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button onClick={()=>setIsUpdate(false)}>Update</Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateUser;
