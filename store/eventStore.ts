import { EventInsert } from "@/types";
import { create } from "zustand";

export type EventState = {
  events: EventInsert[];
  setEvents: (events: EventInsert[]) => void;
  addEvent: (event: EventInsert) => void;
};

export const useEventStore = create<EventState>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
}));
