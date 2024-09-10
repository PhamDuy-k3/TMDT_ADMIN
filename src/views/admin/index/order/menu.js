import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const Menu = ({ setStatus, status }) => {
  const [open, setOpen] = useState(false);

  const handleMenuClick = (e) => {
    setStatus(e.key); // Lưu giá trị đã chọn vào biến status
    setOpen(false); // Đóng menu sau khi chọn
  };

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen);
  };

  const items = [
    {
      label: "Chờ xác nhận",
      key: "unconfirmed",
    },
    {
      label: "Đã xác nhận",
      key: "confirmed",
    },
    {
      label: "Đang xử lý",
      key: "processing",
    },
    {
      label: "Đã giao hàng",
      key: "shipped",
    },
    {
      label: "Đã giao thành công",
      key: "delivered",
    },
    {
      label: "Đã hủy",
      key: "canceled",
    },
    {
      label: "Đã trả hàng",
      key: "returned",
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      onOpenChange={handleOpenChange}
      open={open}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {items.find((item) => item.key === status)?.label ||
            "Chọn trạng thái"}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default Menu;
