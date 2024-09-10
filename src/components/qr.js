import React from "react";
import { QRCodeSVG } from "qrcode.react";

const OrderQRCode = ({ orderId }) => {
  const qrValue = `http://localhost:3000/products`;

  return (
    <div>
      <QRCodeSVG value={qrValue} />
    </div>
  );
};

export default OrderQRCode;
