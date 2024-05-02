import Header from "@/components/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Header isConnected={false} />
      <section className="mt-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Bienvenue sur Liiinks !
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Le moyen le plus simple de regrouper tous vos liens en un seul
          endroit. Créez votre page personnalisée avec vos liens sociaux, votre
          site web, votre blog et bien plus encore.
        </p>
        <a
          href="/signup"
          className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          Commencez gratuitement
        </a>
      </section>
    </main>
  );
}
