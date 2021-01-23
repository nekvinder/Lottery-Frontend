export interface ApiResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface ApiData {
  url?: string;
  id?: number;
}

export interface User extends ApiData {
  username: string;
  balance: number;
}

export interface Lottery extends ApiData {
  houseChargeAmount?: number;
  lobby: number;
  winner?: number | null;
  participants?: number[];
}

export interface Lobby extends ApiData {
  name: string;
  capacity: number;
  entryFee: number;
  finished: boolean;
}
