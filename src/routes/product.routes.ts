import * as Router from 'koa-router'
import { Product } from '../models/product-models/Product'
import * as HttpStatus from 'http-status-codes'
const router = new Router();

router.get('/', async ctx => {
  try {
    const products = await Product.findAll({
      order: [['id']]
    });
    if (products) {
      ctx.status = HttpStatus.OK;
      ctx.body = products;
    }
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || 'Error Querying Product model'
    }
  }
})

router.get('/:productId', async ctx => {
  try {
    const product = await Product.findById(ctx.params.productId);
    if (product) {
      ctx.status = HttpStatus.OK;
      ctx.body = product;
    }
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || `Error Finding Product ${ctx.params.productId}`
    }
  }
})

router.delete('/:productId', async ctx => {
  try {
    const product = await Product.destroy({where: {
      id: ctx.params.productId
    }});
    ctx.status = HttpStatus.OK;
    ctx.body = product;
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || `Error Removing Product ${ctx.params.productId}`
    }
  }
})

router.post('/', async ctx => {
  try {
    const newProduct = await Product.create(ctx.request.body)
    if (newProduct) {
      ctx.status = HttpStatus.OK;
      ctx.body = newProduct;
    }
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || 'Error Creating New Product'
    }
  }
})

router.put('/:productId', async ctx => {
  try {
    const product = await Product.findById(ctx.params.productId);
    if (product) {
      const updatedProduct = await product.update(ctx.request.body);
      ctx.status = HttpStatus.OK;
      ctx.body = updatedProduct
    }
  } catch (err) {
      ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
      ctx.body = {
        status: 'error',
        message: err.message || `Error Updating Product ${ctx.params.productId}`
      }
    }
})

export const ProductsAPIRoutes = router;
