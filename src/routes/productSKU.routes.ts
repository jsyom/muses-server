import * as Router from 'koa-router';
import {ProductSKU} from '../models/product-models/ProductSKU';
const router = new Router();

router.get('/', async ctx => {
  try {
    const productSKUs = await ProductSKU.findAll({
      order: [['id']]
    });
    if (productSKUs.length) {
      ctx.status = 200;
      ctx.body = productSKUs;
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'No productSKU models found'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Error getting productSKU models'
    };
  }
});

router.get('/:productSKUId', async ctx => {
  try {
    const singleProductSKU = await ProductSKU.findById(ctx.params.productSKUId);
    if (singleProductSKU) {
      ctx.status = 200;
      ctx.body = singleProductSKU
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: `Could not find productSKU by Id ${ctx.params.productSKUId}`
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || `Could not find productSKU by Id ${ctx.params.productSKUId}`
    }
  }
});

router.post('/', async ctx => {
  try {
    const newProductSKU = await ProductSKU.build(ctx.request.body);
    if (newProductSKU) {
      newProductSKU.save()
      ctx.status = 201;
      ctx.body = newProductSKU
    } else {
      ctx.body = {
        status: 'error',
        message: 'Could not create new ProductSKU'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Error creating new ProductSKU'
    };
  }
});

router.put('/:productSKUID', async ctx => {
  try {
    const productSKU = await ProductSKU.findById(ctx.params.productSKUID)
    if (productSKU) {
      const updatedProductSKU = await productSKU.update(ctx.request.body);
      ctx.body = updatedProductSKU
    } else {
      ctx.body = {
        status: 'error',
        message: 'Could not create new ProductSKU'
      };
    }
  } catch (err) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: err.message || 'some message'
      }
  }
});

router.delete('/:productSKUID', async ctx => {
  try {
    const productSKU = await ProductSKU.destroy({
      where: {
        id: ctx.params.productSKUID
      }
    })
    ctx.body = {
      message: 'successfully destroyed'
    }
  } catch (err) {
    console.log(err)
  }
})

export const ProductSKUsAPIRoutes = router;
