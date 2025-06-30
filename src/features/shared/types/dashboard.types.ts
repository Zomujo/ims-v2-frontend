export interface GeneralRequest {
  startDate: string;
  endDate: string;
}

export type ChangeType = "INCREMENT" | "DECREMENT" | "NONE";

export type StockLevel = "LOW" | "OUT_OF_STOCK" | "STOCKED";

export interface MetricData {
  total: number;
  percentageChange: number;
  changeType: ChangeType;
}

interface Stock {
  highStocked: number;
  lowStocked: number;
  outOfStock: number;
  stockDaysOnHand: number;
  total: number;
  totalStock: number;
}

export interface ItemStockLevel extends MetricData {
  stock: Stock;
}

export interface GeneralResponse {
  itemStockLevel: ItemStockLevel;
  totalItemsSold: MetricData;
  totalTransactions: MetricData;
  inventoryTurnoverRate: MetricData;
  totalRevenue: MetricData;
  averageItemsPerTransaction: MetricData;
  customers: MetricData;
  soonToExpireItems: MetricData;
  itemsReturned: MetricData;
}

export interface Trend {
  dates: string[]; // ISO format date strings
  quantities: number[];
}

export interface SalesTrend {
  trend: Trend;
}

export interface SellingItemsResponse {
  average: number;
  items: {
    names: string[];
    quantities: number[];
  };
}

export interface SellingCategoriesResponse {
  topSelling: {
    categories: string[];
    quantities: number[];
  };
}
export interface DailySalesResponse {
  sales: Sales;
}

export type Sales = { hours?: string[] } & Omit<
  Record<string, number[]>,
  "hours"
>;

export interface PaymentMethodResponse {
  topSelling: {
    categories: string[];
    quantities: number[];
  };
}
