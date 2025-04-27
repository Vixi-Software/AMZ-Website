import React from 'react';
import CardProduct from '../../components/features/card-product';
import { Col, Row } from 'react-bootstrap';

function ProductList({ bannerIndexes = [0, 3] }) {
    const products = [
        {id: 1, name: 'Product 1'},
        {id: 2, name: 'Product 2'},
        {id: 3, name: 'Product 3'},
        {id: 4, name: 'Product 4'},
        {id: 5, name: 'Product 5'},
        {id: 6, name: 'Product 6'},
        {id: 7, name: 'Product 7'},
    ];

    return (
        <div className='product-list'>
            <Row>
                {products.map((product, index) => {
                    if (bannerIndexes.includes(index)) {
                        return (
                            <React.Fragment key={`banner-${index}`}>
                                <Col md={4} key={`product-${product.id}`}>
                                    <CardProduct product={product} />
                                </Col>
                                <Col md={8}>
                                    <img 
                                        className='banner img-fluid rounded-4'
                                        style={{
                                            boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.35)',
                                        }} 
                                        src="https://img6.thuthuatphanmem.vn/uploads/2022/04/15/hinh-nen-yasuo-true-damage-4k_040638017.jpg" 
                                        alt="Banner" 
                                    />
                                </Col>
                            </React.Fragment>
                        );
                    }
                    
                    return (
                        <Col md={4} key={`product-${product.id}`}>
                            <CardProduct product={product} />
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
}

export default ProductList;