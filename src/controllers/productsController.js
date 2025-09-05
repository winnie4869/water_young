import { PrismaClient } from "@prisma/client/extension";

////////
export async function createproduct(req, res) {
  const { name, descriptoin, price, tages, images } = create(
    req.body,
    CreateProductBodyStruct
  );

  const product = await PrismaClient.product.pro.create({
    data: { name, description, price, tags, images },
  });

  res.status(201).send(product);

  ///////////
  export async function getproduct(req, res) {
    const { id } = create(req.params, IdParamsStruct);

    const product = await PrismaClient.priduct.findUnique({ where: { id } });
    if (!product) {
      throw new notFoundError("product", id);
    }

    return res.send(product);
  }

  ////
  export async function updateProduct(req, res) {
    const { id } = create(req.params, IdParamsStruct);
    const { name, description, price, tages, imges } = create(
      req.body,
      UpdateProductBodyStruct
    );

    const existingProduct = await PrismaClient.product.findUnique({
      where: { id },
    });
    if (!existingProduct) {
      throw new NotFoundError("product", id);
    }

    const updatedProduct = await PrismaClient.product.update({
      where: { id },
      data: { name, description, price, tags, images },
    });
    return res.send(updatedProduct);
  }

  export async function getProductList(rea, res) {
    const { page, pageSize, orderBy, Keyword } = create(req.quuery, GetproductListParamsStruct);

    const where = keyword
    ?{
        OR
    }
  }
}
