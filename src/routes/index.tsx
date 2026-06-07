import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Portfolio } from "@/components/site/Portfolio";
import { Services } from "@/components/site/Services";
import { Philosophy } from "@/components/site/Philosophy";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import { Journal } from "@/components/site/Journal";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier Studio — Fotografía, Arte y Narrativa Visual" },
      {
        name: "description",
        content:
          "Estudio premium de fotografía: moda, retrato, gastronomía, conciertos, bodas, publicidad y dirección audiovisual. Cada imagen, una obra única.",
      },
      { property: "og:title", content: "Atelier Studio — Fotografía, Arte y Narrativa Visual" },
      { property: "og:description", content: "Fotografía editorial, moda, conciertos, gastronomía y producción audiovisual." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap",
      },
      { rel: "canonical", href: "/" },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <main>
      <Nav />
      <Hero />
      <Marquee />
      <Portfolio />
      <Services />
      <Stats />
      <Philosophy />
      <Testimonials />
      <Journal />
      <Contact />
      <Footer />
    </main>
  );
}
