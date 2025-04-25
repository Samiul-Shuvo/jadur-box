"use client";

import { Upload, ChevronRight, CloudUpload } from "lucide-react";
import { FileRow, FolderRow } from "./file-row";
import type { files_table, folders_table } from "~/server/db/schema";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadthing";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
  parents: (typeof folders_table.$inferSelect)[];

  currentFolderId: number;    
}) {
  const navigate = useRouter();
  const posthog = usePostHog();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1c2c] via-[#302b63] to-[#24243e] p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
          <div className="flex items-center gap-2 mr-2 text-gray-300 hover:text-white">
  
  <span className="ml-2 font-serif">Jadur Box </span>
  <CloudUpload className="h-6 w-6 text-indigo-400" />
</div>
            {props.parents.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`/f/${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}
                </Link>
              </div>
            ))}
          </div>
          <div>
            <SignedOut>
              <SignInButton mode="modal" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>

        <div className="rounded-lg bg-gradient-to-br from-[#302b63] to-[#1f1c2c] shadow-xl">
          <div className="border-b border-gray-700 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-3">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <ul className="divide-y divide-gray-700">
            {props.folders.map((folder) => (
              <FolderRow key={folder.id} folder={folder} />
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} />
            ))}
          </ul>
        </div>

        <div className="mt-6 flex justify-center">
          <UploadButton
            endpoint="driveUploader"
            onBeforeUploadBegin={(files) => {
              posthog.capture("files_uploading", {
                fileCount: files.length,
              });
              return files;
            }}
            onClientUploadComplete={() => {
              navigate.refresh();
            }}
            input={{
              folderId: props.currentFolderId,
            }}
          />
        </div>
      </div>
    </div>
  );
}