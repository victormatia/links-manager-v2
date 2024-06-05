import ActSection from "@/components/ActSection";
import CardSpotify from "@/components/CardSpotify";

export default function Home() {
  return (
    <main className="w-11/12 max-w-96 mx-auto mt-5">
      <CardSpotify />
      <ActSection />
    </main>
  )
}