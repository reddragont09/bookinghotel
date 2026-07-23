import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useTranslation } from "react-i18next";

pdfjs.GlobalWorkerOptions.workerSrc =
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function HotelDescription({ hotel }) {
    const { i18n } = useTranslation();

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

    let pdfName = hotel.description;
    if (i18n.language == 'zh') {
        if (hotel.description_zh) {
            pdfName = hotel.description_zh;
        }
    } else if (i18n.language == 'ko') {
        if (hotel.description_ko) {
            pdfName = hotel.description_ko;
        }
    } else if (i18n.language == 'vi') {
        if (hotel.description_vi) {
            pdfName = hotel.description_vi;
        }
    }

    const pdfUrl = `${process.env.REACT_APP_BASE_URL}/api/hotel-pdf/${pdfName}`;

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

export default HotelDescription;