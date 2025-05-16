import React, { useEffect } from 'react';

const ProductFetcher = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/vdev0812/downgrade-ear/refs/heads/main/products.json');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const products = data.products;
        const simplifiedProducts = products.map(product => ({
          id: product.id,
          name: product.name,
          category: product.category,
          category_code: product.category_code,
          brand: product.brand,
          color: product.options?.[0]?.values?.[0] || null,
          Product_condition: product.options?.[1]?.values?.[0] || null,
          Barcode: product.variants?.[0]?.barcode || null,
          DaNang: product.variants?.[0]?.inventories?.[0].available || 0,
          HaNoi: product.variants?.[0]?.inventories?.[1].available || 0,
          Ban_Le: product.variants?.[0]?.variant_prices?.[0].value || 0,
        }));

        
        console.log('Dữ liệu sản phẩm:', simplifiedProducts); // In ra console
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Đã tải sản phẩm (xem console)</h2>
    </div>
  );
};

export default ProductFetcher;
