import { StarFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Button, Row, Col } from 'antd'
import ProductCard from '../../components/ui/product-grid/ProductCard'
import { useFirestore } from '../../hooks/useFirestore'
import { db } from '../../utils/firebase'

function ProductDetail() {
    const [selectedColor, setSelectedColor] = useState('Trắng')
    const [selectedStatus, setSelectedStatus] = useState('95% Nobox')
    const [selectedBranch, setSelectedBranch] = useState('Hà Nội')
    const [selectedImage, setSelectedImage] = useState(0)
    const [showScrollbar, setShowScrollbar] = useState(false)
    const { getAllDocs } = useFirestore(db, 'posts')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getAllDocs().then((data) => setPosts(data));
    }, []);

    const colors = [
        { label: 'Trắng', className: '!bg-[#FF9231] !text-white' },
        { label: 'Đen', className: '' },
        { label: 'Hồng', className: '' },
    ]

    const statuses = [
        { label: '95% Nobox', color: 'orange' },
        { label: '95% Fullbox', color: 'green' },
        { label: '99% Nobox', color: 'blue' },
        { label: '99% Fullbox', color: 'cyan' },
    ]

    const branches = [
        { label: 'Hà Nội', zalo: '0333.671.236' },
        { label: 'TP. HCM', zalo: '0123.456.789' },
    ]

    const images = [
        "https://cdn.shopify.com/s/files/1/0357/4516/9545/files/size-and-compatibility_480x480.gif?v=1692178769",
        "https://cdn.shopify.com/s/files/1/0357/4516/9545/files/sony-wf-1000xm5-black_480x480.jpg?v=1692178769",
        "https://cdn.shopify.com/s/files/1/0357/4516/9545/files/sony-wf-1000xm5-white_480x480.jpg?v=1692178769",
        "https://cdn.shopify.com/s/files/1/0357/4516/9545/files/size-and-compatibility_480x480.gif?v=1692178769",
        "https://cdn.shopify.com/s/files/1/0357/4516/9545/files/sony-wf-1000xm5-black_480x480.jpg?v=1692178769",
        "https://cdn.shopify.com/s/files/1/0357/4516/9545/files/sony-wf-1000xm5-white_480x480.jpg?v=1692178769",
        "https://cdn.shopify.com/s/files/1/0357/4516/9545/files/size-and-compatibility_480x480.gif?v=1692178769",
        "https://cdn.shopify.com/s/files/1/0357/4516/9545/files/sony-wf-1000xm5-black_480x480.jpg?v=1692178769",
        "https://cdn.shopify.com/s/files/1/0357/4516/9545/files/sony-wf-1000xm5-white_480x480.jpg?v=1692178769"
    ]

    // Thêm mảng sản phẩm tương tự (mock data)
    const similarProducts = [
        {
            name: "Sony - WF-1000XM5 - Trắng",
            price: "3,590,000",
            oldPrice: "5,390,000",
            discount: "-33%",
            tag: "Tai nghe",
            image: "https://cdn.shopify.com/s/files/1/0357/4516/9545/files/sony-wf-1000xm5-white_480x480.jpg?v=1692178769",
            colors: ["Trắng", "Đen"],
            description: "Chống ồn, Hi-Res Audio, Dynamic Driver X"
        },
        {
            name: "Sony - WF-1000XM5 - Đen",
            price: "3,590,000",
            oldPrice: "5,390,000",
            discount: "-33%",
            tag: "Tai nghe",
            image: "https://cdn.shopify.com/s/files/1/0357/4516/9545/files/sony-wf-1000xm5-black_480x480.jpg?v=1692178769",
            colors: ["Đen"],
            description: "Chống ồn, Hi-Res Audio, Dynamic Driver X"
        },
        {
            name: "Sony - WF-1000XM4 - Đen",
            price: "2,990,000",
            oldPrice: "4,990,000",
            discount: "-40%",
            tag: "Tai nghe",
            image: "https://cdn.shopify.com/s/files/1/0357/4516/9545/files/sony-wf-1000xm4-black_480x480.jpg?v=1692178769",
            colors: ["Đen"],
            description: "Chống ồn, LDAC, Pin 8h, Bluetooth 5.2"
        },
        {
            name: "Sony - WF-1000XM4 - Trắng",
            price: "2,990,000",
            oldPrice: "4,990,000",
            discount: "-40%",
            tag: "Tai nghe",
            image: "https://cdn.shopify.com/s/files/1/0357/4516/9545/files/sony-wf-1000xm4-white_480x480.jpg?v=1692178769",
            colors: ["Trắng"],
            description: "Chống ồn, LDAC, Pin 8h, Bluetooth 5.2"
        }
    ]

    return (
        <div>
            <div className='flex items-center gap-3 mb-4'>
                <h1 style={{
                    fontSize: '21px',
                    fontWeight: '500',
                }}>Tai nghe nhét tai Sony WF-1000XM5</h1>

                <div className='stars'>
                    <StarFilled style={{ color: '#FF9231', fontSize: '12px' }} />
                    <StarFilled style={{ color: '#FF9231', fontSize: '12px' }} />
                    <StarFilled style={{ color: '#FF9231', fontSize: '12px' }} />
                    <StarFilled style={{ color: '#FF9231', fontSize: '12px' }} />
                    <StarFilled style={{ color: '#FF9231', fontSize: '12px' }} />
                </div>
                <span className='text-[13px] text-gray-500'>197 đánh giá</span>
            </div>

            <Row gutter={24}>
                {/* Ảnh sản phẩm + tính năng */}
                <Col xs={24} md={14}>
                    <Row
                        className="border border-[#FF9231] rounded-md p-4 flex w-full "
                        style={{
                            background: 'linear-gradient(90deg, rgba(255, 143, 44, 0.8) 0%, rgba(255, 146, 49, 0.4) 99.85%)',
                        }}
                    >
                        <Col xs={24} md={10} className="h-[300px] bg-gray-100 rounded mb-3 flex flex-col items-center justify-center">
                            <img
                                className="object-cover w-full h-full rounded"
                                src={images[selectedImage]}
                                alt=""
                            />

                        </Col>
                        <Col xs={24} md={14}>
                            <div style={{
                                fontSize: '21px',
                            }} className="font-semibold text-white mb-2 text-center">TÍNH NĂNG NỔI BẬT</div>
                            <ul className="text-[13px] text-white pl-4 space-y-1 list-none">
                                <li className="text-base">Chống ồn cực đỉnh với bộ xử lý HD QN2e cùng miếng đệm tai ôm khít trong khuôn tai</li>
                                <li className="text-base">Bộ màng loa Dynamic Driver X giúp tái tạo âm thanh cho trải nghiệm nghe ấn tượng</li>
                                <li className="text-base">Tận hưởng chất âm như ở phòng thu nhờ công nghệ Hi-Res Audio</li>
                                <li className="text-base">Chức năng theo dõi đầu và điều chỉnh trường âm thanh theo chuyển động của bạn</li>
                            </ul>
                        </Col>
                    </Row>
                    <div
                        className={`flex gap-2 mt-6 product-thumbnails-scrollbar`}
                        style={{
                            overflowX: showScrollbar ? 'auto' : 'hidden',
                            flexWrap: 'nowrap',
                            WebkitOverflowScrolling: 'touch'
                        }}
                        onMouseEnter={() => setShowScrollbar(true)}
                        onMouseLeave={() => setShowScrollbar(false)}
                    >
                        {images.map((img, idx) => (
                            <img
                                key={img}
                                src={img}
                                alt=""
                                className={`w-30 h-30 rounded border-2 cursor-pointer ${selectedImage === idx ? 'border-[#D65312]' : 'border-gray-300'}`}
                                onClick={() => setSelectedImage(idx)}
                            />
                        ))}
                    </div>
                </Col>

                {/* Thông tin giá và lựa chọn */}
                <Col xs={24} md={10}>
                    <div className="flex-1">
                        <div className="flex items-end gap-3 mb-2">
                            <span className="text-[32px] font-bold text-[#E60004] leading-none">3,590,000</span>
                            <span className="text-gray-400 line-through text-lg">5,390,000</span>
                        </div>
                        <div className="mb-2">
                            <div className="font-medium mb-1">Màu sắc</div>
                            <div className="flex gap-2">
                                {colors.map((color) => (
                                    <Button
                                        size='large'
                                        key={color.label}
                                        className={`!rounded-[10px] !px-6 !py-1 !border-2 ${selectedColor === color.label ? '!bg-[#D65312] !text-white !border-[#D65312]' : '!bg-white !text-black !border-[#999999]'}`}
                                        onClick={() => setSelectedColor(color.label)}
                                    >
                                        {color.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className="font-medium mb-1">Tình trạng</div>
                            <div className="flex gap-2">
                                {statuses.map((status) => (
                                    <Button
                                        size='large'
                                        key={status.label}
                                        className={`!rounded-[10px] !px-3 !py-1 text-base !border-2 ${selectedStatus === status.label ? '!bg-[#D65312] !text-white !border-[#D65312]' : '!bg-white !text-black !border-[#999999]'}`}
                                        onClick={() => setSelectedStatus(status.label)}
                                    >
                                        {status.label}
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-2">
                            <div className="font-medium mb-1">Chi nhánh mua hàng</div>
                            <div className="flex gap-2">
                                {branches.map((branch) => (
                                    <Button
                                        key={branch.label}
                                        className={`!rounded-[10px] flex flex-col items-center justify-center !border-2 ${selectedBranch === branch.label
                                            ? '!bg-[#D65312] !text-white !border-[#D65312]'
                                            : '!bg-white !text-black !border-[#999999]'
                                            }`}
                                        style={{
                                            whiteSpace: 'normal',
                                            textAlign: 'center',
                                            padding: '6px 12px',
                                            minWidth: 0,
                                            minHeight: 0,
                                            height: '100%',
                                        }}
                                        onClick={() => setSelectedBranch(branch.label)}
                                    >
                                        <span>{branch.label}</span>
                                        <span className="text-xs">Zalo: {branch.zalo}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <div className="h-16 bg-gray-100 rounded mt-4"></div>
                    </div>
                </Col>
            </Row>

            <h1 className='mt-6'>Sản phẩm tương tự</h1>

            <Row gutter={16} className='mt-4'>
                {similarProducts.map((product, index) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <ProductCard
                            name={product.name}
                            price={product.price}
                            oldPrice={product.oldPrice}
                            discount={product.discount}
                            tag={product.tag}
                            image={product.image}
                            colors={product.colors}
                            description={product.description}
                        />
                    </Col>
                ))}
            </Row>


            <Row gutter={16} className='mt-6'>
                <Col xs={24} md={17}>

                    <div className='bg-white p-4 rounded-md shadow-md'>
                        <div className='bg-gray-200 rounded-sm p-3'>
                            <h1 className='text-orange-300 font-bold !text-base text-center mb-2'>Đặc điểm nổi bật</h1>
                            <p className='be-vietnam-pro-regular'>Lorem ipsum dolor sit amet consectetur. Nisi posuere pretium risus in dignissim.</p>
                            <p className='be-vietnam-pro-regular'>Lorem ipsum dolor sit amet consectetur. Nisi posuere pretium risus in dignissim.</p>
                            <p className='be-vietnam-pro-regular'>Lorem ipsum dolor sit amet consectetur. Nisi posuere pretium risus in dignissim.</p>
                            <p className='be-vietnam-pro-regular'>Lorem ipsum dolor sit amet consectetur. Nisi posuere pretium risus in dignissim.</p>
                        </div>

                        <div className='be-vietnam-pro-bold my-4'>
                            Sony WF-1000XM5 là mẫu tai nghe không dây với ba lựa chọn màu hồng khói, bạc bạch kim và đen sang trọng cũng như màng loa 8.4mm ấn tượng. Tai nghe sở hữu pin dung lượng mang lại thời lượng sử dụng lên đến tối đa 8 tiếng khi tắt chế độ chống ồn.
                        </div>

                        <div>
                            {posts.map((post) => (
                                <div key={post.id} style={{ marginBottom: 32, borderBottom: "1px solid #eee", paddingBottom: 16 }}>
                                    <h1 className='text-2xl'>{post.title}</h1>
                                    <div style={{ color: "#888", fontSize: 14 }}>
                                        {post.createdAt
                                            ? new Date(post.createdAt.seconds * 1000).toLocaleString()
                                            : ""}
                                    </div>
                                    <div
                                        style={{ marginTop: 12 }}
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>

                </Col>
                <Col xs={24} md={7}>
                    <div className='rounded-md shadow-md flex flex-col gap-3'> {/* Thêm p-0 m-0 */}
                        <table className="product-info-table rounded-md w-full text-gray-700 text-sm border-separate m-0" style={{
                            borderSpacing: '0 0px', width: '100%',
                            overflow: 'hidden',
                        }}>
                            <tbody>
                                <tr>
                                    <td className="font-bold !text-base w-1/2 align-top px-4 py-4">Kích thước</td>
                                    <td className="px-4 py-4 !text-base ">Hộp sạc: 64.6 × 40 × 26.5 mm</td>
                                </tr>
                                <tr>
                                    <td className="font-bold !text-base align-top px-4 py-4">Trọng lượng</td>
                                    <td className=" !text-base px-4 py-4">
                                        Tai nghe: 5.9 gram<br />Hộp sạc: 39 gram
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold !text-base align-top px-4 py-4">Công nghệ âm thanh</td>
                                    <td className=" !text-base px-4 py-4">
                                        Hi-Res Audio<br />DSEE Extreme™<br />Âm thanh 360
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold !text-base align-top px-4 py-4">Micro</td>
                                    <td className="px-4 py-4 !text-base ">Có</td>
                                </tr>
                                <tr>
                                    <td className="font-bold !text-base align-top px-4 py-4">Thời lượng sử dụng pin</td>
                                    <td className=" !text-base px-4 py-4">
                                        Tai nghe: 8 giờ (Bật ANC)<br />Hộp sạc: 24 giờ
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold !text-base align-top px-4 py-4">Phương thức điều khiển</td>
                                    <td className="px-4 py-4 !text-base ">Chạm cảm ứng</td>
                                </tr>
                                <tr>
                                    <td className="font-bold !text-base align-top px-4 py-4">Tính năng khác</td>
                                    <td className=" !text-base px-4 py-4">
                                        Chống nước IPX4<br />Theo dõi đầu<br />Chống ồn chủ động
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold !text-base align-top px-4 py-4">Kết nối</td>
                                    <td className="px-4 py-4 !text-base ">Không dây</td>
                                </tr>
                                <tr>
                                    <td className="font-bold !text-base align-top px-4 py-4">Bluetooth</td>
                                    <td className="px-4 py-4 !text-base ">Bluetooth 5.3</td>
                                </tr>
                                <tr>
                                    <td className="font-bold !text-base align-top px-4 py-4">Phạm vi kết nối cho phép</td>
                                    <td className="px-4 py- !text-base 4">10m</td>
                                </tr>
                                <tr>
                                    <td className="font-bold !text-base align-top px-4 py-4">Cổng sạc</td>
                                    <td className="px-4 py-4 !text-base ">Type-C</td>
                                </tr>
                                <tr>
                                    <td className="font-bold !text-base align-top px-4 py-4">Ứng dụng kết nối</td>
                                    <td className="px-4 py-4 !text-base ">Sony | Headphones Connect</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className="mt-6 bg-white p-4 rounded-md">
                        <div className="font-semibold mb-2">Video đánh giá sản phẩm</div>
                        <div className="bg-gray-200 rounded flex items-center justify-center h-28 mb-2">
                            {/* Thay thế bằng iframe Youtube nếu muốn nhúng video thật */}
                            <span className="text-gray-500 text-xs">Giới thiệu tai nghe Sony WF-1000XM5 | Official Video</span>
                        </div>
                    </div>
                </Col>
            </Row>

        </div>
    )
}

export default ProductDetail