"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import Sidebar from "@/components/sidebar";
import { QASection } from "../_components/qa-section";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedLogo } from "@/components/animated-logo";

import { TypingAnimation } from "../_components/typing-animation";
import { ChatForm } from "../_components/chat-form/chat-form";

export default function UserPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <AnimatedLogo />
          <h1 className="text-xl font-semibold">HomeHunt AI</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="icon" className="lg:hidden">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-auto">
            <div className="max-w-3xl p-4 mx-auto space-y-8">
              <div className="space-y-4 text-center">
                <motion.h2
                  className="text-2xl font-bold tracking-tight sm:text-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <TypingAnimation text="What kind of apartment are you looking for?" />
                </motion.h2>
                <motion.p
                  className="text-muted-foreground"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Let our AI help you find the perfect apartment in Poland
                </motion.p>
              </div>
              <ChatForm />
              <QASection />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
