import { Conversation } from "@/components/conversation";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="z-10 flex w-full max-w-5xl flex-col items-center justify-center">
        <h1 className="mb-12 text-center text-4xl font-bold">
          Kim from Goodmind.
        </h1>
        <Conversation/>
      </div>
    </main>
  );
}
