"use client";

import type React from "react";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ApartmentCard } from "./apartment-card";

import { AskForm } from "./ask-form/ask-form";
import { useApartmentStream } from "@/app/hooks/useApartmentStream";

import { useChatState } from "@/app/hooks/useChatStore";

export function QASection() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const { answer, apartments } = useApartmentStream();

  const { state } = useChatState();

  if (!apartments || apartments.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4 border rounded-lg"
    >
      <div
        className="flex items-center justify-between p-4 cursor-pointer bg-muted/50"
        onClick={toggleExpand}
      >
        <h3 className="text-lg font-semibold">{state?.prompt}</h3>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-muted-foreground"
              >
                {answer}
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-4 max-h-[600px] overflow-y-auto pr-4"
              >
                {Array.isArray(apartments) &&
                  apartments.map((apartment, index) => (
                    <motion.div
                      key={apartment.id + index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
                    >
                      <ApartmentCard apartment={apartment} />
                    </motion.div>
                  ))}
              </motion.div>
              <AskForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
