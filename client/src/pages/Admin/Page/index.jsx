import React, { useEffect, useState } from 'react'
import { useProductService } from '../../../services/productService'
import { pushAllProductsToFirestore } from '../../../services/dataService'

function PageManagement() {
  const { getProductsWithStore } = useProductService()
  const [products, setProducts] = useState([])
  const [syncing, setSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState("")

  useEffect(() => {
    const fetchProductsData = async () => {
      const data = await getProductsWithStore() 
      setProducts(data)
      console.log('Fetched products:', data)
    }
    fetchProductsData()
  }, [])

  const handleSync = async () => {
    setSyncing(true)
    setSyncStatus("Đang đồng bộ...")
    const result = await pushAllProductsToFirestore()
    setSyncing(false)
    setSyncStatus(result ? "Đồng bộ thành công!" : "Đồng bộ thất bại!")
    setTimeout(() => setSyncStatus(""), 3000)
  }

  return (
    <div>
      <button onClick={handleSync} disabled={syncing}>
        {syncing ? "Đang đồng bộ..." : "Đồng bộ sản phẩm"}
      </button>
      {syncStatus && <div>{syncStatus}</div>}
      {/* <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul> */}
    </div>
  )
}

export default PageManagement