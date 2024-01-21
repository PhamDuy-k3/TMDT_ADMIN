import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function User() {
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        setListUser(data.users);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    fetchUser();
  }, []);
  const users = listUser.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.phone}</td>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.username}</td>
      <td>
        <Button>Delete</Button>
      </td>
      <td>
        <Button>Update</Button>
      </td>
    </tr>
  ));
  return (
    <div className="content-wraper content-wraper3 ">
      <div className="content-wraper-header d-lg-flex">
        <h2>User</h2>
        <div className="d-flex content-wraper-header-cl2">
          <a href="">
            <p style={{ color: "#0A58CA" }}>Home</p>
          </a>
          <p>/</p>
          <p className="gray">User</p>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Nhập Số Điện thoại.."
                  name="phone"
                />
              </Form.Group>
            </Col>
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
              <Button>ADD</Button>
            </Col>
          </Row>
          <div style={{ overflow: "scroll", height: "95rem" }}>
            <Table
              className="mt-4"
              style={{ textAlign: "center" }}
              striped
              bordered
              hover
              variant="white"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Phone</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Delete</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>{users}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default User;
