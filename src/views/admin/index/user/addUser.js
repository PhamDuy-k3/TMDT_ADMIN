import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UpdateUser from "./updateUser/updateUser";

function AddUser() {
  const [isUpdate, setIsUpdate] = useState(false);

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
  const [formData, setFormData] = useState({
    id: "",
    phone: "",
    firstName: "",
    lastName: "",
    userName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // add user
  const addUser = () => {
    if (
      formData.phone &&
      formData.firstName &&
      formData.lastName &&
      formData.userName
    ) {
      const isDuplicatePhone = listUser.some(
        (user) => user.Phone === formData.phone
      );

      if (!isDuplicatePhone) {
        setListUser((prevList) => [
          ...prevList,
          {
            id: listUser.length + 1,
            Phone: formData.phone,
            First_Name: formData.firstName,
            Last_Name: formData.lastName,
            User_Name: formData.userName,
          },
        ]);

        setFormData({
          id: "",
          phone: "",
          firstName: "",
          lastName: "",
          userName: "",
        });
      } else {
        alert("Số điện thoại đã tồn tại. Vui lòng chọn số khác.");
      }
    }
  };

  // delete user
  const deleteUser = (id) => {
    const updatedList = listUser.filter((user) => user.id !== id);
    setListUser(updatedList);
  };

  // update user
  const updateUser = (id) => {
    const user = listUser.some((item) => item.id === id);
    if (user) {
      console.log("12");
      setIsUpdate(true);
      overflow();
    }
  };

  function overflow() {
    if (isUpdate === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
  console.log(listUser);
  const users = listUser.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.phone}</td>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.username}</td>
      <td>
        <Button onClick={() => deleteUser(item.id)}>Delete</Button>
      </td>
      <td>
        <Button onClick={() => updateUser(item.id)}>Update</Button>
      </td>
    </tr>
  ));

  return (
    <>
      {isUpdate && <UpdateUser setIsUpdate={setIsUpdate} />}

      <Row>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nhập Số Điện thoại.."
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nhập FirstName.."
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nhập Last Name.."
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Nhập Username."
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Button onClick={addUser}>ADD</Button>
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
    </>
  );
}

export default AddUser;
