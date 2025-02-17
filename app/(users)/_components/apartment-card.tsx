"use client";

import type React from "react";

import { useState } from "react";
import { Building2, Heart, Mail, MapPin, Phone, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/utils";
import type { Apartment } from "@/types/apartment";
import { FullScreenGallery } from "./full-screen-gallery";

interface ApartmentCardProps {
  apartment: Apartment;
}

export function ApartmentCard({ apartment }: ApartmentCardProps) {
  const [fullScreenGalleryIndex, setFullScreenGalleryIndex] = useState<
    number | null
  >(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the full-screen gallery
    setIsFavorite(!isFavorite);
    // Here you would typically also update this status in your backend or local storage
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {Array.isArray(apartment.images) &&
              apartment.images.map((image, index) => (
                <CarouselItem key={apartment.id + index}>
                  <div
                    className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg cursor-pointer group"
                    onClick={() => setFullScreenGalleryIndex(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${apartment.title} - Image ${index + 1}`}
                      className="object-cover w-full h-full"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute transition-opacity opacity-0 top-2 right-2 bg-background/80 group-hover:opacity-100"
                      onClick={toggleFavorite}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          isFavorite
                            ? "fill-primary text-primary"
                            : "text-foreground"
                        }`}
                      />
                    </Button>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
        <Badge
          variant={apartment.is_agency ? "secondary" : "default"}
          className="absolute z-10 top-2 left-2"
        >
          {apartment.is_agency ? "Agency" : "Private"}
        </Badge>
      </div>

      <CardHeader>
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-4">
          <div>
            <CardTitle className="text-lg sm:text-xl line-clamp-2">
              {apartment.title}
            </CardTitle>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <MapPin className="flex-shrink-0 w-4 h-4 mr-1" />
              <span className="truncate">
                {[apartment.street_address, apartment.city, apartment.region]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          </div>
          <div className="text-lg font-bold sm:text-xl whitespace-nowrap">
            {formatPrice(apartment.price)}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Building2 className="flex-shrink-0 w-4 h-4 mr-1" />
            {apartment.rooms} {apartment.rooms === 1 ? "room" : "rooms"}
          </div>
          <div>{apartment.size}</div>
          {apartment.deposit && (
            <div>Deposit: {formatPrice(apartment.deposit)}</div>
          )}
          {apartment.rent && <div>Rent: {formatPrice(apartment.rent)}</div>}
        </div>

        <div className="text-sm text-muted-foreground line-clamp-3">
          {apartment.description}
        </div>

        {apartment.features && (
          <div className="flex flex-wrap gap-2">
            {apartment.features.slice(0, 5).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {apartment.features.length > 5 && (
              <Badge variant="secondary" className="text-xs">
                +{apartment.features.length - 5} more
              </Badge>
            )}
          </div>
        )}

        <div className="pt-4 mt-4 border-t">
          <div className="mb-2 text-sm font-medium">Contact Information</div>
          <div className="grid gap-2 text-sm">
            {apartment.contact_name && (
              <div className="flex items-center">
                <User className="flex-shrink-0 w-4 h-4 mr-2" />
                <span className="truncate">{apartment.contact_name}</span>
              </div>
            )}
            {apartment.contact_phone && (
              <Button
                variant="outline"
                className="justify-start h-auto py-2"
                asChild
              >
                <a
                  href={`tel:${apartment.contact_phone}`}
                  className="flex items-center"
                >
                  <Phone className="flex-shrink-0 w-4 h-4 mr-2" />
                  <span className="truncate">{apartment.contact_phone}</span>
                </a>
              </Button>
            )}
            {apartment.contact_email && (
              <Button
                variant="outline"
                className="justify-start h-auto py-2"
                asChild
              >
                <a
                  href={`mailto:${apartment.contact_email}`}
                  className="flex items-center"
                >
                  <Mail className="flex-shrink-0 w-4 h-4 mr-2" />
                  <span className="truncate">{apartment.contact_email}</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      {fullScreenGalleryIndex !== null && (
        <FullScreenGallery
          images={apartment.images}
          initialIndex={fullScreenGalleryIndex}
          onClose={() => setFullScreenGalleryIndex(null)}
        />
      )}
    </Card>
  );
}
