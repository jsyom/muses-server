import { db } from '../../models';
import {Product} from '../../models/product-models/Product';

export const ProductsSeeder = () => db.sequelize.Promise.map([
  {
    productTypeId: 4,
    name: 'Cocktail 1',
    description: 'Stoli Vodka, Lychee, Lemon, Cranberry Juice, Orange Juice',
    isActive: true
  },
  {
    productTypeId: 4,
    name: 'Cocktail 2',
    description: 'Stoli Vodka, Lychee, Lemon, Cranberry Juice, Orange Juice',
    isActive: false
  },
  {
    productTypeId: 4,
    name: 'Cocktail 3',
    description: 'Stoli Vodka, Lychee, Lemon, Cranberry Juice, Orange Juice',
    isActive: true
  },
  {
    productTypeId: 4,
    name: 'Cocktail 4',
    description: 'Stoli Vodka, Lychee, Lemon, Cranberry Juice, Orange Juice',
    isActive: true
  },
  {
    productTypeId: 5,
    name: 'Heineken',
    description: null,
    isActive: true
  },
  {
    productTypeId: 5,
    name: 'Bud Light',
    description: null,
    isActive: true
  },
  {
    productTypeId: 5,
    name: 'Cools Light',
    description: null,
    isActive: true
  },
  {
    productTypeId: 5,
    name: 'Amstel Light',
    description: null,
    isActive: true
  },
  {
    productTypeId: 5,
    name: 'Blue Moon',
    description: null,
    isActive: true
  },
  {
    productTypeId: 5,
    name: 'Corona',
    description: null,
    isActive: true
  },
  {
    productTypeId: 5,
    name: 'Stella',
    description: null,
    isActive: true
  },
  {
    productTypeId: 5,
    name: 'Sapporo',
    description: null,
    isActive: true
  },
  {
    productTypeId: 5,
    name: 'Asahi',
    description: null,
    isActive: true
  },
  {
    productTypeId: 6,
    name: 'Chamisul Fresh',
    description: null,
    isActive: true
  },
  {
    productTypeId: 6,
    name: 'Soju Cocktail',
    description: 'Lychee, Yogurt, Strawberry, Mango, Lemon, Peach, Apple',
    isActive: true
  },
  {
    productTypeId: 9,
    name: 'Water',
    description: null,
    isActive: true
  },
  {
    productTypeId: 9,
    name: 'Cranberry Juice',
    description: null,
    isActive: true
  },
  {
    productTypeId: 9,
    name: 'Sprite',
    description: null,
    isActive: true
  },
  {
    productTypeId: 9,
    name: 'Ginger Ale',
    description: null,
    isActive: true
  },
  {
    productTypeId: 12,
    name: 'Ballantine 12 yr',
    description: null,
    isActive: true
  },
  {
    productTypeId: 12,
    name: 'Chivas 12 yr',
    description: null,
    isActive: true
  },
  {
    productTypeId: 12,
    name: 'Johnnie Walker Black',
    description: null,
    isActive: true
  },
  {
    productTypeId: 12,
    name: 'Johnnie Walker Blue',
    description: null,
    isActive: true
  },
  {
    productTypeId: 13,
    name: 'Glenmorangie 10 yr',
    description: null,
    isActive: true
  },
  {
    productTypeId: 13,
    name: 'Glenfiddich 12 yr',
    description: null,
    isActive: false
  },
  {
    productTypeId: 13,
    name: 'Glenlivet 12 yr',
    description: null,
    isActive: true
  },
], product => Product.create(product));
