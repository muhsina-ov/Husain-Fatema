import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";

import IntroGate from "../sections/IntroGate";
import Hero from "../sections/Hero";
import InviteMessage from "../sections/InviteMessage";
import CountdownSection from "../sections/CountdownSection";
import Events from "../sections/Events";
import Venue from "../sections/Venue";
import RSVP from "../sections/RSVP";
import Footer from "../sections/Footer";
import ScrollProgress from "../components/ScrollProgress";
import FloatingPetals from "../components/FloatingPetals";
import { weddingBoth, wedding22Nov } from "../config";
import type { WeddingConfig } from "../config";

type Stage = "closed" | "opening" | "open";

export default function Home({ version = "both" }: { version?: "both" | "22nov" }) {
  const [stage, setStage] = useState<Stage>("closed");

  const is22Nov =
    version === "22nov" ||
    (typeof window !== "undefined" &&
      (window.location.search.includes("version=22nov") ||
        window.location.search.includes("reception") ||
        window.location.pathname.includes("22-nov") ||
        window.location.pathname.includes("reception")));

  const activeConfig: WeddingConfig = is22Nov ? wedding22Nov : weddingBoth;

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    let id = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = stage === "open" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  return (
    <main className="relative min-h-[100dvh] bg-[#f3ede3] text-[#1a1814]">
      <ScrollProgress />
      {stage === "open" && <FloatingPetals count={16} />}

      <motion.div
        initial={{ scale: 1.04, opacity: 0.92 }}
        animate={{
          scale: stage === "closed" ? 1.04 : 1,
          opacity: 1,
        }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero config={activeConfig} />
        <InviteMessage config={activeConfig} />
        {activeConfig.sections?.countdown !== false && (
          <CountdownSection config={activeConfig} />
        )}
        {activeConfig.sections?.events !== false && (
          <Events config={activeConfig} />
        )}
        {activeConfig.sections?.venue !== false && (
          <Venue config={activeConfig} />
        )}
        {activeConfig.sections?.rsvp !== false && (
          <RSVP config={activeConfig} />
        )}
        <Footer config={activeConfig} />
      </motion.div>

      {/* Intro Gate with Paper Curtain */}
      <AnimatePresence>
        {stage !== "open" && (
          <IntroGate
            config={activeConfig}
            onOpening={() => setStage("opening")}
            onOpened={() => setStage("open")}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
