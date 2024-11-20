import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ModelAddVoucher({ fetchUserVoucher }) {
  const [showModelAddVoucher, setShowModelAddVoucher] = useState(false);
  const [cookies, setCookie] = useCookies();

  // Sử dụng useForm để quản lý form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const handleClose = () => {
    reset();
    setShowModelAddVoucher(false);
  };

  const handleShow = () => setShowModelAddVoucher(true);
  const handleFromData = (data) => {
    const formData = new FormData();

    if (data.code) {
      formData.append("code", data.code);
    }
    if (data.shopName) {
      formData.append("shopName", data.shopName);
    }
    if (data.logoShop[0]) {
      formData.append("logoShop", data.logoShop[0]);
    }
    if (data.discountType) {
      formData.append("discountType", data.discountType);
    }
    if (data.discountType !== "freeshipping") {
      if (data.discountValue !== undefined) {
        formData.append("discountValue", data.discountValue);
      }
    }
    if (data.minOrderValue !== undefined) {
      formData.append("minOrderValue", data.minOrderValue);
    }
    if (data.expirationDate) {
      formData.append("expirationDate", data.expirationDate);
    }
    if (data.stock !== undefined) {
      formData.append("stock", data.stock);
    }
    if (data.discountType === "freeshipping") {
      if (data.maxShippingFreeDiscount !== undefined) {
        formData.append(
          "maxShippingFreeDiscount",
          data.maxShippingFreeDiscount
        );
      }
    }

    if (data.usageLimit !== undefined) {
      formData.append("usageLimit", data.usageLimit);
    }
    if (data.usedPercentage !== undefined) {
      formData.append("usedPercentage", data.usedPercentage);
    }
    return formData;
  };
  const onSubmit = async (data) => {
    try {
      const formData = handleFromData(data);
      if (!formData) return;

      const response = await axios.post(
        "http://localhost:5050/discountcode",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + cookies.admin_token,
          },
        }
      );

      if (response.status === 200) {
        toast.success(() => (
          <p style={{ paddingTop: "1rem" }}>Thêm thành công</p>
        ));
        fetchUserVoucher();
        handleClose();
      }
    } catch (error) {
      toast.error(() => <p style={{ paddingTop: "1rem" }}>{error.message}</p>);
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

      <Modal
        id="model-add-voucher"
        show={showModelAddVoucher}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Thêm Mã Giảm Giá Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formCode">
              <Form.Label>Mã Giảm Giá</Form.Label>
              <Form.Control
                type="text"
                {...register("code", { required: "Vui lòng nhập mã giảm giá" })}
              />
              {errors.code && (
                <span className="text-danger">{errors.code.message}</span>
              )}
            </Form.Group>

            <Form.Group controlId="formShopName">
              <Form.Label>Tên Cửa Hàng</Form.Label>
              <Form.Control
                type="text"
                {...register("shopName", {
                  required: "Vui lòng nhập tên cửa hàng",
                })}
              />
              {errors.shopName && (
                <span className="text-danger">{errors.shopName.message}</span>
              )}
            </Form.Group>

            <Form.Group controlId="formLogoShop">
              <Form.Label>Logo Cửa Hàng</Form.Label>
              <Form.Control type="file" {...register("logoShop")} />
            </Form.Group>

            <Form.Group controlId="formDiscountType">
              <Form.Label>Loại Giảm Giá</Form.Label>
              <Form.Select {...register("discountType", { required: true })}>
                <option value="fixed">Cố Định</option>
                <option value="percentage">Phần Trăm</option>
                <option value="freeshipping">Miễn Phí Vận Chuyển</option>
              </Form.Select>
            </Form.Group>
            {watch("discountType") !== "freeshipping" && (
              <Form.Group controlId="formDiscountValue">
                <Form.Label>Giá Trị Giảm Giá</Form.Label>
                <Form.Control
                  type="number"
                  {...register("discountValue", {
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Giá trị giảm giá phải lớn hơn 0",
                    },
                  })}
                />
                {errors.discountValue && (
                  <span className="text-danger">
                    {errors.discountValue.message}
                  </span>
                )}
              </Form.Group>
            )}

            <Form.Group controlId="formMinOrderValue">
              <Form.Label>Giá Trị Đơn Hàng Tối Thiểu</Form.Label>
              <Form.Control
                type="number"
                {...register("minOrderValue", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Giá trị phải lớn hơn 0" },
                })}
              />
              {errors.minOrderValue && (
                <span className="text-danger">
                  {errors.minOrderValue.message}
                </span>
              )}
            </Form.Group>

            <Form.Group controlId="formExpirationDate">
              <Form.Label>Ngày Hết Hạn</Form.Label>
              <Form.Control
                type="date"
                {...register("expirationDate", {
                  required: "Vui lòng chọn ngày hết hạn",
                })}
              />
              {errors.expirationDate && (
                <span className="text-danger">
                  {errors.expirationDate.message}
                </span>
              )}
            </Form.Group>

            <Form.Group controlId="formStock">
              <Form.Label>Số Lượng</Form.Label>
              <Form.Control
                type="number"
                {...register("stock", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Số lượng phải lớn hơn 0" },
                  required: "Vui lòng nhập số lượng",
                })}
              />
              {errors.stock && (
                <span className="text-danger">{errors.stock.message}</span>
              )}
            </Form.Group>

            {watch("discountType") === "freeshipping" && (
              <Form.Group controlId="formMaxShippingFreeDiscount">
                <Form.Label>Giảm Giá Vận Chuyển Tối Đa</Form.Label>
                <Form.Control
                  type="number"
                  {...register("maxShippingFreeDiscount", {
                    valueAsNumber: true,
                    min: { value: 0, message: "Giá trị phải lớn hơn 0" },
                  })}
                />
                {errors.maxShippingFreeDiscount && (
                  <span className="text-danger">
                    {errors.maxShippingFreeDiscount.message}
                  </span>
                )}
              </Form.Group>
            )}
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

export default ModelAddVoucher;
