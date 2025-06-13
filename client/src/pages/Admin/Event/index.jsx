import { DatePicker, Button, Form, message, Input, Tag } from 'antd'
import { useFirestore } from '../../../hooks/useFirestore'
import { db } from '../../../utils/firebase'
import { collection, getDocs, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore' 
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState, useEffect } from 'react'

function EventPage() {
  const [form] = Form.useForm()
  const [keywordForm] = Form.useForm()
  const { addDocData } = useFirestore(db, 'events')
  const [keywords, setKeywords] = useState([])
  const [inputValue, setInputValue] = useState('')

  // Lấy dữ liệu ban đầu từ Firestore
  useEffect(() => {
    // Lấy dữ liệu sự kiện
    const fetchEvent = async () => {
      const querySnapshot = await getDocs(collection(db, 'events'))
      if (!querySnapshot.empty) {
        const eventDoc = querySnapshot.docs.find(doc => doc.id !== 'header')
        if (eventDoc) {
          const data = eventDoc.data()
          form.setFieldsValue({
            endDate: data.endDate ? window.moment(data.endDate, 'YYYY-MM-DD') : null,
            content: data.content || '',
            facebook: data.facebook || '',
            instagram: data.instagram || '',
            tiktok: data.tiktok || '',
            whatsapp: data.whatsapp || '',
            youtube: data.youtube || '',
          })
        }
      }
    }

    // Lấy dữ liệu từ khóa
    const fetchKeywords = async () => {
      const headerDoc = await getDoc(doc(db, 'events', 'header'))
      if (headerDoc.exists()) {
        const data = headerDoc.data()
        setKeywords(data.keywords || [])
      }
    }

    fetchEvent()
    fetchKeywords()
    // eslint-disable-next-line
  }, [])

  const handleInputChange = (e) => setInputValue(e.target.value)
  const handleInputConfirm = () => {
    const value = inputValue.trim()
    if (value && !keywords.includes(value)) {
      setKeywords([...keywords, value])
    }
    setInputValue('')
  }
  const handleClose = (removedTag) => {
    setKeywords(keywords.filter(tag => tag !== removedTag))
  }

  // Lưu thông tin sự kiện
  const onFinishEvent = async (values) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'))
      for (const document of querySnapshot.docs) {
        if (document.id !== 'header') {
          await deleteDoc(doc(db, 'events', document.id))
        }
      }
      await addDocData({
        endDate: values.endDate.format('YYYY-MM-DD'),
        content: values.content,
        facebook: values.facebook || '',
        instagram: values.instagram || '',
        tiktok: values.tiktok || '',
        whatsapp: values.whatsapp || '',
        youtube: values.youtube || '',
        createdAt: new Date().toISOString(),
      })
      message.success('Lưu sự kiện thành công!')
      form.resetFields()
    } catch (err) {
      message.error('Có lỗi xảy ra khi lưu!', err.message)
    }
  }

  // Lưu từ khóa
  const onSaveKeywords = async () => {
    try {
      await setDoc(doc(db, 'events', 'header'), {
        keywords,
        updatedAt: new Date().toISOString(),
      })
      message.success('Lưu từ khóa thành công!')
      setKeywords([])
    } catch (err) {
      message.error('Có lỗi xảy ra khi lưu từ khóa!', err.message)
    }
  }

  return (
    <div className="mx-auto mt-10 p-6 bg-white rounded shadow">
      {/* Form 1: Sự kiện */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinishEvent}
      >
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
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Lưu sự kiện
          </Button>
        </Form.Item>
      </Form>

      {/* Form 2: Từ khóa xu hướng */}
      <Form
        form={keywordForm}
        layout="vertical"
        className="mt-8"
        onFinish={onSaveKeywords}
      >
        <Form.Item label="Từ khóa xu hướng">
          <div>
            {keywords.map(tag => (
              <Tag
                key={tag}
                closable
                onClose={() => handleClose(tag)}
                style={{ marginBottom: 4 }}
              >
                {tag}
              </Tag>
            ))}
            <Input
              style={{ width: 200 }}
              value={inputValue}
              onChange={handleInputChange}
              onPressEnter={handleInputConfirm}
              onBlur={handleInputConfirm}
              placeholder="Nhập từ khóa và Enter"
            />
          </div>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Lưu từ khóa
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EventPage