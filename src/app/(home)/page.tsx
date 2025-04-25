import { auth } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center px-4 py-20 text-center animate-fade-in">
        <h1 className="mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-5xl font-extrabold text-transparent transition-transform duration-500 hover:scale-105 hover:drop-shadow-[0_0_0.75rem_rgba(216,180,254,0.8)] md:text-7xl">
          Jadur Box ✨
        </h1>

        <p className="mx-auto mb-6 max-w-2xl text-lg text-neutral-400 md:text-xl animate-fade-in delay-200">
          Your magical space in the cloud –{" "}
          <span className="italic">store, access, and share your files</span> anytime, anywhere.
        </p>

        <blockquote className="mb-10 max-w-xl text-base italic text-neutral-500 animate-fade-in delay-300">
          “Technology is best when it brings people together.” – Matt Mullenweg
        </blockquote>

        <form
          action={async () => {
            "use server";

            const session = await auth();

            if (!session.userId) {
              return redirect("/sign-in");
            }

            return redirect("/drive");
          }}
        >
          <button
            type="submit"
            className="group relative inline-flex items-center rounded-xl border border-purple-700 bg-purple-800 px-8 py-4 text-lg font-semibold text-white transition duration-300 hover:scale-105 hover:bg-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"
          >
            Get Started for Free
            <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={18} />
          </button>
        </form>
      </main>

      <footer className="w-full  px-4 py-12 text-center text-sm text-neutral-400 animate-fade-in delay-500">
        <div className="mx-auto w-full max-w-screen-xl px-4">
          <p className="mb-4 leading-relaxed">
            Built with ❤️ for dreamers, creators, and doers.
            <br />
            <span className="text-neutral-500">
              Jadur Box is your digital vault — simple, secure, and lightning fast.
            </span>
          </p>
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Jadur Box. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}