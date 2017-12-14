'use strict';
import * as Router from 'koa-router';
import {ProductsAPIRoutes} from './product.routes';
import {UsersAPIRoutes} from './user.routes';
import {AuthRoutes} from './auth.routes';
import {AttributesAPIRoutes} from './attribute.routes';
import {AttributeValuesAPIRoutes} from './attributeValues.routes';
import {ProductSKUsAPIRoutes} from './productSKU.routes';
import {ProductTypeAPIRoutes} from './productType.routes'
const router = new Router();

router.use('/api/auth', AuthRoutes.routes());
router.use('/api/products', ProductsAPIRoutes.routes());
router.use('/api/users', UsersAPIRoutes.routes());
router.use('/api/attributes', AttributesAPIRoutes.routes());
router.use('/api/attribute_values', AttributeValuesAPIRoutes.routes());
router.use('/api/products_sku', ProductSKUsAPIRoutes.routes());
router.use('/api/product_types', ProductTypeAPIRoutes.routes());

export const APIRoutes = router;
