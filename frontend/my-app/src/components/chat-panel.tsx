"use client"
import { useState, useEffect, useRef } from "react"
import { List, Input, Button, Typography, Card, Avatar, Spin } from "antd"
import { PlayCircleOutlined, BulbOutlined, BookOutlined, MessageOutlined, UserOutlined, RobotOutlined } from "@ant-design/icons"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  function handleSend() {
    if (!input.trim()) return
    
    const userMessage = input.trim()
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setInput("")
    
    // Show thinking state
    setIsThinking(true)
    
    // Simulate AI response
    setTimeout(() => {
      setIsThinking(false)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Hello! How may I help you?" }
      ])
    }, 1500)
  }

  // Calculate the height to match keypoints panel
  // Use 100% of parent container height
  const chatHeight = "100%"

  // Show welcome screen if no messages
  if (messages.length === 0 && !isThinking) {
    return (
      <div
        className="flex flex-col"
        style={{ height: chatHeight }}
      >
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <Typography.Title level={3} style={{ textAlign: "center", marginBottom: 32 }}>
            Welcome to Your <span style={{ color: "#ff0000" }}>Youtube</span> Learning Assistant!
          </Typography.Title>

          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl mb-8">
            <Card className="text-center" style={{ border: "1px solid #f0f0f0" }}>
              <PlayCircleOutlined style={{ fontSize: 48, color: "#1890ff", marginBottom: 16 }} />
              <Typography.Title level={5}>Video Understanding</Typography.Title>
              <Typography.Text type="secondary">
                Ask questions about any part of the video you don't understand
              </Typography.Text>
            </Card>

            <Card className="text-center" style={{ border: "1px solid #f0f0f0" }}>
              <BulbOutlined style={{ fontSize: 48, color: "#722ed1", marginBottom: 16 }} />
              <Typography.Title level={5}>Deeper Analysis</Typography.Title>
              <Typography.Text type="secondary">
                Get detailed explanations and insights about specific topics
              </Typography.Text>
            </Card>

            <Card className="text-center" style={{ border: "1px solid #f0f0f0" }}>
              <BookOutlined style={{ fontSize: 48, color: "#52c41a", marginBottom: 16 }} />
              <Typography.Title level={5}>Additional Resources</Typography.Title>
              <Typography.Text type="secondary">
                Discover related materials and sources to expand your knowledge
              </Typography.Text>
            </Card>

            <Card className="text-center" style={{ border: "1px solid #f0f0f0" }}>
              <MessageOutlined style={{ fontSize: 48, color: "#fa8c16", marginBottom: 16 }} />
              <Typography.Title level={5}>Interactive Learning</Typography.Title>
              <Typography.Text type="secondary">
                Engage in conversations to clarify concepts and deepen understanding
              </Typography.Text>
            </Card>
          </div>

          <Typography.Text type="secondary" style={{ textAlign: "center", fontSize: 16 }}>
            Start by asking any question about the video content, and I'll help you understand it better!
          </Typography.Text>
        </div>

        {/* Input area - fixed at bottom */}
        <div className="py-3 bg-white px-2 border-t">
          <div className="flex gap-2">
            <Input.TextArea
              aria-label="Type your question"
              placeholder="Type your question here..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              className="flex-1"
            />
            <Button type="primary" onClick={handleSend}>
              Send
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Show chat interface with messages
  return (
    <div
      className="flex flex-col"
      style={{ height: chatHeight }}
    >
      {/* Messages area - scrollable */}
      <div className="flex-1 overflow-y-auto px-2 py-4">
        <List
          dataSource={messages}
          renderItem={(msg) => {
            const isUser = msg.role === "user"
            return (
              <List.Item className="px-0 border-0">
                <div className={`flex w-full gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
                  {!isUser && (
                    <Avatar 
                      icon={<RobotOutlined />} 
                      style={{ backgroundColor: "#1890ff", flexShrink: 0 }}
                    />
                  )}
                  <div
                    className="rounded-md"
                    style={{
                      background: isUser ? "#f5f5f5" : "#e6f7ff",
                      padding: 16,
                      maxWidth: "70%",
                    }}
                  >
                    <Typography.Text style={{ color: "#000000" }}>
                      {msg.content}
                    </Typography.Text>
                  </div>
                  {isUser && (
                    <Avatar 
                      icon={<UserOutlined />} 
                      style={{ backgroundColor: "#87d068", flexShrink: 0 }}
                    />
                  )}
                </div>
              </List.Item>
            )
          }}
        />
        
        {/* Thinking indicator */}
        {isThinking && (
          <div className="flex w-full gap-2 justify-start px-0 py-2">
            <Avatar 
              icon={<RobotOutlined />} 
              style={{ backgroundColor: "#1890ff", flexShrink: 0 }}
            />
            <div
              className="rounded-md"
              style={{
                background: "#e6f7ff",
                padding: 16,
              }}
            >
              <Spin size="small" />
              <Typography.Text style={{ color: "#000000", marginLeft: 8 }}>
                Thinking...
              </Typography.Text>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input area - fixed at bottom */}
      <div className="py-3 bg-white px-2 border-t">
        <div className="flex gap-2">
          <Input.TextArea
            aria-label="Type your question"
            placeholder="Type your question here..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            className="flex-1"
            disabled={isThinking}
          />
          <Button type="primary" onClick={handleSend} disabled={isThinking}>
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}