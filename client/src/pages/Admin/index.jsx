import React, { useEffect, useState } from "react";
import { getAllTaiNgheNhetTai } from "../../utils/taiNgheNhetTaiHelper";
import { getAllNewSealTaiNghe } from "../../utils/newSeal";
import { getAllLoaKaraoke } from "../../utils/loaKaraoke";
import { getAllLoaDeBan } from "../../utils/loaDeBan"; // Thêm import
import { getAllTaiNgheChupTai } from "../../utils/taiNgheChuptai";
import { getAllLoaDiDong } from "../../utils/diDong";
import ProductForm from './Product/ProductForm';
import { Modal, message } from 'antd';
import { db } from '../../utils/firebase';
import { doc, setDoc, updateDoc, deleteField } from 'firebase/firestore';

function getCollectionNameByCode(code) {
  switch (code) {
    case '003-di-dong-cu':
      return '003-di-dong-cu';
    case '005-loa-karaoke':
      return '005-loa-karaoke';
    case '004-de-ban-cu':
      return '004-de-ban-cu';
    case '002-chup-tai-cu':
      return '002-chup-tai-cu';
    case '001-nhet-tai-cu':
      return '001-nhet-tai-cu';
    case '006-hang-newseal':
      return '006-hang-newseal';
    default:
      return 'test';
  }
}

function getCategoryByCode(code) {
  switch (code) {
    case '003-di-dong-cu':
      return 'Loa di động cũ';
    case '005-loa-karaoke':
      return 'Loa karaoke cũ';
    case '004-de-ban-cu':
      return 'Loa để bàn cũ';
    case '002-chup-tai-cu':
      return 'Tai nghe chụp tai cũ';
    case '001-nhet-tai-cu':
      return 'Tai nghe nhét tai cũ';
    case '006-hang-newseal':
      return 'Hàng new seal';
    default:
      return '';
  }
}

function Admin() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("001-nhet-tai-cu");
  const [editModal, setEditModal] = useState({ visible: false, key: '', value: '', page: '', code: '' });

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
    "Hành động", 
  ];

  // fields là mảng sau khi split từ value (bỏ code, page)
  function pipeStringToProductObject(fields, code) {
    return {
      brand: fields[0] || "",
      name: fields[1] || "",
      colors: fields[2] ? [fields[2]] : [],
      pricesBanLe: Number(fields[3]) || 0,
      pricesBanBuon: Number(fields[4]) || 0,
      salePrice: Number(fields[5]) || 0,
      status: fields[6] === "0", // 0: hiển thị, 1: ẩn
      statusSell: fields[7] ? [fields[7]] : [],
      images: fields[8] ? fields[8].split(";;") : [],
      description: fields[9] || "",
      tableInfo: fields[10] || "",
      isbestSeller: fields[11] === "0", // 0: true, 1: false
      highlights: fields[12] || "",
      inventories: fields[13] ? Number(fields[13]) : 0, // lấy tồn kho nếu có
      category: getCategoryByCode(code), // lấy category từ code
      // Bổ sung các trường khác nếu cần
    };
  }

  // Parse pipe string (full) to product object (dựa vào ProductForm)
  function parsePipeString(pipeString) {
  console.log('parsePipeString:', pipeString);
    const arr = String(pipeString).split("|");
    // arr[0]: code, arr[1]: page, arr[2...]: fields
    return {
      ...pipeStringToProductObject(arr.slice(2), arr[0]),
      _code: arr[0],
      _page: arr[1],
    };
  }

  // Convert product object to pipe string (reuse from ProductForm)
  function productToPipeString(product, code, page) {
    const brand = product.brand || '';
    const name = product.name || '';
    const color = Array.isArray(product.colors) ? product.colors[0] : (product.colors || '');
    const priceBanLe = product.pricesBanLe || '';
    const priceBanBuon = product.pricesBanBuon || '';
    const salePrice = product.salePrice || '';
    const status = product.status ? '0' : '1';
    const statusSell = Array.isArray(product.statusSell) ? product.statusSell[0] : (product.statusSell || '');
    const isbestSeller = product.isbestSeller ? '0' : '1';
    const tableInfo = product.tableInfo || '';
    const decription = product.description || '';
    const highlights = product.highlights || '';
    const images = Array.isArray(product.images) ? product.images.join(';;') : (product.images || '');
    return [
      code,
      page,
      brand,
      name,
      color,
      priceBanLe,
      priceBanBuon,
      salePrice,
      status,
      statusSell,
      images,
      decription,
      tableInfo,
      isbestSeller,
      highlights
    ].join('|');
  }

  // Update product in Firestore
  async function handleUpdateProduct(updated, key, code, page) {
    try {
      const collectionName = getCollectionNameByCode(code);
      const docRef = doc(db, collectionName, page);
      const pipeString = productToPipeString(updated, code, page);
      await setDoc(docRef, { [key]: pipeString }, { merge: true });
      message.success('Cập nhật sản phẩm thành công!');
      setEditModal({ visible: false, key: '', value: '', page: '', code: '' });
    } catch (err) {
      message.error('Cập nhật sản phẩm thất bại!');
    }
  }

  // Xóa sản phẩm trong Firestore (chỉ xóa 1 key-value trong document)
  async function handleDeleteProduct(key, code, page) {
    try {
      const collectionName = getCollectionNameByCode(code);
      const docRef = doc(db, collectionName, page);
      await updateDoc(docRef, { [key]: deleteField() });
      message.success('Xóa sản phẩm thành công!');
      // Sau khi xóa, cập nhật lại danh sách sản phẩm
      setItems((prevItems) => {
        const newItems = [...prevItems];
        if (newItems[page]) {
          delete newItems[page][key];
        }
        return newItems;
      });
    } catch {
      message.error('Xóa sản phẩm thất bại!');
    }
  }

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
                Object.entries(items[page])
                  .filter(([key, value]) => {
                    // Bỏ các hàng có key === 'id' và value === 'page1'
                    if (key === 'id' && value === 'page1') return false;
                    return true;
                  })
                  .map(([key, value]) => {
                    const arr = String(value).split("|");
                    const code = arr[0];
                    const pageName = arr[1];
                    const fields = arr.slice(2, 2 + columns.length - 1);
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
                        <td
                          style={{
                            border: "1px solid #2196f3",
                            padding: "8px",
                            background: "#fff"
                          }}
                        >
                          <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                            <button
                              style={{ background: '#ff9800', color: '#fff', border: 'none', borderRadius: '3px', padding: '4px 8px', cursor: 'pointer' }}
                              onClick={() => {
                                const obj = parsePipeString(value);
                                setEditModal({ visible: true, key, value: obj, page: pageName, code });
                              }}
                            >Sửa</button>
                            <button
                              style={{ background: '#f44336', color: '#fff', border: 'none', borderRadius: '3px', padding: '4px 8px', cursor: 'pointer' }}
                              onClick={() => {
                                const obj = parsePipeString(value);
                                handleDeleteProduct(key, code, pageName);
                              }}
                            >Xóa</button>
                          </div>
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
            open={editModal.visible}
            title="Cập nhật sản phẩm"
            footer={null}
            onCancel={() => setEditModal({ visible: false, key: '', value: '', page: '', code: '' })}
            destroyOnClose
          >
            <ProductForm
              initialValues={editModal.value}
              onFinish={values => handleUpdateProduct(values, editModal.key, editModal.code, editModal.page)}
            />
          </Modal>
        </div>
      ) : null}
    </div>
  );
}

export default Admin;