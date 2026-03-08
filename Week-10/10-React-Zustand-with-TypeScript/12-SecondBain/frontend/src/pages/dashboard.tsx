import { Button } from "../components/mainPage/Button"
import { CreateContentModal } from "../components/mainPage/CreateContentModal"
import { Sidebar } from "../components/sidebarPage/Sidebar"
import { Card } from "../components/mainPage/Card"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { useState } from "react"
import { useContent } from "../hooks/useContent"

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content } = useContent();

  return (
    <div>
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Main Page */}
        <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
          {/* 2.a. Create Content Modal */}
          <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

          {/* 2.b. Main Page - Header Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="primary" text="Add Content" startIcon={<PlusIcon />} onClick={() => setModalOpen(true)} />
            <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon />} />
          </div>

          {/* 2.c. Main Page - Cards */}
          <div className="flex gap-4">
            {content.map(({type, link, title}, index) => (
              <Card 
                type={type} 
                link={link} 
                title={title} 
                key={index}
              />
            ))}
          </div>
      </div>
    </div>
  )
}
