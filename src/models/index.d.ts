import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum UserRole {
  GENERAL_MANAGER = "GENERAL_MANAGER",
  CASHIER = "CASHIER",
  WAREHOUSE_MANAGER = "WAREHOUSE_MANAGER",
  PURCHASER = "PURCHASER"
}

export enum BillStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PAID = "PAID"
}



type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly barcode: string;
  readonly images?: (string | null)[] | null;
  readonly price: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly barcode: string;
  readonly images?: (string | null)[] | null;
  readonly price: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly phonenumber: string;
  readonly image?: string | null;
  readonly role: UserRole | keyof typeof UserRole;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly phonenumber: string;
  readonly image?: string | null;
  readonly role: UserRole | keyof typeof UserRole;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerBill = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Bill, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly totalAmount: number;
  readonly status: BillStatus | keyof typeof BillStatus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBill = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Bill, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly totalAmount: number;
  readonly status: BillStatus | keyof typeof BillStatus;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Bill = LazyLoading extends LazyLoadingDisabled ? EagerBill : LazyBill

export declare const Bill: (new (init: ModelInit<Bill>) => Bill) & {
  copyOf(source: Bill, mutator: (draft: MutableModel<Bill>) => MutableModel<Bill> | void): Bill;
}

type EagerInventory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Inventory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly warehouseQuantity: number;
  readonly shelfQuantity: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyInventory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Inventory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly warehouseQuantity: number;
  readonly shelfQuantity: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Inventory = LazyLoading extends LazyLoadingDisabled ? EagerInventory : LazyInventory

export declare const Inventory: (new (init: ModelInit<Inventory>) => Inventory) & {
  copyOf(source: Inventory, mutator: (draft: MutableModel<Inventory>) => MutableModel<Inventory> | void): Inventory;
}

type EagerPurchaseOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PurchaseOrder, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPurchaseOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PurchaseOrder, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PurchaseOrder = LazyLoading extends LazyLoadingDisabled ? EagerPurchaseOrder : LazyPurchaseOrder

export declare const PurchaseOrder: (new (init: ModelInit<PurchaseOrder>) => PurchaseOrder) & {
  copyOf(source: PurchaseOrder, mutator: (draft: MutableModel<PurchaseOrder>) => MutableModel<PurchaseOrder> | void): PurchaseOrder;
}