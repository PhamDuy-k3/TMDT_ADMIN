import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useCookies } from "react-cookie";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const RevenuelLneChart = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(Array(12).fill(0));
  const [status, setStatus] = useState("delivered");
  const [cookies] = useCookies();

  const fetchCartsOder = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/cartsOder?status=${status}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.admin_token,
          },
        }
      );
      const data = await response.json();
      processRevenueData(data.data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  const processRevenueData = (orders) => {
    // Khởi tạo mảng doanh thu theo tháng
    const revenueByMonth = Array(12).fill(0);

    orders.forEach((order) => {
      const confirmedAt = new Date(order.confirmedAt);
      const month = confirmedAt.getMonth();
      console.log(month);
      revenueByMonth[month] += order.orderTotal;
    });

    setMonthlyRevenue(revenueByMonth);
  };

  useEffect(() => {
    fetchCartsOder();
  }, [cookies.id_user, status]);
  // Dữ liệu doanh thu tĩnh với biến động lên xuống
  const chartData = {
    labels: [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ],
    datasets: [
      {
        label: "Doanh Thu",
        data: monthlyRevenue,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Độ cong của đường, 0.4 là giá trị hợp lý để tạo đường cong
      },
    ],
  };

  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Doanh thu theo tháng",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default RevenuelLneChart;
