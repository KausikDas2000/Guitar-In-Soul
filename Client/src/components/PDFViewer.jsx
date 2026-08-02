import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState();
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1.2);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

      <h2 className="text-3xl font-bold mb-8">
        📄 Guitar Notation
      </h2>

      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <Page
          pageNumber={page}
          scale={scale}
        />
      </Document>

      <div className="flex justify-between mt-8">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          ◀ Previous
        </button>

        <span>
          Page {page} / {numPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= numPages}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Next ▶
        </button>

      </div>

      <div className="flex gap-4 mt-6">

        <button
          onClick={() => setScale(scale + 0.2)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Zoom +
        </button>

        <button
          onClick={() => setScale(Math.max(0.6, scale - 0.2))}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Zoom -
        </button>

        <a
          href={pdfUrl.replace("/upload/", "/upload/fl_attachment/")}
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          📥 Download PDF
        </a>

      </div>

    </div>
  );
};

export default PDFViewer;