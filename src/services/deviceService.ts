import { supabase } from '@/src/api/supabase';
import type { Product } from '@/src/types';

export const deviceService = {
  async saveDevice(product: Product): Promise<Product> {
    // 1. Insert into products
    const { id, name, parent_id, is_group, category, product_type } = product;
    const { data: savedProduct, error: productError } = await (supabase as any)
      .from('products')
      .insert({
        ...(id && !id.startsWith('mock-') && !id.startsWith('temp-') ? { id } : {}),
        name,
        parent_id,
        is_group,
        category,
        product_type,
      })
      .select()
      .single();

    if (productError) throw productError;

    const finalProduct = { ...product, id: savedProduct.id } as Product;


    // 2. Conditionally insert into iot_configs
    if (product.iot_configs && product.product_type === 'smart_device') {
      const { ip_address, mac_address, add_warranty_info } = product.iot_configs;
      const { data: iotConfig, error: iotError } = await (supabase as any)
        .from('iot_configs')
        .insert({
          product_id: savedProduct.id,
          ip_address,
          mac_address,
          add_warranty_info,
        })
        .select()
        .single();
      
      if (iotError) throw iotError;
      finalProduct.iot_configs = iotConfig;
    }

    // 3. Conditionally insert into warranty_details
    if (product.warranty_details && (product.product_type === 'hardware' || product.iot_configs?.add_warranty_info)) {
      const { serial_number, purchase_date, warranty_months } = product.warranty_details;
      const { data: warrantyDetail, error: warrantyError } = await (supabase as any)
        .from('warranty_details')
        .insert({
          product_id: savedProduct.id,
          serial_number,
          purchase_date,
          warranty_months,
        })
        .select()
        .single();

      if (warrantyError) throw warrantyError;
      finalProduct.warranty_details = warrantyDetail;
    }

    return finalProduct;
  }
};
