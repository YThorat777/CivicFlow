export type ServiceCategory =
  | "Identity"
  | "Housing"
  | "Business"
  | "Health"
  | "Transport"
  | "Records";

export interface ServiceField {
  id: string;
  label: string;
  type: "text" | "textarea" | "date" | "select";
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export interface Service {
  id: string;
  title: string;
  category: ServiceCategory;
  department: string;
  summary: string;
  description: string;
  processingTime: string;
  fee: string;
  requiredDocuments: string[];
  fields: ServiceField[];
}

export type ApplicationStatus =
  | "Submitted"
  | "In Review"
  | "Additional Info Requested"
  | "Approved"
  | "Denied";

export interface ApplicationEvent {
  id: string;
  status: ApplicationStatus;
  timestamp: string;
  note: string;
}

export interface Application {
  id: string;
  referenceCode: string;
  serviceId: string;
  serviceTitle: string;
  applicantId: string;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  formData: Record<string, string>;
  attachedDocumentIds: string[];
  timeline: ApplicationEvent[];
}

export type DocumentCategory =
  | "Identification"
  | "Proof of Address"
  | "Financial"
  | "Legal"
  | "Other";

export interface CivicDocument {
  id: string;
  name: string;
  category: DocumentCategory;
  sizeLabel: string;
  uploadedAt: string;
  ownerId: string;
  linkedApplicationIds: string[];
}

export type NotificationKind = "status" | "document" | "system" | "reminder";

export interface Notification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  relatedApplicationId?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  civicId: string;
  address: string;
  memberSince: string;
}
