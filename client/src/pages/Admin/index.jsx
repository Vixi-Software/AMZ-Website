import React, { useEffect, useState } from "react";
import { getAllTaiNgheNhetTai } from "../../utils/taiNgheNhetTaiHelper";
import { getAllNewSealTaiNghe } from "../../utils/newSeal";
import { getAllLoaKaraoke } from "../../utils/loaKaraoke";
import { getAllLoaDeBan } from "../../utils/loaDeBan"; // Thêm import
import { getAllTaiNgheChupTai } from "../../utils/taiNgheChuptai";
import { getAllLoaDiDong } from "../../utils/diDong";
// Nếu có các hàm getAllTaiNgheChupTai, getAllLoaDiDong thì import tương tự

function Admin() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("001-nhet-tai-cu");

  useEffect(() => {
    let unsubscribe;
    switch (category) {
      case "006-hang-newseal":
        unsubscribe = getAllNewSealTaiNghe(setItems);
        break;
      case "001-nhet-tai-cu":
        unsubscribe = getAllTaiNgheNhetTai(setItems);
        break;
      case "002-chup-tai-cu":
        unsubscribe = getAllTaiNgheChupTai(setItems);
        break;
      case "003-di-dong-cu":
        unsubscribe = getAllLoaDiDong(setItems);
        break;
      case "004-de-ban-cu":
        unsubscribe = getAllLoaDeBan(setItems);
        break;
      case "005-loa-karaoke":
        unsubscribe = getAllLoaKaraoke(setItems);
        break;
      default:
        unsubscribe = getAllTaiNgheNhetTai(setItems);
        break;
    }
    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [category]); // Theo dõi category


  // Đặt tên cột cho bảng
  const columns = [
    // "ID", // Bỏ cột ID
    // "Slug",
    // "Page", // Bỏ cột Page
    "Brand",
    "Name",
    "Color",
    "Giá bán",
    "Giá Gốc",
    "Giảm giá",
    "Số lượng",
    "Tình trạng",
    "Link ảnh",
    "Mô tả ngắn",
    "Tính năng",
  ];

  return (
    <div>
      {items.length > 0 ? (
        <div>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    style={{
                      border: "1px solid #2196f3",
                      background: "#2196f3",
                      color: "#fff",
                      padding: "8px",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items[page] &&
                Object.entries(items[page]).map(([key, value]) => {
                  // Bỏ cột Page: slice(2) thay vì slice(1)
                  const fields = String(value).split("|").slice(2);
                  return (
                    <tr key={key}>
                      {fields.map((field, idx) => (
                        <td
                          key={idx}
                          style={{
                            border: "1px solid #2196f3",
                            padding: "8px",
                            background: "#fff",
                          }}
                        >
                          {field === null || field === "null" || field === "" ? "Chưa cập nhật" : field}
                        </td>
                      ))}
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {/* Phân trang và select category chuyển xuống dưới */}
          <div style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px"
          }}>
            {items.map((_, idx) => (
              <button
                key={idx}
                style={{
                  backgroundColor: page === idx ? "#1976d2" : "#2196f3",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setPage(idx)}
              >
                {idx + 1}
              </button>
            ))}
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                border: "1px solid #2196f3",
                cursor: "pointer",
              }}
            >
              <option value={"001-nhet-tai-cu"}>Tai nghe nhét tai cũ</option>
              <option value={"002-chup-tai-cu"}>Tai nghe chụp tai cũ</option>
              <option value={"003-di-dong-cu"}>Loa di động cũ</option>
              <option value={"004-de-ban-cu"}>Loa để bàn cũ</option>
              <option value={"005-loa-karaoke"}>Loa karaoke cũ</option>
              <option value={"006-hang-newseal"}>Hàng new seal</option>
            </select>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Admin;