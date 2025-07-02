import React, { useEffect, useState } from "react";
import { getAllTaiNgheNhetTai } from "../../utils/taiNgheNhetTaiHelper";
import { getAllNewSealTaiNghe } from "../../utils/newSeal";
import { getAllLoaKaraoke } from "../../utils/loaKaraoke";
import { getAllLoaDeBan } from "../../utils/loaDeBan"; // Thêm import
import { getAllTaiNgheChupTai } from "../../utils/taiNgheChuptai";
import { getAllLoaDiDong } from "../../utils/diDong";
import { Modal, Button as AntdButton, message } from "antd";
import ProductForm from "./Product/ProductForm";
import { db } from "../../utils/firebase";
import { doc, updateDoc, deleteField } from "firebase/firestore";

function Admin() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("001-nhet-tai-cu");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // "view" | "edit"
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  // Hàm lấy dữ liệu sản phẩm từ pipeString
  function parseProductPipeString(pipeString) {
    const arr = String(pipeString).split("|");
    // Parse tableInfo (HTML table) thành mảng key-value nếu có
    let tableRows = [];
    if (arr[12]) {
      // Tách các dòng <tr>...</tr>
      const rowRegex = /<tr[^>]*>(.*?)<\/tr>/g;
      let match;
      while ((match = rowRegex.exec(arr[12])) !== null) {
        // Tách các ô <td>...</td>
        const cellRegex = /<td[^>]*>(.*?)<\/td>/g;
        const cells = [];
        let cellMatch;
        while ((cellMatch = cellRegex.exec(match[1])) !== null) {
          cells.push(cellMatch[1]);
        }
        if (cells.length === 2) {
          tableRows.push({ key: cells[0], value: cells[1] });
        }
      }
    }
    return {
      code: arr[0],
      page: arr[1],
      brand: arr[2],
      name: arr[3],
      colors: arr[4] ? [arr[4]] : [],
      pricesBanLe: Number(arr[5]) || 0,
      pricesBanBuon: Number(arr[6]) || 0,
      salePrice: Number(arr[7]) || 0,
      status: arr[8] === "0",
      statusSell: arr[9] ? [arr[9]] : [],
      images: arr[10] ? arr[10].split(";;") : [],
      description: arr[11] || "",
      tableInfo: arr[12] || "",
      tableRows: tableRows.length > 0 ? tableRows : [{ key: '', value: '' }],
      isbestSeller: arr[13] === "0",
      highlights: arr[14] || "",
      // Có thể bổ sung các trường khác nếu cần
    };
  }

  // Hàm mở modal xem/sửa
  const handleOpenModal = (mode, key, value) => {
    setModalMode(mode);
    setSelectedKey(key);
    setSelectedProduct(parseProductPipeString(value));
    setModalVisible(true);
  };

  // Hàm xóa sản phẩm
  const handleDelete = async (key) => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa sản phẩm này?",
      onOk: async () => {
        try {
          // Xác định page hiện tại
          const pageName = `page${page + 1}`;
          const docRef = doc(db, category, pageName);
          await updateDoc(docRef, { [key]: deleteField() });
          message.success("Đã xóa sản phẩm!");
        } catch (err) {
          message.error("Xóa thất bại!");
        }
      },
    });
  };

  // Hàm cập nhật sản phẩm
  const handleUpdate = async (values) => {
    try {
      // Chuyển values thành pipeString
      const pageName = `page${page + 1}`;
      const docRef = doc(db, category, pageName);
      // Sử dụng lại logic productToPipeString từ ProductForm
      const pipeString = ProductForm.prototype.productToPipeString
        ? ProductForm.prototype.productToPipeString(values, pageName)
        : ""; // Nếu không có thì tự viết lại
      await updateDoc(docRef, { [selectedKey]: pipeString });
      message.success("Cập nhật thành công!");
      setModalVisible(false);
    } catch (err) {
      message.error("Cập nhật thất bại!");
    }
  };

  // Lọc sản phẩm theo searchTerm
  const filteredEntries = items[page]
    ? Object.entries(items[page]).filter(([key, value]) => {
        if (!searchTerm.trim()) return true;
        const fields = String(value).toLowerCase();
        return fields.includes(searchTerm.toLowerCase());
      })
    : [];

  return (
    <div>
      {/* Thanh tìm kiếm */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, thương hiệu, ..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{
            padding: "8px 16px",
            borderRadius: 4,
            border: "1px solid #2196f3",
            width: 300,
            marginRight: 8,
          }}
        />
      </div>
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
                <th style={{ border: "1px solid #2196f3", background: "#2196f3", color: "#fff", padding: "8px" }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map(([key, value]) => {
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
                    <td style={{ border: "1px solid #2196f3", padding: "8px", background: "#fff" }}>
                      <AntdButton size="small" onClick={() => handleOpenModal("view", key, value)} style={{ marginRight: 4 }}>Xem</AntdButton>
                      <AntdButton size="small" type="primary" onClick={() => handleOpenModal("edit", key, value)} style={{ marginRight: 4 }}>Sửa</AntdButton>
                      <AntdButton size="small" danger onClick={() => handleDelete(key)}>Xóa</AntdButton>
                    </td>
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
          <Modal
            open={modalVisible}
            onCancel={() => setModalVisible(false)}
            title={modalMode === "edit" ? "Sửa sản phẩm" : "Chi tiết sản phẩm"}
            footer={null}
            width={800}
          >
            {modalMode === "edit" ? (
              <ProductForm initialValues={selectedProduct} onFinish={handleUpdate} />
            ) : (
              <ProductForm initialValues={selectedProduct} disabled />
            )}
          </Modal>
        </div>
      ) : null}
    </div>
  );
}

export default Admin;