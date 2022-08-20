export interface DeleteProduct {
  delete(productId: string): Promise<boolean>;
}
