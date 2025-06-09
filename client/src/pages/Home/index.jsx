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
      <ProductGrid products={products} />
    </div>
  )
}

export default Home