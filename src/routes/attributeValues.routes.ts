import * as Router from 'koa-router';
import * as HttpStatus from 'http-status-codes';
import {AttributeValue} from '../models/product-models/AttributeValue';
const router = new Router();

router.get('/', async ctx => {
  try {
    const attributeValues = await AttributeValue.findAll({
      order: [['id']]
    });
    if (attributeValues.length) {
      ctx.status = HttpStatus.OK;
      ctx.body = attributeValues;
    }
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || 'Error getting attributeValue models'
    };
  }
});

router.get('/:attributeValueId', async ctx => {
  try {
    const singleAttributeValue = await AttributeValue.findById(ctx.params.attributeValueId);
    if (singleAttributeValue) {
      ctx.status = HttpStatus.OK;
      ctx.body = singleAttributeValue;
    }
  } catch (err) {
    ctx.status = HttpStatus.NOT_FOUND;
    ctx.body = {
      status: 'error',
      message: err.message || `Error Not Find attributeValue ${ctx.params.attributeValueId}`
    };
  }
});

router.post('/', async ctx => {
  try {
    const newAttributeValue = await AttributeValue.create(ctx.request.body);
    if (newAttributeValue) {
      ctx.status = HttpStatus.CREATED;
      ctx.body = newAttributeValue
    }
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || 'Error Creating New AttributeValue'
    };
  }
});

router.put('/:attributeValueId', async ctx => {
  try {
    const attributeValue = await AttributeValue.findById(ctx.params.attributeId)
    if (attributeValue) {
      const updatedAttributeValue = await attributeValue.update(ctx.request.body);
      ctx.status = HttpStatus.OK;
      ctx.body = updatedAttributeValue
    }
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || `Error Updating AttributeValue ${ctx.params.attributeId}`
    };
  }
})

router.delete('/:attributeValueId', async ctx => {
  try {
    const attribute = await AttributeValue.destroy({where: {
      id: ctx.params.attributeValueId
    }});
    ctx.status = HttpStatus.OK;
    ctx.body = attribute;
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || `Error Deleting AttributeValue ${ctx.params.attributeId}`
    };
  }
})

export const AttributeValuesAPIRoutes = router;
