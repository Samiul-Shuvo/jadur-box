// src/lib/mock-data.ts

export interface File {
  id: number;
  name: string;
  type: "file";
  url: string;
  parent: number;
  size: number; // size in bytes
  ownerId: string;
  createdAt: Date;
}

export interface Folder {
  id: number;
  name: string;
  type: "folder";
  parent: number | null;
  ownerId: string;
  createdAt: Date;
}

export const mockFolders: Folder[] = [
  { id: 0, name: "root", type: "folder", parent: null, ownerId: "mock-user", createdAt: new Date() },
  { id: 1, name: "Documents", type: "folder", parent: 0, ownerId: "mock-user", createdAt: new Date() },
  { id: 2, name: "Images", type: "folder", parent: 0, ownerId: "mock-user", createdAt: new Date() },
  { id: 3, name: "Work", type: "folder", parent: 0, ownerId: "mock-user", createdAt: new Date() },
  { id: 4, name: "Presentations", type: "folder", parent: 3, ownerId: "mock-user", createdAt: new Date() },
];

export const mockFiles: File[] = [
  {
    id: 5,
    name: "Resume.pdf",
    type: "file",
    url: "/files/resume.pdf",
    parent: 0,
    size: 1200000,
    ownerId: "mock-user",
    createdAt: new Date(),
  },
  {
    id: 6,
    name: "Project Proposal.docx",
    type: "file",
    url: "/files/proposal.docx",
    parent: 1,
    size: 2500000,
    ownerId: "mock-user",
    createdAt: new Date(),
  },
  {
    id: 7,
    name: "Vacation.jpg",
    type: "file",
    url: "/files/vacation.jpg",
    parent: 2,
    size: 3700000,
    ownerId: "mock-user",
    createdAt: new Date(),
  },
  {
    id: 8,
    name: "Profile Picture.png",
    type: "file",
    url: "/files/profile.png",
    parent: 2,
    size: 1800000,
    ownerId: "mock-user",
    createdAt: new Date(),
  },
  {
    id: 9,
    name: "Q4 Report.pptx",
    type: "file",
    url: "/files/q4-report.pptx",
    parent: 4,
    size: 5200000,
    ownerId: "mock-user",
    createdAt: new Date(),
  },
  {
    id: 10,
    name: "Budget.xlsx",
    type: "file",
    url: "/files/budget.xlsx",
    parent: 3,
    size: 1500000,
    ownerId: "mock-user",
    createdAt: new Date(),
  },
];