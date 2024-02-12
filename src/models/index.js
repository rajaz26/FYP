// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserRole = {
  "GENERAL_MANAGER": "GENERAL_MANAGER",
  "CASHIER": "CASHIER",
  "WAREHOUSE_MANAGER": "WAREHOUSE_MANAGER",
  "PURCHASER": "PURCHASER"
};

const BillStatus = {
  "PENDING": "PENDING",
  "CONFIRMED": "CONFIRMED",
  "PAID": "PAID"
};

const { Product, User, Bill, Inventory, PurchaseOrder } = initSchema(schema);

export {
  Product,
  User,
  Bill,
  Inventory,
  PurchaseOrder,
  UserRole,
  BillStatus
};