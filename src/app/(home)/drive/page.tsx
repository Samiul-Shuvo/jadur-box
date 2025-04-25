import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { MUTATIONS, QUERIES } from "~/server/db/queries";
import { CloudUpload, Sparkles } from "lucide-react";

export default async function DrivePage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  const rootFolder = await QUERIES.getRootFolderForUser(session.userId);

  if (!rootFolder) {
    return (
      <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center animate-fade-in">
        <h1 className="mb-4 flex items-center justify-center gap-3 text-4xl font-bold text-white md:text-5xl">
          Welcome to 
          <span className="flex items-center">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Jadur Box
            </span>
            <CloudUpload className="ml-2 h-8 w-8 text-indigo-400" />
          </span>
        </h1>
        <p className="mb-6 max-w-xl text-lg text-neutral-400">
          Your magical cloud storage awaits. Let's create your personal drive to securely store and access your files anytime, anywhere.
        </p>

        <form
          action={async () => {
            "use server";
            const session = await auth();

            if (!session.userId) {
              return redirect("/sign-in");
            }

            const rootFolderId = await MUTATIONS.onboardUser(session.userId);

            return redirect(`/f/${rootFolderId}`);
          }}
        >
          <Button
            type="submit"
            size="lg"
            className="group relative inline-flex items-center gap-2 rounded-xl border border-purple-700 bg-purple-800 px-6 py-4 text-white transition-all duration-300 hover:scale-105 hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]"
          >
            <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            Create My Drive Now
          </Button>
        </form>
      </main>
    );
  }

  return redirect(`/f/${rootFolder.id}`);
}