"use client";

import {
  Application,
  ApplicationEvent,
  ApplicationStatus,
  CivicDocument,
  Notification,
} from "./types";
import { generateId, generateReferenceCode } from "./utils";
import { DEMO_USER, getServiceById } from "./mock-data";

const KEYS = {
  applications: "civicflow_applications",
  documents: "civicflow_documents",
  notifications: "civicflow_notifications",
  seeded: "civicflow_seeded_v1",
};

function isBrowser() {
  return typeof window !== "undefined";
}

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

// ---- seed data -----------------------------------------------------------

function seedIfNeeded() {
  if (!isBrowser()) return;
  if (window.localStorage.getItem(KEYS.seeded)) return;

  const now = Date.now();
  const daysAgo = (n: number) => new Date(now - n * 86400000).toISOString();

  const doc1: CivicDocument = {
    id: generateId("doc"),
    name: "national-id-front.pdf",
    category: "Identification",
    sizeLabel: "1.2 MB",
    uploadedAt: daysAgo(21),
    ownerId: DEMO_USER.id,
    linkedApplicationIds: [],
  };
  const doc2: CivicDocument = {
    id: generateId("doc"),
    name: "utility-bill-june.pdf",
    category: "Proof of Address",
    sizeLabel: "480 KB",
    uploadedAt: daysAgo(19),
    ownerId: DEMO_USER.id,
    linkedApplicationIds: [],
  };
  const doc3: CivicDocument = {
    id: generateId("doc"),
    name: "pay-slip-may.pdf",
    category: "Financial",
    sizeLabel: "310 KB",
    uploadedAt: daysAgo(12),
    ownerId: DEMO_USER.id,
    linkedApplicationIds: [],
  };

  const app1Timeline: ApplicationEvent[] = [
    { id: generateId("evt"), status: "Submitted", timestamp: daysAgo(18), note: "Application received and queued for review." },
    { id: generateId("evt"), status: "In Review", timestamp: daysAgo(15), note: "Assigned to a civil registry officer." },
    { id: generateId("evt"), status: "Additional Info Requested", timestamp: daysAgo(9), note: "Officer requested a clearer copy of proof of address." },
  ];

  const app2Timeline: ApplicationEvent[] = [
    { id: generateId("evt"), status: "Submitted", timestamp: daysAgo(30), note: "Application received and queued for review." },
    { id: generateId("evt"), status: "In Review", timestamp: daysAgo(27), note: "Under review by housing caseworker." },
    { id: generateId("evt"), status: "Approved", timestamp: daysAgo(6), note: "Subsidy approved for 12-month term." },
  ];

  const app3Timeline: ApplicationEvent[] = [
    { id: generateId("evt"), status: "Submitted", timestamp: daysAgo(3), note: "Application received and queued for review." },
  ];

  const svcRenewal = getServiceById("svc-identity-renewal")!;
  const svcHousing = getServiceById("svc-housing-assistance")!;
  const svcParking = getServiceById("svc-transport-permit")!;

  const app1: Application = {
    id: generateId("app"),
    referenceCode: generateReferenceCode(),
    serviceId: svcRenewal.id,
    serviceTitle: svcRenewal.title,
    applicantId: DEMO_USER.id,
    status: "Additional Info Requested",
    submittedAt: daysAgo(18),
    updatedAt: daysAgo(9),
    formData: { currentIdNumber: "CIV-04821", reason: "Expiring soon", notes: "" },
    attachedDocumentIds: [doc1.id, doc2.id],
    timeline: app1Timeline,
  };

  const app2: Application = {
    id: generateId("app"),
    referenceCode: generateReferenceCode(),
    serviceId: svcHousing.id,
    serviceTitle: svcHousing.title,
    applicantId: DEMO_USER.id,
    status: "Approved",
    submittedAt: daysAgo(30),
    updatedAt: daysAgo(6),
    formData: { monthlyIncome: "₹40,000.00", householdSize: "3", landlordName: "Meridian Properties LLC", circumstances: "Reduced work hours following layoff." },
    attachedDocumentIds: [doc2.id, doc3.id],
    timeline: app2Timeline,
  };

  const app3: Application = {
    id: generateId("app"),
    referenceCode: generateReferenceCode(),
    serviceId: svcParking.id,
    serviceTitle: svcParking.title,
    applicantId: DEMO_USER.id,
    status: "Submitted",
    submittedAt: daysAgo(3),
    updatedAt: daysAgo(3),
    formData: { vehiclePlate: "7GHT291", vehicleMake: "Honda Civic 2019", zone: "Zone B" },
    attachedDocumentIds: [doc1.id],
    timeline: app3Timeline,
  };

  const notifications: Notification[] = [
    {
      id: generateId("ntf"),
      kind: "status",
      title: "Additional info requested",
      body: `Your ${svcRenewal.title} application (${app1.referenceCode}) needs a clearer proof of address.`,
      timestamp: daysAgo(9),
      read: false,
      relatedApplicationId: app1.id,
    },
    {
      id: generateId("ntf"),
      kind: "status",
      title: "Application approved",
      body: `Your ${svcHousing.title} application (${app2.referenceCode}) has been approved.`,
      timestamp: daysAgo(6),
      read: false,
      relatedApplicationId: app2.id,
    },
    {
      id: generateId("ntf"),
      kind: "document",
      title: "Document uploaded",
      body: "pay-slip-may.pdf was added to your document library.",
      timestamp: daysAgo(12),
      read: true,
    },
    {
      id: generateId("ntf"),
      kind: "status",
      title: "Application submitted",
      body: `Your ${svcParking.title} application (${app3.referenceCode}) was received.`,
      timestamp: daysAgo(3),
      read: true,
      relatedApplicationId: app3.id,
    },
    {
      id: generateId("ntf"),
      kind: "system",
      title: "Scheduled maintenance",
      body: "CivicFlow will be briefly unavailable Sunday 2–4 AM for scheduled maintenance.",
      timestamp: daysAgo(1),
      read: true,
    },
  ];

  write(KEYS.documents, [doc1, doc2, doc3]);
  write(KEYS.applications, [app1, app2, app3]);
  write(KEYS.notifications, notifications);
  window.localStorage.setItem(KEYS.seeded, "1");
}

