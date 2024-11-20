import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShippingFeeModal({ fetchShippingFees }) {
  const [showModal, setShowModal] = useState(false);
  const [cookies] = useCookies();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    reset();
    setShowModal(false);
  };

  const handleShow = () => setShowModal(true);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/shippingfees",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.admin_token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Thêm phí vận chuyển thành công");
        fetchShippingFees();
        handleClose();
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm phí vận chuyển.");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ width: "300px" }}
      />
      <i onClick={handleShow} className="fas fa-plus-square"></i>

      <Modal id="model-shipping-fee" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Phí Vận Chuyển Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formType">
              <Form.Label>Loại Vận Chuyển</Form.Label>
              <Form.Select
                {...register("type", {
                  required: "Vui lòng chọn loại vận chuyển",
                })}
              >
                <option value="Hỏa tốc">Hỏa tốc</option>
                <option value="Nhanh">Nhanh</option>
                <option value="Thường">Thường</option>
              </Form.Select>
              {errors.type && (
                <span className="text-danger">{errors.type.message}</span>
              )}
            </Form.Group>

            <Form.Group controlId="formFee">
              <Form.Label>Phí Vận Chuyển (VND)</Form.Label>
              <Form.Control
                type="number"
                {...register("fee", {
                  required: "Vui lòng nhập phí vận chuyển",
                  min: { value: 0, message: "Phí phải lớn hơn 0" },
                })}
              />
              {errors.fee && (
                <span className="text-danger">{errors.fee.message}</span>
              )}
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Mô Tả</Form.Label>
              <Form.Control type="text" {...register("description")} />
            </Form.Group>

            <Form.Group controlId="formDeliveryTime">
              <Form.Label>Thời Gian Giao Hàng</Form.Label>
              <Form.Select {...register("deliveryTime")}>
                <option value="1-2 ngày">1-2 ngày</option>
                <option value="3-5 ngày">3-5 ngày</option>
                <option value="5-7 ngày">5-7 ngày</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShippingFeeModal;
