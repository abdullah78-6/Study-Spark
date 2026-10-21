import React, { useEffect, useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
const major = parseInt(pdfjs.version.split(".")[0], 10);
const workerFile = major >= 4 ? "pdf.worker.min.mjs" : "pdf.worker.min.js";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/${workerFile}`;
const Pdfviewer = ({ pdfurl }) => {
  const [numpages, setnumpages] = useState(0);
  const [zoom, setzoom] = useState(1);
  const [currentpage, setcurrentpage] = useState(1);
  const [loaderror, setloaderror] = useState("");
  const [pagewidth,setpagewidth]=useState(700)
  useEffect(()=>{
    // setnumpages(0)
    setcurrentpage(1)
    setzoom(1)
    setloaderror("");
  },[pdfurl])
  useEffect(()=>{
    const updatewidth=()=>{
      setpagewidth(Math.max(250,Math.min(700,window.innerWidth-64)));
    };
    updatewidth();
    window.addEventListener("resize",updatewidth)
    return ()=>window.removeEventListener("resize",updatewidth);
  },[])
const file = useMemo(() => ({ url: pdfurl }), [pdfurl]);
const zoomIn = () => setzoom((p) => Math.min(+(p + 0.1).toFixed(2), 2));
  const zoomOut = () => setzoom((p) => Math.max(+(p - 0.1).toFixed(2), 0.5));
  const resetZoom = () => setzoom(1);

  const previous = () => setcurrentpage((p) => Math.max(p - 1, 1));
  const next = () => setcurrentpage((p) => Math.min(p + 1, numpages));

  const onLoadSuccess = ({ numPages }) => {
    setnumpages(numPages);
    setcurrentpage(1);
    setloaderror("");
  };

  const onLoadError = (err) => {
    console.error("PDF load error:", err);
    setnumpages(0);
    setloaderror(err?.message || "Unknown error");
  };

  const pageWidth = Math.min(700, window.innerWidth - 64) * zoom;

  const btn = "px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-center items-center gap-3 mb-6">
        <button type="button" onClick={zoomOut} disabled={zoom <= 0.5} className={btn}>−</button>
        <span className="font-semibold">{Math.round(zoom * 100)}%</span>
        <button type="button" onClick={zoomIn} disabled={zoom >= 2} className={btn}>+</button>
        <button type="button" onClick={resetZoom} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Reset
        </button>
      </div>

      <div className="flex justify-center overflow-auto">
        <Document
          key={pdfurl}
          file={file}
          onLoadSuccess={onLoadSuccess}
          onLoadError={onLoadError}
          onSourceError={onLoadError}
          loading={<p>Loading PDF...</p>}
          error={<p className="text-red-600">Unable to load PDF: {loaderror}</p>}
        >
          {numpages > 0 && <Page pageNumber={currentpage} width={pageWidth} />}
        </Document>
      </div>

      {numpages > 0 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button type="button" onClick={previous} disabled={currentpage <= 1} className={btn}>
            Previous
          </button>
          <span>
            Page {currentpage} of {numpages}
          </span>
          <button type="button" onClick={next} disabled={currentpage >= numpages} className={btn}>
            Next
          </button>
        </div>
      )}

      {loaderror && (
        <p className="text-center mt-3 text-sm">
          <a href={pdfurl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
            Open PDF in a new tab
          </a>
        </p>
      )}
    </div>
  );
};

export default Pdfviewer;