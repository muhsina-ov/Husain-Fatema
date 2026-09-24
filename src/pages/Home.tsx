import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";

import IntroGate from "../sections/IntroGate";
import Header from "../components/Header";
import Hero from "../sections/Hero";
import InviteMessage from "../sections/InviteMessage";
import CountdownSection from "../sections/CountdownSection";
import EventsSection from "../sections/EventsSection";
import Footer from "../sections/Footer";
import ScrollProgress from "../components/ScrollProgress";
import FloatingPetals from "../components/FloatingPetals";
import { AudioPlayer } from "../components/AudioPlayer";
import Toast from "../components/Toast";
import { wedding } from "../config";

type Stage = "closed" | "opening" | "open";

export default function Home() {
  const [stage, setStage] = useState<Stage>("closed");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2800);
  };

  const handleShare = async () => {
    const shareData = {
      title: wedding.sharing.title,
      text: wedding.sharing.text,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      showToast("Invitation link copied to clipboard!");
    } catch {
      showToast("Link: " + window.location.href);
    }
  };

  const handleHeaderDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/layers/option-b.jpg";
    link.download = "Husain-Fatema-Wedding-Invitation.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Downloading invitation artwork...");
  };

  return (
    <main className="relative min-h-[100dvh] bg-[#F5EFEB] text-[#2A221E] selection:bg-[#B8860B] selection:text-white overflow-x-hidden">
      <ScrollProgress />
      {stage === "open" && <FloatingPetals count={16} />}

      <Header onShare={handleShare} onDownload={handleHeaderDownload} />
      <AudioPlayer />

      <motion.div
        initial={{ scale: 1.03, opacity: 0.95 }}
        animate={{
          scale: stage === "closed" ? 1.03 : 1,
          opacity: 1,
        }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 space-y-8"
      >
        {/* Option B Image Hero Stage */}
        <Hero />

        {/* Bismillah Verse Section */}
        <InviteMessage />

        {/* Live Countdown Section */}
        <CountdownSection />

        {/* DAREES & WEDDING RECEPTION Cards */}
        <EventsSection />

        {/* Footer */}
        <Footer />
      </motion.div>

      {/* Intro Gate Opening Animation */}
      <AnimatePresence>
        {stage !== "open" && (
          <IntroGate
            onOpening={() => setStage("opening")}
            onOpened={() => setStage("open")}
          />
        )}
      </AnimatePresence>

      <Toast message={toastMessage} visible={toastVisible} />
    </main>
  );
}
