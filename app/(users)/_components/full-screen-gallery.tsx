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
          <DialogTitle className="absolute z-50 text-lg text-white transform -translate-x-1/2 top-2 left-1/2">
            Gallery Title
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute z-50 top-2 right-2"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute z-50 transform -translate-y-1/2 left-2 top-1/2"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute z-50 transform -translate-y-1/2 right-2 top-1/2"
            onClick={goToNext}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
          <div className="relative w-full h-full">
            <img
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Image ${currentIndex + 1}`}
              className="object-contain w-full h-full"
              loading="lazy"
            />
          </div>
          <div className="absolute px-4 py-2 transform -translate-x-1/2 rounded-full bottom-4 left-1/2 bg-background/80">
            {currentIndex + 1} / {images.length}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
