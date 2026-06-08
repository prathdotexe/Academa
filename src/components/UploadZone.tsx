import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, FileText, Sparkles, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";
import { StatementData } from "../types";

interface UploadZoneProps {
  onParsed: (data: StatementData) => void;
  onUseSample: () => void;
}

export default function UploadZone({ onParsed, onUseSample }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "parsing" | "structuring" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    if (file.type !== "application/pdf") {
      setErrorMessage("Only PDF statement files are supported.");
      setUploadState("error");
      return;
    }

    setFileName(file.name);
    setUploadState("uploading");
    setProgress(15);

    // Read file as base64
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64String = reader.result as string;
        setProgress(40);
        setUploadState("parsing");

        // We make a call to our custom Express backend endpoint /api/parse-pdf
        const response = await fetch("/api/parse-pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileData: base64String,
            fileName: file.name,
          }),
        });

        setProgress(75);
        setUploadState("structuring");

        const result = await response.json();

        if (response.ok && result.success && result.data) {
          setProgress(100);
          setUploadState("success");
          setTimeout(() => {
            onParsed(result.data);
          }, 800);
        } else {
          // Fallback if environment is missing Gemini API key or parsing failed
          if (result.error === "credentials_missing") {
            setErrorMessage("Gemini API Key is not set in AI Studio. Please use the Sample Statement or add GEMINI_API_KEY to AI Studio Secrets.");
          } else {
            setErrorMessage(result.message || "Financial extraction failed. The PDF structure was not recognized.");
          }
          setUploadState("error");
        }
      } catch (err: any) {
        setErrorMessage("Network error, unable to connect to parsing engine server.");
        setUploadState("error");
      }
    };

    reader.onerror = () => {
      setErrorMessage("An error occurred while reading the file.");
      setUploadState("error");
    };

    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto" id="upload-zone-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel p-8 rounded-3xl"
        id="main-upload-panel"
      >
        <div className="text-center mb-8" id="upload-header">
          <div className="inline-flex items-center justify-center p-3 bg-orange-50 text-orange-600 rounded-2xl mb-4" id="upload-icon-box">
            <Sparkles className="w-6 h-6 animate-pulse" id="sparkle-head-icon" />
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-semibold tracking-tight text-slate-900" id="upload-title">
            Magical Statement Parser
          </h2>
          <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto" id="upload-subtitle">
            Upload Lovely Professional University (LPU / LFTS) statement of accounts PDF and instantly build a beautiful, structured analysis of your college finances.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {uploadState === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-2xl p-8 lg:p-12 text-center cursor-pointer transition-all duration-300 ${
                dragActive
                  ? "border-orange-500 bg-orange-50/40"
                  : "border-slate-200 hover:border-slate-300 hover:bg-white/40"
              }`}
              id="dropzone"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf"
                className="hidden"
                id="pdf-input"
              />
              <div className="flex flex-col items-center justify-center space-y-4" id="dropzone-content">
                <div className="p-4 bg-slate-50 text-slate-500 rounded-full border border-slate-100 shadow-xs" id="upload-btn-container">
                  <Upload className="w-6 h-6" id="upload-arrow-icon" />
                </div>
                <div className="space-y-1.5" id="drop-text-content">
                  <p className="font-semibold text-slate-800 text-sm" id="drag-action-text">
                    Drag & drop fee statement PDF
                  </p>
                  <p className="text-xs text-slate-400" id="file-restriction-text">
                    or click to search system files
                  </p>
                </div>
                <div className="pt-2" id="pdf-badge">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-100" id="pdf-badge-wrapper">
                    <FileText className="w-3.5 h-3.5" id="pdf-doc-icon" /> LPU / LFTS Statement Format
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {(uploadState === "uploading" ||
            uploadState === "parsing" ||
            uploadState === "structuring" ||
            uploadState === "success") && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border border-slate-100 bg-white/50 rounded-2xl p-8 text-center space-y-6"
              id="parsing-progress-card"
            >
              <div className="flex justify-center" id="loading-spinner-box">
                <div className="relative flex items-center justify-center w-16 h-16" id="relative-loader">
                  <div className="absolute w-16 h-16 border-4 border-orange-100 rounded-full" id="spinner-track"></div>
                  <div className="absolute w-16 h-16 border-4 border-orange-600 rounded-full border-t-transparent animate-spin" id="spinner-thumb"></div>
                  {uploadState === "success" ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" id="success-icon" />
                  ) : (
                    <FileText className="w-6 h-6 text-orange-600" id="analyzing-file-icon" />
                  )}
                </div>
              </div>

              <div className="space-y-2" id="states-messaging">
                <h3 className="font-semibold text-slate-800" id="progress-state-title">
                  {uploadState === "uploading" && "Reading Statement Data"}
                  {uploadState === "parsing" && "Activating AI Parsing Pipeline"}
                  {uploadState === "structuring" && "Synthesizing Ledger Entries"}
                  {uploadState === "success" && "Ledger Synchronized!"}
                </h3>
                <p className="text-xs text-slate-400 font-mono truncate max-w-sm mx-auto" id="parsed-file-name-indicator">
                  {fileName}
                </p>
                <p className="text-xs text-slate-400" id="processing-pipeline-hint">
                  {uploadState === "parsing" && "Applying advanced OCR and narration tokenization..."}
                  {uploadState === "structuring" && "Applying double-entry classification matrix..."}
                  {uploadState === "success" && "Loading your visual fintech dashboard now..."}
                </p>
              </div>

              {/* Minimal Progress Bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden" id="progress-line-track">
                <motion.div
                  className={`h-full ${uploadState === "success" ? "bg-emerald-500" : "bg-orange-600"}`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                  id="progress-line-thumb"
                />
              </div>
            </motion.div>
          )}

          {uploadState === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="border border-red-100 bg-red-50/20 rounded-2xl p-6 text-center space-y-4"
              id="error-block"
            >
              <div className="flex justify-center" id="error-icon-box">
                <div className="p-3 bg-red-100 text-red-600 rounded-full" id="error-badge">
                  <AlertTriangle className="w-6 h-6" id="danger-triangle-icon" />
                </div>
              </div>
              <div className="space-y-2 animate-bounce" id="error-text-container">
                <h3 className="font-semibold text-slate-800" id="error-title">Extraction Issue</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed" id="error-desc">
                  {errorMessage}
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2" id="error-btn-bar">
                <button
                  type="button"
                  onClick={() => setUploadState("idle")}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors"
                  id="retry-upload-btn"
                >
                  Choose another PDF
                </button>
                <button
                  type="button"
                  onClick={onUseSample}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold transition-colors"
                  id="retry-sample-btn"
                >
                  View Demo With Mock Data
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400" id="demo-bypass-bar">
          <span className="flex items-center gap-1.5" id="safety-disclaimer">
            <HelpCircle className="w-4 h-4 text-slate-400" id="help-circle-icon" /> Your financial files do not leave the workspace container
          </span>
          <button
            type="button"
            onClick={onUseSample}
            className="flex items-center gap-1.5 px-4 py-2 hover:bg-slate-100 text-orange-600 font-semibold rounded-xl transition-all duration-200"
            id="launch-demo-btn"
          >
            No statement PDF? View Demo Workspace <span aria-hidden="true">→</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
