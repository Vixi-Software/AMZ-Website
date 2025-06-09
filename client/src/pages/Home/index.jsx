import React from 'react'
import { useProductHelper } from '../../utils/productHelper'
import ProductGrid from '../../components/features/ProductGrid'

function Home() {
  const { getProductsByCategory } = useProductHelper();
  const [products, setProducts] = React.useState([])

  React.useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductsByCategory('Loa di động');
      setProducts(products || []);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <ProductGrid
        products={products}
        banners={[
          { index: 0, image: 'https://th.bing.com/th/id/OIP.8xCA5qiq4AFrIjIwJwI0AQHaEX?rs=1&pid=ImgDetMain' },
          { index: 6, image: 'https://gameriv.com/wp-content/uploads/2023/08/Immortal-Journey-Zed.jpeg' }
        ]}
      />
    </div>
  )
}

export default Home