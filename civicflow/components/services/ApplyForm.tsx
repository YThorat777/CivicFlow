"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Service } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";
import { getDocuments, createApplication } from "@/lib/store";
import { CivicDocument } from "@/lib/types";
import { Label, Input, Textarea, Select, FieldError } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import Link from "next/link";

export function ApplyForm({ service }: { service: Service }) {
  const { user } = useAuth();
  const router = useRouter();
  const [documents, setDocuments] = useState<CivicDocument[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setDocuments(getDocuments());
  }, []);

  const relevantDocs = documents.filter((d) =>
    service.requiredDocuments.includes(d.category)
  );

  function updateField(id: string, value: string) {
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  }

  function toggleDoc(id: string) {
    setSelectedDocIds((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  }

  function validate(): boolean {
    const nextErrors: Record<string, string> = {};
    for (const field of service.fields) {
      if (field.required && !formData[field.id]?.trim()) {
        nextErrors[field.id] = "This field is required.";
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate() || !user) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const application = createApplication({
      serviceId: service.id,
      serviceTitle: service.title,
      applicantId: user.id,
      formData,
      attachedDocumentIds: selectedDocIds,
    });

    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => router.push(`/applications/${application.id}`), 700);
  }

  if (submitted) {
    return (
      <Card>
        <CardBody className="flex flex-col items-center gap-2 py-12 text-center">
          <span className="civic-stamp stamp-enter border-sage-dark bg-sage-light text-sage-dark">
            Submitted
          </span>
          <p className="mt-3 font-display text-lg font-semibold text-ink-900">
            Application submitted
          </p>
          <p className="text-sm text-slate">Redirecting to your application…</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Card>
        <CardBody className="space-y-5">
          {service.fields.map((field) => (
            <div key={field.id}>
              <Label htmlFor={field.id} required={field.required}>
                {field.label}
              </Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.id}
                  value={formData[field.id] ?? ""}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  placeholder={field.placeholder}
                />
              ) : field.type === "select" ? (
                <Select
                  id={field.id}
                  value={formData[field.id] ?? ""}
                  onChange={(e) => updateField(field.id, e.target.value)}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Select>
              ) : (
                <Input
                  id={field.id}
                  type={field.type}
                  value={formData[field.id] ?? ""}
                  onChange={(e) => updateField(field.id, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}
              <FieldError>{errors[field.id]}</FieldError>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card className="mt-5">
        <CardBody>
          <h3 className="font-display text-base font-semibold text-ink-900">
            Attach supporting documents
          </h3>
          <p className="mt-1 text-sm text-slate">
            This service typically requires: {service.requiredDocuments.join(", ")}.
          </p>

          {relevantDocs.length === 0 ? (
            <p className="mt-4 rounded-md border border-dashed border-ink-200 bg-ink-50 px-4 py-3 text-sm text-slate">
              You don&apos;t have any matching documents yet.{" "}
              <Link href="/documents" className="font-medium text-signal-dark underline">
                Upload documents
              </Link>{" "}
              before or after submitting — you can attach them later from your
              application timeline.
            </p>
          ) : (
            <ul className="mt-4 space-y-2">
              {relevantDocs.map((doc) => (
                <li key={doc.id}>
                  <label className="flex cursor-pointer items-center gap-3 rounded-md border border-ink-100 px-3 py-2.5 hover:bg-ink-50">
                    <input
                      type="checkbox"
                      checked={selectedDocIds.includes(doc.id)}
                      onChange={() => toggleDoc(doc.id)}
                      className="h-4 w-4 accent-ink-700"
                    />
                    <span className="flex-1 text-sm text-ink-900">{doc.name}</span>
                    <span className="text-xs text-slate">{doc.category}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>

      <div className="mt-6 flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting…" : "Submit application"}
        </Button>
        <Link href="/services" className="text-sm text-slate hover:text-ink-700">
          Cancel
        </Link>
      </div>
    </form>
  );
}
