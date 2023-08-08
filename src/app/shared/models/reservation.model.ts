export interface Reservation {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  dateFrom?: string | null;
  dateTo?: string | null;
  hotel: number;
  deletedAt?: Date | null;
}
