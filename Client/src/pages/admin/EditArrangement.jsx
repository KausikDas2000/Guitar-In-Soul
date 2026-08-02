import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getArrangementById,
    updateArrangement,
} from "../../services/adminService";

const EditArrangement = () => {

    const { id } = useParams();
    const navigate = useNavigate();


    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [genre, setGenre] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [description, setDescription] = useState("");

    const [coverImage, setCoverImage] = useState(null);
    const [notationPdf, setNotationPdf] = useState(null);
    const [audioFile, setAudioFile] = useState(null);

    const [coverPreview, setCoverPreview] = useState("");

    useEffect(() => {
        loadArrangement();
    }, []);

    const loadArrangement = async () => {
        const data = await getArrangementById(id);

        const song = data.arrangement;

        setTitle(song.title);
        setArtist(song.artist);
        setGenre(song.genre);
        setDifficulty(song.difficulty);
        setDescription(song.description);

        setCoverPreview(song.coverImage.url);
    };




    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("title", title);
            formData.append("artist", artist);
            formData.append("genre", genre);
            formData.append("difficulty", difficulty);
            formData.append("description", description);

            if (coverImage) formData.append("coverImage", coverImage);
            if (notationPdf) formData.append("notationPdf", notationPdf);
            if (audioFile) formData.append("audioFile", audioFile);

            await updateArrangement(id, formData);

            alert("Arrangement Updated!");
            navigate("/admin/arrangements");
        } catch (error) {
            console.error(error);
            alert("Failed to update arrangement.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto text-white">

            <h1 className="text-4xl font-bold mb-8">
                Edit Arrangement
            </h1>

            <form
                onSubmit={handleUpdate}
                className="space-y-6"
            >

                <input
                    className="w-full p-4 bg-zinc-900 rounded-xl"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />

                <input
                    className="w-full p-4 bg-zinc-900 rounded-xl"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="Artist"
                />

                <input
                    className="w-full p-4 bg-zinc-900 rounded-xl"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="Genre"
                />

                <input
                    className="w-full p-4 bg-zinc-900 rounded-xl"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    placeholder="Difficulty"
                />

                <textarea
                    className="w-full p-4 bg-zinc-900 rounded-xl"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div>

                    <img
                        src={coverPreview}
                        className="w-56 rounded-xl mb-4"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImage(e.target.files[0])}
                    />

                </div>

                <div>

                    <label>Replace PDF</label>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setNotationPdf(e.target.files[0])}
                    />

                </div>

                <div>

                    <label>Replace Audio</label>

                    <input
                        type="file"
                        accept="audio/*"
                        onChange={(e) => setAudioFile(e.target.files[0])}
                    />

                </div>



                <button
                    type="submit"
                    disabled={loading}
                    className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-3
    ${loading
                            ? "bg-orange-400 cursor-not-allowed"
                            : "bg-orange-500 hover:bg-orange-600"
                        }`}
                >
                    {loading ? (
                        <>
                            <svg
                                className="w-5 h-5 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>

                            Updating...
                        </>
                    ) : (
                        "Update Arrangement"
                    )}
                </button>

            </form>

        </div>
    );
};

export default EditArrangement;