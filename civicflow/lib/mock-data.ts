import { Service, User } from "./types";

export const DEMO_USER: User = {
  id: "user_demo",
  fullName: "Test User",
  email: "test.user@example.com",
  password: "civic123",
  civicId: "CIV-04821",
  address: "Pune, Maharashtra, India",
  memberSince: "2023-11-02T09:00:00.000Z",
};

export const SERVICES: Service[] = [
  {
    id: "svc-identity-renewal",
    title: "National ID Renewal",
    category: "Identity",
    department: "Department of Civil Registry",
    summary: "Renew an expiring or expired national identification card.",
    description:
      "Renew your national ID before or after expiration. Processing includes identity verification against civil registry records and issuance of a new physical card mailed to your address on file.",
    processingTime: "10–14 business days",
    fee: "₹2500.00",
    requiredDocuments: ["Identification", "Proof of Address"],
    fields: [
      { id: "currentIdNumber", label: "Current ID number", type: "text", required: true, placeholder: "e.g. CIV-04821" },
      { id: "reason", label: "Reason for renewal", type: "select", required: true, options: ["Expired", "Expiring soon", "Lost or stolen", "Damaged"] },
      { id: "notes", label: "Additional notes", type: "textarea", required: false, placeholder: "Anything the reviewing officer should know" },
    ],
  },
  {
    id: "svc-housing-assistance",
    title: "Rental Assistance Application",
    category: "Housing",
    department: "Department of Housing & Urban Development",
    summary: "Apply for emergency or ongoing rental subsidy support.",
    description:
      "This program provides partial rental subsidies to eligible households. Applicants must submit proof of income and current lease information for review by a housing caseworker.",
    processingTime: "3–4 weeks",
    fee: "No fee",
    requiredDocuments: ["Proof of Address", "Financial"],
    fields: [
      { id: "monthlyIncome", label: "Monthly household income", type: "text", required: true, placeholder: "₹" },
      { id: "householdSize", label: "Household size", type: "text", required: true },
      { id: "landlordName", label: "Landlord or property manager name", type: "text", required: true },
      { id: "circumstances", label: "Describe your circumstances", type: "textarea", required: true },
    ],
  },
  {
    id: "svc-business-license",
    title: "Small Business License",
    category: "Business",
    department: "Department of Commerce",
    summary: "Register and license a new small business or renew an existing one.",
    description:
      "Obtain the operating license required to legally run a small business within city limits, including zoning confirmation and tax registration number issuance.",
    processingTime: "15–20 business days",
    fee: "₹12000.00",
    requiredDocuments: ["Identification", "Legal"],
    fields: [
      { id: "businessName", label: "Business name", type: "text", required: true },
      { id: "businessType", label: "Business type", type: "select", required: true, options: ["Sole proprietorship", "Partnership", "LLC", "Corporation"] },
      { id: "address", label: "Business address", type: "text", required: true },
      { id: "description", label: "Nature of business", type: "textarea", required: true },
    ],
  },
  {
    id: "svc-health-subsidy",
    title: "Public Health Subsidy Enrollment",
    category: "Health",
    department: "Department of Public Health",
    summary: "Enroll in subsidized healthcare coverage for eligible residents.",
    description:
      "Enroll yourself or a dependent in the public health subsidy program. Eligibility is determined by household income and residency status verified during review.",
    processingTime: "5–7 business days",
    fee: "No fee",
    requiredDocuments: ["Identification", "Financial"],
    fields: [
      { id: "dependents", label: "Number of dependents to enroll", type: "text", required: true },
      { id: "employmentStatus", label: "Employment status", type: "select", required: true, options: ["Employed", "Self-employed", "Unemployed", "Retired", "Student"] },
      { id: "notes", label: "Existing conditions to note (optional)", type: "textarea", required: false },
    ],
  },
  {
    id: "svc-transport-permit",
    title: "Residential Parking Permit",
    category: "Transport",
    department: "Department of Transportation",
    summary: "Request an annual residential street parking permit.",
    description:
      "Residents in permit zones may apply for an annual parking permit. Requires proof of residence and vehicle registration matching the applicant's address.",
    processingTime: "5 business days",
    fee: "₹4000.00",
    requiredDocuments: ["Proof of Address", "Identification"],
    fields: [
      { id: "vehiclePlate", label: "Vehicle plate number", type: "text", required: true },
      { id: "vehicleMake", label: "Vehicle make & model", type: "text", required: true },
      { id: "zone", label: "Permit zone", type: "select", required: true, options: ["Zone A", "Zone B", "Zone C", "Zone D"] },
    ],
  },
  {
    id: "svc-records-request",
    title: "Vital Records Request",
    category: "Records",
    department: "Department of Civil Registry",
    summary: "Request certified copies of birth, marriage, or death certificates.",
    description:
      "Order certified copies of vital records for personal, legal, or administrative use. Requests are verified against registry archives before certified copies are issued.",
    processingTime: "7–10 business days",
    fee: "₹1500.00 per copy",
    requiredDocuments: ["Identification"],
    fields: [
      { id: "recordType", label: "Record type", type: "select", required: true, options: ["Birth certificate", "Marriage certificate", "Death certificate"] },
      { id: "recordHolderName", label: "Full name on record", type: "text", required: true },
      { id: "recordDate", label: "Approximate date of record", type: "date", required: false },
      { id: "copies", label: "Number of certified copies", type: "text", required: true, placeholder: "e.g. 2" },
    ],
  },
];

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((s) => s.id === id);
}
