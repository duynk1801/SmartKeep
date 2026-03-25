import { ProductType } from '@/src/constants/enums';

export interface Product {
  id: string;
  name: string;
  parent_id?: string | null;
  is_group?: boolean;
  category?: string;
  product_type: ProductType;
  created_at?: string;
  warranty_details?: WarrantyDetail;
  iot_configs?: IotConfig;
}

export interface WarrantyDetail {
  id?: string;
  product_id?: string;
  serial_number: string;
  purchase_date: string; // ISO string
  warranty_months: number;
}

export interface IotConfig {
  id?: string;
  product_id?: string;
  ip_address: string;
  mac_address?: string;
  add_warranty_info?: boolean;
}
