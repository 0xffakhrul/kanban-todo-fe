import { create } from "zustand";
import type { StatusState } from "../types/status.types";

export const useStatusStore = create<StatusState>((set) => ({
  selectedStatusId: null,
  setSelectedStatus: (statusId) => set({ selectedStatusId: statusId }),
}));
