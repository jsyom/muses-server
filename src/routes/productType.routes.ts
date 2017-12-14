import * as Router from 'koa-router';
import * as HttpStatus from 'http-status-codes';
import { Product } from '../models/product-models/Product';
import { ProductType } from '../models/product-models/ProductType';
const router = new Router();

// list of all product types
router.get('/', async ctx => {
  try {
    const productTypes = await ProductType.findAll()
    if (productTypes) {
      ctx.status = HttpStatus.OK;
      ctx.body = productTypes;
    }
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || 'Could not query product types'
    }
  }
})

// single product type
router.get('/:typeId', async ctx => {
  try {
    const productType = await ProductType.findById(ctx.params.typeId)
    ctx.status = HttpStatus.OK;
    ctx.body = productType;
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || `Could not query product type id ${ctx.params.typeId}`
    }
  }
})

router.delete('/:typeId', async ctx => {
  try {
    const productType = await ProductType.destroy({
      where: {
        id: ctx.params.typeId
      }
    });

    if (productType) {
      ctx.status = HttpStatus.OK;
      ctx.body = productType
    }

  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || 'Error deleting product type'
    }
  }
})

// get all product that is a certain type
router.get('/products/:typeId', async (ctx, next) => {
  try {
    const productTypes = await Product.findAll({
      order: [['id']],
      where: {
        productTypeId: ctx.params.typeId
      }
    })
    // forgot why await next probbaly take this shit out
    if (!productTypes.length) {
      await next()
    }
    if (productTypes) {
      ctx.status = HttpStatus.OK;
      ctx.body = productTypes
    }
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || `Error finding product type belongs to ${ctx.params.typeId}`
    }
  }
})

router.post('/', async ctx => {
  try {
    const productType = await ProductType.create(ctx.request.body)
    if (productType) {
      ctx.status = HttpStatus.CREATED;
      ctx.body = productType
    }
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || 'Error creating new product type'
    }
  }
})

router.put('/:typeId', async ctx => {
  try {
    const type = await ProductType.findById(ctx.params.productId)
    if (type) {
      const updatedType = await type.update(ctx.request.body);
      ctx.status = HttpStatus.OK;
      ctx.body = updatedType
    }
  } catch (err) {
      ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
      ctx.body = {
        status: 'error',
        message: err.message || 'Could not update this product type'
      }
    }
})

export const ProductTypeAPIRoutes = router;
