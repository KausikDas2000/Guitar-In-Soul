import { useRef } from "react";
import {
  FaMusic,
  FaTrash,
  FaCloudUploadAlt,
} from "react-icons/fa";

const AudioUpload = ({ audioFile, setAudioFile }) => {
  const inputRef = useRef();

  const handleSelect = (e) => {
    if (e.target.files[0]) {
      setAudioFile(e.target.files[0]);
    }
  };

  const removeAudio = () => {
    setAudioFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-2xl font-bold mb-6">
        Audio Preview
      </h2>

      <div
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-orange-300 hover:border-orange-500 transition rounded-2xl p-10 cursor-pointer bg-orange-50"
      >

        {!audioFile ? (
          <div className="text-center">

            <FaCloudUploadAlt className="text-6xl text-orange-500 mx-auto mb-5" />

            <h3 className="text-xl font-semibold">
              Upload MP3
            </h3>

            <p className="text-gray-500 mt-2">
              Click to browse your audio
            </p>

            <p className="text-gray-400 text-sm mt-3">
              MP3 • WAV • OGG
            </p>

          </div>
        ) : (
          <div className="space-y-5">

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-4">

                <FaMusic className="text-4xl text-orange-500" />

                <div>

                  <h3 className="font-semibold text-lg">
                    {audioFile.name}
                  </h3>

                  <p className="text-green-600 text-sm">
                    ✓ Ready to upload
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeAudio();
                }}
                className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition"
              >
                <FaTrash />
              </button>

            </div>

            <audio
              controls
              className="w-full"
            >
              <source
                src={URL.createObjectURL(audioFile)}
              />
            </audio>

          </div>
        )}

      </div>

      <input
        hidden
        ref={inputRef}
        type="file"
        accept="audio/*"
        onChange={handleSelect}
      />

    </div>
  );
};

export default AudioUpload;