export interface RoomData {
  id: string;
  name: string;
  deviceCount: number;
  imageEmoji: string;
}

export interface StatData {
  icon: string;
  value: string;
  unit?: string;
  label: string;
}
