import { DatePicker, Button, Form, message, Select } from 'antd'
import { db } from '../../../utils/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect } from 'react'
import moment from 'moment'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

function EventPage() {
  const [form] = Form.useForm()

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }
  const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
  }

  useEffect(() => {
    const fetchEvent = async () => {
      const homeDocRef = doc(db, 'home', 'home')
      const homeDocSnap = await getDoc(homeDocRef)
      if (homeDocSnap.exists()) {
        const data = homeDocSnap.data()
        form.setFieldsValue({
          endDate: data.endDate ? moment(data.endDate, 'YYYY-MM-DD') : null,
          content: data.content || '',
          facebook: data.facebook || '',
          instagram: data.instagram || '',
          tiktok: data.tiktok || '',
          whatsapp: data.whatsapp || '',
          youtube: data.youtube || '',
          trendingKeywords: data.trendingKeywords || [],
          slideBanners: data.slideBanners || [],
          banner1: data.banner1 || '',
          banner1Top: data.banner1Top || '',
          banner2Top: data.banner2Top || '',
          banner2: data.banner2 || '',
          banner: data.banner || '',
          banner3: data.banner3 || '',
        })
      }
    }

    fetchEvent()
    // eslint-disable-next-line
  }, [])

  // Lưu thông tin sự kiện
  const onFinishEvent = async (values) => {
    try {
      const homeDocRef = doc(db, 'home', 'home')
      // Format lại endDate nếu có
      const dataToSave = {
        ...values,
        endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : '',
        createdAt: new Date().toISOString(),
      }
      await setDoc(homeDocRef, dataToSave)
      message.success('Lưu sự cài đặt thành công!')
    } catch (err) {
      message.error('Có lỗi xảy ra khi lưu!', err.message)
    }
  }

  return (
    <div className="mx-auto mt-10 p-6 bg-white rounded shadow">
      <Form
        {...layout}
        form={form}
        name="event-form"
        onFinish={onFinishEvent}
        style={{ maxWidth: 700 }}
        labelAlign="left" // căn trái label
      >
        {/* Từ khóa xu hướng */}
        <div className="text-xl text-orange-500 mb-2 font-bold text-left">Từ khóa xu hướng</div>
        <Form.Item
          label="Từ khóa xu hướng"
          name="trendingKeywords"
          rules={[{ required: true, message: 'Nhập ít nhất 1 từ khóa!' }]}
        >
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Nhập từ khóa và nhấn Enter"
            tokenSeparators={[',']}
          />
        </Form.Item>

        {/* Banner chạy ảnh */}
        <div className="text-xl text-orange-500 mt-6 mb-2 font-bold text-left">Banner chạy ảnh</div>
        <Form.List name="slideBanners">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Form.Item
                  required={false}
                  key={key}
                  style={{ marginBottom: 8 }}
                >
                  <Form.Item
                    {...restField}
                    name={name}
                    rules={[{ type: 'url', message: 'Nhập đúng định dạng URL!' }]}
                    noStyle
                  >
                    <input
                      className="ant-input w-[80%] mr-2"
                      placeholder="Nhập link banner chạy ảnh"
                    />
                  </Form.Item>
                  {fields.length > 1 && (
                    <MinusCircleOutlined
                      className="ml-2 text-red-500"
                      onClick={() => remove(name)}
                    />
                  )}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: '100%' }}
                >
                  Thêm link banner chạy ảnh
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Sự kiện trang */}
        <div className="text-xl text-orange-500 mt-6 mb-2 font-bold text-left">Sự kiện trang</div>
        <Form.Item
          label="Ngày kết thúc"
          name="endDate"
          rules={[{ required: true, message: 'Chọn ngày kết thúc!' }]}
        >
          <DatePicker className="w-full" format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          label="Nội dung sự kiện"
          name="content"
          rules={[{ required: true, message: 'Nhập nội dung sự kiện!' }]}
        >
          <ReactQuill theme="snow" style={{ height: 200, marginBottom: 40 }} />
        </Form.Item>

        {/* Banner 1 */}
        <div className="text-xl text-orange-500 mt-6 mb-2 font-bold text-left">Banner 1</div>
        <Form.Item
          label="Link Banner 1"
          name="banner1"
          rules={[{ type: 'url', message: 'Nhập đúng định dạng URL!' }]}
        >
          <input className="ant-input w-full" placeholder="Link Banner 1" />
        </Form.Item>

        {/* Banner 1 sản phẩm top bán chạy */}
        <div className="text-xl text-orange-500 mt-6 mb-2 font-bold text-left">Banner 1 sản phẩm top bán chạy</div>
        <Form.Item
          label="Link Banner 1 Top bán chạy"
          name="banner1Top"
          rules={[{ type: 'url', message: 'Nhập đúng định dạng URL!' }]}
        >
          <input className="ant-input w-full" placeholder="Link Banner 1 Top bán chạy" />
        </Form.Item>

        {/* Banner 2 sản phẩm top bán chạy */}
        <div className="text-xl text-orange-500 mt-6 mb-2 font-bold text-left">Banner 2 Sản phẩm top bán chạy</div>
        <Form.Item
          label="Link Banner 2 Top bán chạy"
          name="banner2Top"
          rules={[{ type: 'url', message: 'Nhập đúng định dạng URL!' }]}
        >
          <input className="ant-input w-full" placeholder="Link Banner 2 Top bán chạy" />
        </Form.Item>

        {/* Banner 2 */}
        <div className="text-xl text-orange-500 mt-6 mb-2 font-bold text-left">Banner 2</div>
        <Form.Item
          label="Link Banner 2"
          name="banner2"
          rules={[{ type: 'url', message: 'Nhập đúng định dạng URL!' }]}
        >
          <input className="ant-input w-full" placeholder="Link Banner 2" />
        </Form.Item>

        {/* Banner */}
        <div className="text-xl text-orange-500 mt-6 mb-2 font-bold text-left">Banner</div>
        <Form.Item
          label="Link Banner"
          name="banner"
          rules={[{ type: 'url', message: 'Nhập đúng định dạng URL!' }]}
        >
          <input className="ant-input w-full" placeholder="Link Banner" />
        </Form.Item>

        {/* Banner 3 */}
        <div className="text-xl text-orange-500 mt-6 mb-2 font-bold text-left">Banner 3</div>
        <Form.Item
          label="Link Banner 3"
          name="banner3"
          rules={[{ type: 'url', message: 'Nhập đúng định dạng URL!' }]}
        >
          <input className="ant-input w-full" placeholder="Link Banner 3" />
        </Form.Item>

        {/* Liên kết mạng xã hội */}
        <div className="text-xl text-orange-500 mt-6 mb-2 font-bold text-left">Liên kết mạng xã hội</div>
        <Form.Item
          label="Facebook"
          name="facebook"
          rules={[{ type: 'url', message: 'Nhập đúng định dạng URL!' }]}
        >
          <input className="ant-input w-full" placeholder="Link Facebook" />
        </Form.Item>
        <Form.Item
          label="Instagram"
          name="instagram"
          rules={[{ type: 'url', message: 'Nhập đúng định dạng URL!' }]}
        >
          <input className="ant-input w-full" placeholder="Link Instagram" />
        </Form.Item>
        <Form.Item
          label="TikTok"
          name="tiktok"
          rules={[{ type: 'url', message: 'Nhập đúng định dạng URL!' }]}
        >
          <input className="ant-input w-full" placeholder="Link TikTok" />
        </Form.Item>
        <Form.Item
          label="WhatsApp"
          name="whatsapp"
          rules={[{ type: 'url', message: 'Nhập đúng định dạng URL!' }]}
        >
          <input className="ant-input w-full" placeholder="Link WhatsApp" />
        </Form.Item>
        <Form.Item
          label="YouTube"
          name="youtube"
          rules={[{ type: 'url', message: 'Nhập đúng định dạng URL!' }]}
        >
          <input className="ant-input w-full" placeholder="Link YouTube" />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className="w-full">
            Lưu sự kiện
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EventPage