// ---- applications ---------------------------------------------------------

export function getApplications(): Application[] {
  seedIfNeeded();
  return read<Application[]>(KEYS.applications, []);
}

export function getApplicationById(id: string): Application | undefined {
  return getApplications().find((a) => a.id === id);
}

export function createApplication(params: {
  serviceId: string;
  serviceTitle: string;
  applicantId: string;
  formData: Record<string, string>;
  attachedDocumentIds: string[];
}): Application {
  const nowIso = new Date().toISOString();
  const app: Application = {
    id: generateId("app"),
    referenceCode: generateReferenceCode(),
    serviceId: params.serviceId,
    serviceTitle: params.serviceTitle,
    applicantId: params.applicantId,
    status: "Submitted",
    submittedAt: nowIso,
    updatedAt: nowIso,
    formData: params.formData,
    attachedDocumentIds: params.attachedDocumentIds,
    timeline: [
      {
        id: generateId("evt"),
        status: "Submitted",
        timestamp: nowIso,
        note: "Application received and queued for review.",
      },
    ],
  };
  const all = getApplications();
  write(KEYS.applications, [app, ...all]);
  emitStoreChange();

  addNotification({
    kind: "status",
    title: "Application submitted",
    body: `Your ${params.serviceTitle} application (${app.referenceCode}) was received.`,
    relatedApplicationId: app.id,
  });

  return app;
}

export function advanceApplicationStatus(
  applicationId: string,
  status: ApplicationStatus,
  note: string
): Application | undefined {
  const all = getApplications();
  const idx = all.findIndex((a) => a.id === applicationId);
  if (idx === -1) return undefined;
  const nowIso = new Date().toISOString();
  const updated: Application = {
    ...all[idx],
    status,
    updatedAt: nowIso,
    timeline: [
      ...all[idx].timeline,
      { id: generateId("evt"), status, timestamp: nowIso, note },
    ],
  };
  all[idx] = updated;
  write(KEYS.applications, all);
  emitStoreChange();

  addNotification({
    kind: "status",
    title: `Status updated: ${status}`,
    body: `${updated.serviceTitle} (${updated.referenceCode}) — ${note}`,
    relatedApplicationId: updated.id,
  });

  return updated;
}

// ---- documents --------------------------------------------------------

export function getDocuments(): CivicDocument[] {
  seedIfNeeded();
  return read<CivicDocument[]>(KEYS.documents, []);
}

export function addDocument(doc: Omit<CivicDocument, "id" | "uploadedAt">): CivicDocument {
  const full: CivicDocument = {
    ...doc,
    id: generateId("doc"),
    uploadedAt: new Date().toISOString(),
  };
  const all = getDocuments();
  write(KEYS.documents, [full, ...all]);
  emitStoreChange();

  addNotification({
    kind: "document",
    title: "Document uploaded",
    body: `${full.name} was added to your document library.`,
  });

  return full;
}

export function deleteDocument(id: string): void {
  const all = getDocuments().filter((d) => d.id !== id);
  write(KEYS.documents, all);
  emitStoreChange();
}

// ---- notifications ------------------------------------------------------

export function getNotifications(): Notification[] {
  seedIfNeeded();
  return read<Notification[]>(KEYS.notifications, []);
}

export function addNotification(
  n: Omit<Notification, "id" | "timestamp" | "read">
): Notification {
  const full: Notification = {
    ...n,
    id: generateId("ntf"),
    timestamp: new Date().toISOString(),
    read: false,
  };
  const all = getNotifications();
  write(KEYS.notifications, [full, ...all]);
  emitStoreChange();
  return full;
}

export function markNotificationRead(id: string): void {
  const all = getNotifications().map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  write(KEYS.notifications, all);
  emitStoreChange();
}

export function markAllNotificationsRead(): void {
  const all = getNotifications().map((n) => ({ ...n, read: true }));
  write(KEYS.notifications, all);
  emitStoreChange();
}

export function unreadNotificationCount(): number {
  return getNotifications().filter((n) => !n.read).length;
}

export const STORAGE_EVENT = "civicflow_store_change";

export function emitStoreChange() {
  if (isBrowser()) {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }
}
