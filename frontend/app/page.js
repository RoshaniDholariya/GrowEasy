"use client";

import { useState } from "react";
import { toast } from "sonner";

import UploadBox from "@/components/UploadBox";
import PreviewTable from "@/components/PreviewTable";
import ResultTable from "@/components/ResultTable";
import Loading from "@/components/Loading";

import api from "@/services/api";
import handleApiError from "@/utils/handleApiError";

export default function Home() {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");

  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(null);

  const handleImport = async () => {
    if (!file) {
      toast.error("Please upload a CSV file first.");
      return;
    }

    try {
      setLoading(true);

      // Clear previous results
      setResult(null);
      setStats(null);

      setLoadingStep("Uploading CSV...");

      const formData = new FormData();
      formData.append("file", file);

      await new Promise((resolve) => setTimeout(resolve, 400));

      setLoadingStep("Parsing CSV...");

      await new Promise((resolve) => setTimeout(resolve, 500));

      setLoadingStep("Sending Data to AI...");

      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 120000,
      });

      setLoadingStep("Processing AI Response...");

      await new Promise((resolve) => setTimeout(resolve, 500));

      setLoadingStep("Done");

      setResult({
        imported: response.data.imported,
        skipped: response.data.skipped,
      });

      setStats(response.data.stats);

      toast.success("CSV imported successfully!");
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            AI CSV Importer
          </h1>

          <p className="text-gray-500 mt-2">
            Upload any CSV and let AI convert it into CRM records.
          </p>
        </div>

        {/* Upload */}
        <UploadBox
          file={file}
          setFile={setFile}
          setPreviewData={setPreviewData}
        />

        {/* Preview */}
        <div className="mt-10">
          <PreviewTable previewData={previewData} />
        </div>

        {/* Import Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleImport}
            disabled={!file || loading}
            className={`px-6 py-3 rounded-lg text-white transition ${
              file && !loading
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Importing..." : "Confirm Import"}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-8">
            <Loading loadingStep={loadingStep} />
          </div>
        )}

        {/* Result */}
        <div className="mt-10">
          <ResultTable
            result={result}
            stats={stats}
          />
        </div>

      </div>
    </main>
  );
}