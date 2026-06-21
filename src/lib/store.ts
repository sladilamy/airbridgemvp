import { useEffect, useState, useCallback } from "react";

export type Trip = {
  id: string;
  travelerName: string;
  fromCity: string;
  toCity: string;
  date: string; // ISO
  capacityKg: number;
  pricePerKg: number;
  accepts: string[];
  declines: string[];
  verified: ("identity" | "student" | "flight" | "trusted")[];
  note?: string;
  createdAt: number;
};

export type Request = {
  id: string;
  senderName: string;
  itemDescription: string;
  weightKg: number;
  fromCity: string;
  toCity: string;
  byDate: string;
  contact: string;
  createdAt: number;
};

const TRIPS_KEY = "carrybridge.trips.v1";
const REQS_KEY = "carrybridge.requests.v1";

const seedTrips: Trip[] = [
  {
    id: "seed-1",
    travelerName: "Adil M.",
    fromCity: "Almaty",
    toCity: "Milan",
    date: "2026-07-12",
    capacityKg: 8,
    pricePerKg: 12,
    accepts: ["Documents", "Clothing", "Books", "Gifts"],
    declines: ["Liquids", "Dangerous"],
    verified: ["identity", "student", "flight"],
    note: "KazNU → Bocconi. Happy to meet near Almaty-1 or central Milan.",
    createdAt: Date.now() - 1000 * 60 * 60 * 4,
  },
  {
    id: "seed-2",
    travelerName: "Aisha K.",
    fromCity: "Rome",
    toCity: "Astana",
    date: "2026-07-18",
    capacityKg: 5,
    pricePerKg: 15,
    accepts: ["Documents", "Cosmetics", "Small electronics", "Gifts"],
    declines: ["Food", "Liquids"],
    verified: ["identity", "trusted"],
    note: "Trusted Traveler — 14 successful deliveries.",
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
  },
  {
    id: "seed-3",
    travelerName: "Daniyar S.",
    fromCity: "Berlin",
    toCity: "Almaty",
    date: "2026-07-22",
    capacityKg: 10,
    pricePerKg: 10,
    accepts: ["Clothing", "Books", "Gifts", "Documents"],
    declines: ["Dangerous", "Medicines"],
    verified: ["identity", "student"],
    createdAt: Date.now() - 1000 * 60 * 60 * 50,
  },
  {
    id: "seed-4",
    travelerName: "Madina A.",
    fromCity: "Almaty",
    toCity: "Vienna",
    date: "2026-08-02",
    capacityKg: 6,
    pricePerKg: 14,
    accepts: ["Documents", "Cosmetics", "Gifts", "Clothing"],
    declines: ["Food"],
    verified: ["identity", "flight"],
    createdAt: Date.now() - 1000 * 60 * 60 * 72,
  },
  {
    id: "seed-5",
    travelerName: "Timur B.",
    fromCity: "Warsaw",
    toCity: "Astana",
    date: "2026-08-09",
    capacityKg: 12,
    pricePerKg: 9,
    accepts: ["Books", "Clothing", "Documents", "Small electronics"],
    declines: ["Liquids", "Dangerous"],
    verified: ["identity", "student"],
    note: "Studying in Warsaw, flying home for summer.",
    createdAt: Date.now() - 1000 * 60 * 60 * 90,
  },
];

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  useEffect(() => {
    const stored = read<Trip[] | null>(TRIPS_KEY, null);
    if (!stored) {
      write(TRIPS_KEY, seedTrips);
      setTrips(seedTrips);
    } else {
      setTrips(stored);
    }
  }, []);
  const addTrip = useCallback((trip: Omit<Trip, "id" | "createdAt">) => {
    const full: Trip = { ...trip, id: crypto.randomUUID(), createdAt: Date.now() };
    setTrips((prev) => {
      const next = [full, ...prev];
      write(TRIPS_KEY, next);
      return next;
    });
    return full;
  }, []);
  return { trips, addTrip };
}

export function useRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  useEffect(() => {
    setRequests(read<Request[]>(REQS_KEY, []));
  }, []);
  const addRequest = useCallback((req: Omit<Request, "id" | "createdAt">) => {
    const full: Request = { ...req, id: crypto.randomUUID(), createdAt: Date.now() };
    setRequests((prev) => {
      const next = [full, ...prev];
      write(REQS_KEY, next);
      return next;
    });
    return full;
  }, []);
  return { requests, addRequest };
}
