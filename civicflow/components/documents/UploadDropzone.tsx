"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { addDocument } from "@/lib/store";
import { DocumentCategory } from "@/lib/types";
import { fileSizeLabel, cx } from "@/lib/utils";
import { Select, Label } from "@/components/ui/Field";
import { useAuth } from "@/context/AuthContext";

const CATEGORIES: DocumentCategory[] = [
  "Identification",
  "Proof of Address",
  "Financial",
  "Legal",
  "Other",
];

export function UploadDropzone() {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [category, setCategory] = useState<DocumentCategory>("Identification");
  const [isUploading, setIsUploading] = useState(false);
  const [justUploaded, setJustUploaded] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0 || !user) return;
    setIsUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 450));

    Array.from(files).forEach((file) => {
      addDocument({
        name: file.name,
        category,
        sizeLabel: fileSizeLabel(file.size),
        ownerId: user.id,
        linkedApplicationIds: [],
      });
    });

    setIsUploading(false);
    setJustUploaded(files.length === 1 ? files[0].name : `${files.length} files`);
    setTimeout(() => setJustUploaded(null), 3000);
    if (inputRef.current) inputRef.current.value = "";
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    handleFiles(e.target.files);
  }

  return (
    <div>
      <div className="mb-3 max-w-xs">
        <Label htmlFor="doc-category">Document category</Label>
        <Select
          id="doc-category"
          value={category}
          onChange={(e) => setCategory(e.target.value as DocumentCategory)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={cx(
          "flex cursor-pointer flex-col items-center justify-center rounded-card border-2 border-dashed px-6 py-10 text-center transition-colors",
          isDragging
            ? "border-signal bg-signal-light/40"
            : "border-ink-200 bg-paper-panel hover:border-ink-400"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={onInputChange}
        />
        <span className="text-2xl" aria-hidden>
          ▤
        </span>
        <p className="mt-2 text-sm font-medium text-ink-900">
          {isUploading
            ? "Uploading…"
            : "Drop files here, or click to browse"}
        </p>
        <p className="mt-1 text-xs text-slate">
          Files are simulated for this demo — no data leaves your browser.
        </p>
        {justUploaded && (
          <p className="mt-3 text-xs font-medium text-sage-dark">
            Uploaded {justUploaded}
          </p>
        )}
      </div>
    </div>
  );
}
