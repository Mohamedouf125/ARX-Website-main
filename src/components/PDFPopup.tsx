"use client";
import React, { useEffect } from "react";
import { X, Download, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

interface PDFPopupProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  projectTitle: string;
}

export const PDFPopup: React.FC<PDFPopupProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  projectTitle,
}) => {
  const t = useTranslations("pdfPopup");

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl max-h-[90vh] w-full mx-4 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#DBA426]/10 rounded-lg">
              <FileText className="w-5 h-5 text-[#DBA426]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {projectTitle}
              </h3>
              <p className="text-sm text-gray-600">{t("projectBrochure")}</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 h-full overflow-auto">
          {pdfUrl ? (
            <div className="space-y-4">
              {/* PDF Viewer */}
              <div className="w-full h-[70vh] border border-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full"
                  title={`${projectTitle} PDF`}
                />
              </div>

              {/* Download Button */}
              <div className="flex justify-center">
                <a
                  href={pdfUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#DBA426] hover:bg-[#DBA426]/90 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <Download className="w-4 h-4" />
                  {t("downloadPdf")}
                </a>
              </div>
            </div>
          ) : (
            /* Coming Soon State */
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="p-4 bg-gray-100 rounded-full mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {t("comingSoon")}
              </h4>
              <p className="text-gray-600 max-w-md">
                {t("comingSoonDescription", { projectTitle })}
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-[#DBA426] hover:bg-[#DBA426]/90 text-white font-medium rounded-lg transition-colors duration-200"
              >
                {t("close")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
