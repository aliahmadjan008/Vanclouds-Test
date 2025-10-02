import { useState } from "react"
import { Button, Modal, Form, Input, Spin } from "antd"

type VideoPickerProps = {
	onVideoSelect: (video: { name: string; description: string; url: string }) => void
}

export default function VideoPicker({ onVideoSelect }: VideoPickerProps) {
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [form] = Form.useForm()

		const handleOk = async () => {
			try {
				const values = await form.validateFields()
				setLoading(true)
				setTimeout(() => {
					setLoading(false)
					setOpen(false)
					onVideoSelect({
						name: values.videoName,
						description: values.videoDescription,
						url: values.videoUrl,
					})
					form.resetFields()
				}, 1200) // Simulate loading
			} catch {}
		}

	return (
		<>
			<Button type="primary" onClick={() => setOpen(true)}>
				Select Video
			</Button>
			<Modal
				title="Add Video"
				open={open}
				onOk={handleOk}
				onCancel={() => { setOpen(false); form.resetFields() }}
				okText="Confirm"
				confirmLoading={loading}
			>
				<Spin spinning={loading}>
					<Form form={form} layout="vertical">
									<Form.Item name="videoName" label="Video Name" rules={[{ required: true, message: "Please enter video name" }]}> 
										<Input />
									</Form.Item>
									<Form.Item name="videoDescription" label="Video Description" rules={[{ required: false, message: "Please enter video description" }]}> 
										<Input />
									</Form.Item>
									<Form.Item name="videoUrl" label="Video URL" rules={[{ required: true, type: "url", message: "Please enter a valid URL" }]}> 
										<Input />
									</Form.Item>
					</Form>
				</Spin>
			</Modal>
		</>
	)
}
