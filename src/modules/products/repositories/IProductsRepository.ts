import ICreateProductDTO from '../dtos/ICreateProductDTO';

import Product from '../infra/typeorm/entities/Product';

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product | undefined>;
  find(id: string): Promise<Product | undefined>;
  save(product: Product): Promise<Product>;
}

export default IProductsRepository;
