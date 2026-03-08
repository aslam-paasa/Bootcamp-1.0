import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

const NoteDetailPage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    /* Fetch note */
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch (error) {
                if (error.response?.status === 429) {
                    toast.error("Slow down! Too many requests", {
                        duration: 4000,
                        icon: "💀",
                    });
                } else {
                    console.log("Error fetching note:", error);
                    toast.error("Failed to fetch note");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    /* Delete note */
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted successfully");
            navigate("/");
        } catch (error) {
            console.log("Error deleting note:", error);
            toast.error("Failed to delete note");
        }
    };

    /* Save note */
    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Title and content are required");
            return;
        }

        setSaving(true);

        try {
            await api.put(`/notes/${id}`, note);
            toast.success("Note updated successfully");
            navigate("/")
        } catch (error) {
            console.log("Error updating note:", error);
            toast.error("Failed to update note");
        } finally {
            setSaving(false);
        }
    };

    /* Loader */
    if (loading || !note) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <LoaderIcon className="animate-spin size-10" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <Link to="/" className="btn btn-ghost">
                            <ArrowLeftIcon className="size-5" />
                            Back to Notes
                        </Link>

                        <button onClick={handleDelete} className="btn btn-error btn-outline">
                            <Trash2Icon className="size-5" />
                            Delete
                        </button>
                    </div>

                    {/* Card */}
                    <div className="card bg-base-100 shadow-lg">
                        <div className="card-body space-y-6">

                            {/* Title */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold opacity-70">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={note.title}
                                    onChange={(e) =>
                                        setNote({ ...note, title: e.target.value })
                                    }
                                    className=" w-full rounded-full px-5 py-3 bg-base-300 border border-base-content/10 focus:outline-none focus:border-primary text-base-content font-semibold"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold opacity-70">
                                    Content
                                </label>
                                <textarea
                                    value={note.content}
                                    onChange={(e) =>
                                        setNote({ ...note, content: e.target.value })
                                    }
                                    className=" w-full rounded-3xl px-5 py-4 min-h-[160px] bg-base-300 border border-base-content/10 focus:outline-none focus:border-primary resize-none text-base-content font-semibold"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="btn btn-primary rounded-full px-8"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NoteDetailPage;
