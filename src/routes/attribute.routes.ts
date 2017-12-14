import * as Router from 'koa-router';
import {Attribute} from '../models/product-models/Attribute';
import * as HttpStatus from 'http-status-codes'
const router = new Router();

router.get('/', async ctx => {
  try {
    const attributes = await Attribute.findAll({
      order: [['id']]
    });
    if (attributes) {
      ctx.status = HttpStatus.OK;
      ctx.body = attributes;
    }
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || 'Error getting attribute models'
    };
  }
});

router.get('/:attributeId', async ctx => {
  try {
    const singleAttribute = await Attribute.findById(ctx.params.attributeId);
    if (singleAttribute) {
      ctx.status = HttpStatus.OK;
      ctx.body = singleAttribute;
    }
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || `Could Not Find Attribute ${ctx.params.attributeId}`
    };
  }
});

router.post('/', async ctx => {
  // console.log('POST route')
  try {
    const newAttribute = await Attribute.create(ctx.request.body);
    if (newAttribute) {
      ctx.status = HttpStatus.CREATED;
      ctx.body = newAttribute
    }
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || 'Error Creating New Attribute'
    };
  }
});

router.put('/:attributeId', async ctx => {
  try {
    const attribute = await Attribute.findById(ctx.params.attributeId)
    if (attribute) {
      const updatedAttribute = await attribute.update(ctx.request.body);
      ctx.status = HttpStatus.OK;
      ctx.body = updatedAttribute;
    }
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || `Error Updating Attribute ${ctx.params.attributeId}`
    };
  }
})

router.delete('/:attributeId', async ctx => {
  try {
    const attribute = await Attribute.destroy({where: {
      id: ctx.params.attributeId
    }});
    ctx.status = HttpStatus.OK;
    ctx.body = attribute;
  } catch (err) {
    ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body = {
      status: 'error',
      message: err.message || `Error Deleting Attribute ${ctx.params.attributeId}`
    };
  }
})

export const AttributesAPIRoutes = router;
