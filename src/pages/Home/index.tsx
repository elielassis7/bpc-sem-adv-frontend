import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4">
        {/* Conteúdo do body */}
      </main>
      <Footer />
    </div>

  )
}