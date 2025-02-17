"use client";

import type React from "react";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface FullScreenGalleryProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export function FullScreenGallery({
  images,
  initialIndex,
  onClose,
}: FullScreenGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  }, [images.length]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      } else if (event.key === "Escape") {
        onClose();
      }
    },
    [goToPrevious, goToNext, onClose]
  );

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[100vw] h-[100vh] p-0"
        onKeyDown={handleKeyDown}
      >
        <DialogHeader className="relative w-full h-full flex items-center justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <DialogTitle className="absolute top-2 left-1/2 transform -translate-x-1/2 z-50 text-white text-lg">
            Gallery Title
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-50"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-50"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-50"
            onClick={goToNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 px-4 py-2 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
