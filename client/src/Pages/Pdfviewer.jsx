import React, { useState } from 'react'
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Pdfviewer = ({pdfurl}) => {
    const[numpages,setnumpages]=useState(null);
    const[zoom,setzoom]=useState(1);
    const zoomIn=()=>{
        setzoom(prev=>Math.min(prev+0.1,2));
    }
    const zoomOut=()=>{
        setzoom(prev=>Math.max(prev-0.1,0.5));
    }
    const resetZoom=()=>{
        setzoom(1);
    }

  return (
    
    <div className="w-full bg-gray-100 p-4 rounded-lg">
<div className="flex justify-center items-center gap-3 mb-6">

                <button
                    onClick={zoomOut}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                    −
                </button>

                <span className="font-semibold">
                    {Math.round(zoom * 100)}%
                </span>

                <button
                    onClick={zoomIn}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                    +
                </button>

                <button
                    onClick={resetZoom}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Reset
                </button>

            </div>

        <Document
        file={pdfurl}
        onLoadSuccess={({numPages})=>setnumpages(numPages)}
        loading={<p>Loading PDF...</p>}
        error={<p>Unable to load PDF</p>}
        >
            {Array.from(new Array(numpages),(_,index)=>(
                <div key={index} className='mb-6'>
                    <p className="text-center mb-2 font-semibold">
                        Page{index+1} of{numpages}
                    </p>
                    <div className='flex justify-center'>
                        <Page
                        pageNumber={index+1}
                        width={700*zoom}
                        />

                    </div>

                </div>
            ))}

        </Document>
      
    </div>
  )
}

export default Pdfviewer
