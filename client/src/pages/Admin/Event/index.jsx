import { DatePicker, Button, Form, message } from 'antd'
import { useFirestore } from '../../../hooks/useFirestore'
import { db } from '../../../utils/firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore' 
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

function EventPage() {
  const [form] = Form.useForm()
  const { addDocData } = useFirestore(db, 'events')

  const onFinish = async (values) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'events'))
      for (const document of querySnapshot.docs) {
        await deleteDoc(doc(db, 'events', document.id))
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

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
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
            Lưu cài đặt
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EventPage