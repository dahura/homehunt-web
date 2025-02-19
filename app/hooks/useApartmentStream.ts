import { useEffect, useState } from "react";

import { useChatState } from "./useChatStore";

interface Apartment {
  id: number;
  title: string;
  url: string;
  image: string;
  images: string[];
  price: number;
  price_currency: string;
  deposit?: number;
  rent?: number;
  city?: string;
  description?: string;
  rooms?: number;
  country?: string;
  region?: string;
  street_address?: string;
  is_agency: boolean;
  size?: string;
  contact_phone?: string;
  contact_email?: string;
  contact_name?: string;
  features?: string[];
}

interface Message {
  answer: string;
  apartments: Apartment[];
}

export const useApartmentStream = () => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const { state } = useChatState();

  useEffect(() => {
    if (!state?.promptId) return;
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_CORE_BACKEND_URL}/stream-apartments/${state?.promptId}`
    );

    eventSource.onmessage = (event: MessageEvent) => {
      try {
        const data: Message = JSON.parse(event.data);

        // Set the answer only once from the first message
        if (answer === null) {
          setAnswer(data.answer);
        }

        // Update the apartments array with new data
        setApartments(data.apartments);
      } catch (error) {
        console.error("Error parsing SSE message:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("Error with SSE:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [state?.promptId, answer]);

  return { answer, apartments };
};
