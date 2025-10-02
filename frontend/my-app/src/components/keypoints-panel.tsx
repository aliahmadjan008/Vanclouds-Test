import { useState } from "react"
import { Tabs, List, Tag, Typography, Button, Modal, Form, Input } from "antd"
import { SendOutlined } from "@ant-design/icons"

type Note = {
  time: string
  title: string
  description: string
}

function NotesList({ data }: { data: Note[] }) {
  return (
    <List
      itemLayout="vertical"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={
              <div className="bg-white border border-gray-100 rounded-md px-4 py-3 shadow-sm">
                <div className="mb-2">
                  <Tag color="blue">{item.time}</Tag>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-lg font-bold">{item.title}</span>
                  <span className="text-sm text-gray-600">{item.description}</span>
                </div>
              </div>
            }
          />
        </List.Item>
      )}
    />
  )
}

function EmptyState({ 
  title, 
  description, 
  buttonText, 
  onButtonClick 
}: { 
  title: string
  description: string
  buttonText?: string
  onButtonClick?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center" style={{ height: "300px" }}>
      <SendOutlined style={{ fontSize: 64, color: "#1890ff", marginBottom: 24 }} />
      <Typography.Title level={4} style={{ marginBottom: 16 }}>
        {title}
      </Typography.Title>
      <Typography.Text type="secondary" style={{ textAlign: "center", marginBottom: 24, maxWidth: 400 }}>
        {description}
      </Typography.Text>
      {buttonText && onButtonClick && (
        <Button type="primary" size="large" onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  )
}

export default function KeypointsPanel() {
  const [keypoints, setKeypoints] = useState<Note[]>([])
  const [myNotes, setMyNotes] = useState<Note[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
   const [activeTab, setActiveTab] = useState<"all" | "mine">("all")

  const [form] = Form.useForm()

  const handleGenerateKeypoints = () => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      setKeypoints([
        {
          time: "00:00:15",
          title: "Slow German Practice",
          description: "Prefers slow German for better thinking and avoiding mistakes.",
        },
        {
          time: "00:01:38",
          title: "Sparkling Water Preference",
          description: "In Germany it's common to drink carbonated water; speaker prefers it.",
        },
        {
          time: "00:03:28",
          title: 'Understanding "Fit"',
          description: "Fitin German can mean healthy, unlike the English usage about fitness.",
        },
        {
          time: "00:04:12",
          title: "Common Mistakes",
          description: "Speaker highlights common errors learners make.",
        },
        {
          time: "00:06:45",
          title: "Learning Speed",
          description: "Discusses why learning slow is sometimes better.",
        },
      ])
      setIsGenerating(false)
    }, 2000)
  }

  const handleAddNote = () => {
    form.validateFields().then((values) => {
      setMyNotes([...myNotes, values])
      form.resetFields()
      setIsModalOpen(false)
    })
  }

  return (
    <section
      aria-label="Keypoints and notes"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="flex border-b border-gray-200 mb-3">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "all"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          AI Keypoints
        </button>
        <button
          onClick={() => setActiveTab("mine")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "mine"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          My Notes
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1">
        {activeTab === "all" && (
          <div className="h-[300px] overflow-y-auto pr-2">
            {keypoints.length > 0 ? (
              <NotesList data={keypoints} />
            ) : (
              <EmptyState
                    title="Ready to Generate Keypoints"
                    description="We'll analyze your video content and create smart timestamps to help you navigate through key moments."
                    buttonText={isGenerating ? "Generating..." : "Generate Keypoints"}
                    onButtonClick={handleGenerateKeypoints}
                  />
              // <div className="p-6 text-center text-gray-600 border border-dashed border-gray-300 rounded-md">
              //   <p className="font-semibold">Ready to Generate Keypoints</p>
              //   <p className="text-sm mb-4">
              //     We'll analyze your video content and create smart timestamps to help you
              //     navigate through key moments.
              //   </p>
              //   <Button
              //     type="primary"
              //     onClick={handleGenerateKeypoints}
              //     disabled={isGenerating}
              //   >
              //     {isGenerating ? "Generating..." : "Generate Keypoints"}
              //   </Button>
              // </div>
            )}
          </div>
        )}

        {activeTab === "mine" && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <Typography.Title level={5} className="!mb-0">
                Personal Video Notes
              </Typography.Title>
              <Button type="default" onClick={() => setIsModalOpen(true)}>
                + Add Note
              </Button>
            </div>

            <div className="h-[300px] overflow-y-auto pr-2">
              {myNotes.length > 0 ? (
                <NotesList data={myNotes} />
              ) : (
                <div className="p-6 text-center text-orange-600 border border-dashed border-orange-200 rounded-md">
                  <p className="font-semibold">No notes yet</p>
                  <p className="text-sm">
                    Create timestamps to mark important moments in the video
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Modal
        title="Add Note"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddNote}
        okText="Save"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="time"
            label="Time"
            rules={[{ required: true, message: "Please enter the timestamp" }]}
          >
            <Input placeholder="e.g. 00:02:10" />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Note title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea placeholder="Details about this note" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </section>
  )
}