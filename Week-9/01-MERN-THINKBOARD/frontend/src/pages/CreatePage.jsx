import { ArrowLeftIcon } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import api from "../lib/axios"

const CreatePage = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            toast.error("All fields are required")
            return
        }

        setLoading(true)

        try {
            await api.post(`/notes`, {
                title,
                content
            })
            toast.success("Note created successfully!")
            navigate("/")
        } catch (error) {
            console.log("Error creating note", error)
            if (error.response.status === 429) {
                toast.error("Slow down! You're creating notes too fast", {
                    duration: 4000,
                    icon: "💀"
                })
            } else {
                toast.error("Failed to create note!")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <Link to={"/"} className="btn btn-ghost mb-6">
                        <ArrowLeftIcon className="size-5" />
                        Back to Notes
                    </Link>

                    <div className="card bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">Create New Note</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Title */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-md opacity-70 font-semibold">Title</label>
                                    <input
                                        type="text"
                                        placeholder="Note Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full rounded-full px-5 py-3 bg-base-300 border border-base-content/10 focus:outline-none focus:border-primary transition text-sm opacity-70 text-white font-semibold"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-md opacity-70 font-semibold">Content</label>
                                    <textarea
                                        placeholder="Write your note here..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className=" w-full rounded-3xl px-5 py-4 min-h-[140px] bg-base-300 border border-base-content/10 focus:outline-none focus:border-primary transition resize-none opacity-70 text-sm text-white font-semibold"
                                    />
                                </div>

                                {/* Button */}
                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className=" btn btn-primary rounded-full px-8 text-base"
                                    >
                                        {loading ? "Creating..." : "Create Note"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage
