"use client"

import { useState } from "react"
import { Typography } from "antd"
import VideoPanel from "@/components/video-panel"
import VideoPicker from "@/components/video-picker"
import KeypointsPanel from "@/components/keypoints-panel"
import ChatPanel from "@/components/chat-panel"

export default function Page() {
  const [video, setVideo] = useState<{ name?: string; description?: string; url?: string }>({})

  return (
    <div className="flex flex-row justify-start items-start min-h-screen bg-gray-100 space-x-4 p-4">
      {/* Left Column - Video & Keypoints */}
    
      <div className="flex flex-col w-full">
        <div className="bg-white p-10 rounded-lg h-[97vh]">
          <div className="mb-4">
            <VideoPicker onVideoSelect={setVideo} />
          </div>
          <VideoPanel url={video.url} name={video.name} description={video.description} />
          <KeypointsPanel />
        </div>
      </div>

      {/* Divider */}
      <div className="bg-red-500 w-[4px]"></div>

      {/* Right Column - Chat */}
      <div className="flex flex-col w-full">
        <div className="bg-white p-6 rounded-lg h-[97vh] flex flex-col">
          <Typography.Title level={4} style={{ margin: "0 0 16px 0" }}>
            QA / Chat
          </Typography.Title>
          <div className="flex-1" style={{ minHeight: 0 }}>
            <ChatPanel />
          </div>
        </div>
      </div>

    </div>
  )
}