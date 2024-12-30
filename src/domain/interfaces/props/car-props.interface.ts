import { Plate } from '../../value-objects/plate.vo';

export interface CarProps {
  brand: string;
  model: string;
  plate: Plate;
  year: number;
  km: number;
  dailyRate: number;
  status?: boolean;
}
