import MessageInput from "@/components/MessageInput";
import ShorthandManager from "@/components/ShorthandManager";

export default function AppView() {
  return (
    <main className="app-view w-[100vw] h-[100vh] flex flex-row items-center justify-center bg-gray-100">
      <section className="shorthand-feature-container flex flex-col items-start justify-between gap-4">
        <h1 className="leading-snug text-xl font-semibold text-gray-900">{"Shorthand Feature 🪄"}</h1>
        <ShorthandManager />
        <MessageInput />
      </section>
    </main>
  )
}