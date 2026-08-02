import { useRef } from "react";
import { FaFilePdf, FaTrash, FaUpload } from "react-icons/fa";

const PdfUpload = ({ notationPdf, setNotationPdf }) => {
  const inputRef = useRef();

  const handleSelect = (e) => {
    if (e.target.files[0]) {
      setNotationPdf(e.target.files[0]);
    }
  };

  const removePdf = () => {
    setNotationPdf(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-2xl font-bold mb-6">
        Guitar Notation PDF
      </h2>

      <div
        onClick={() => inputRef.current.click()}
        className="border-2 border-dashed border-red-300 hover:border-red-500 transition rounded-2xl p-10 cursor-pointer bg-red-50"
      >

        {!notationPdf ? (
          <div className="text-center">

            <FaFilePdf className="text-6xl text-red-500 mx-auto mb-5" />

            <h3 className="text-xl font-semibold">
              Upload PDF
            </h3>

            <p className="text-gray-500 mt-2">
              Click to browse your notation
            </p>

          </div>
        ) : (
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <FaFilePdf className="text-5xl text-red-500" />

              <div>

                <h3 className="font-semibold">
                  {notationPdf.name}
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
                removePdf();
              }}
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl"
            >
              <FaTrash />
            </button>

          </div>
        )}

      </div>

      <input
        hidden
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleSelect}
      />

    </div>
  );
};

export default PdfUpload;