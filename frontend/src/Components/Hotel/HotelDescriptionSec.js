import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function HotelDescriptionSec({ hotel }) {
    const [numPages, setNumPages] = useState(null);
    const [pageWidth, setPageWidth] = useState(900);

    useEffect(() => {
        const updateWidth = () => {
            const width = Math.min(window.innerWidth - 40, 1000);
            setPageWidth(width);
        };

        updateWidth();

        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    if (!hotel || !hotel.description) return null;

    const pdfUrl = `${process.env.REACT_APP_BASE_URL}/api/hotel-pdf/${hotel.description}`;

    console.log(pdfUrl);

    function onDocumentLoadSuccess(pdf) {
        setNumPages(pdf.numPages);
    }

    return (
        <section className="my-8 flex justify-center">
            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<div>Đang tải PDF...</div>}
                error={<div>Không thể tải PDF.</div>}
            >
                {numPages &&
                    Array.from({ length: numPages }, (_, index) => (
                        <div key={index} style={{ marginBottom: 30 }}>
                            <Page
                                pageNumber={index + 1}
                                width={pageWidth}
                            />
                        </div>
                    ))}
            </Document>
        </section>
    );
}

export default HotelDescriptionSec;