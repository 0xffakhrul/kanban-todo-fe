export interface Status {
  id: string;
  name: string;
  userId: string;
  createdAt: string | Date;
}

export interface CreateStatusInput {
  name: string;
}

export interface UpdateStatusInput {
  name?: string;
}

export interface StatusState {
  selectedStatusId: string | null;
  setSelectedStatus: (statusId: string | null) => void;
}
