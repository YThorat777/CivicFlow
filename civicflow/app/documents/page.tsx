"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { UploadDropzone } from "@/components/documents/UploadDropzone";
import { DocumentRow } from "@/components/documents/DocumentRow";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { getDocuments, deleteDocument, STORAGE_EVENT } from "@/lib/store";
import { CivicDocument } from "@/lib/types";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<CivicDocument[]>([]);

  useEffect(() => {
    const load = () => setDocuments(getDocuments());
    load();
    window.addEventListener(STORAGE_EVENT, load);
    return () => window.removeEventListener(STORAGE_EVENT, load);
  }, []);

  function handleDelete(id: string) {
    deleteDocument(id);
  }

  return (
    <AppShell
      title="Documents"
      description="Upload and manage the files attached to your applications."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="font-display text-lg font-semibold text-ink-900">
                Upload a document
              </h2>
            </CardHeader>
            <CardBody>
              <UploadDropzone />
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="font-display text-lg font-semibold text-ink-900">
                Your document library
              </h2>
              <p className="mt-1 text-sm text-slate">
                {documents.length} document{documents.length === 1 ? "" : "s"} on file
              </p>
            </CardHeader>
            <CardBody className="px-0 py-0">
              {documents.length === 0 ? (
                <p className="px-5 py-10 text-center text-sm text-slate">
                  No documents uploaded yet.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-ink-100 text-xs uppercase tracking-wide text-slate">
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Category</th>
                        <th className="px-4 py-3 font-medium">Size</th>
                        <th className="px-4 py-3 font-medium">Uploaded</th>
                        <th className="px-4 py-3" />
                      </tr>
                    </thead>
                    <tbody>
                      {documents.map((doc) => (
                        <DocumentRow key={doc.id} document={doc} onDelete={handleDelete} />
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
