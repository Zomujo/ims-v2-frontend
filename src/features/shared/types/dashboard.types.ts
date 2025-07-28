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
  totalCost: number;
}

interface Stock {
  highStocked: number;
  lowStocked: number;
  stockValue: number;
  outOfStock: number;
  stockDaysOnHand: number;
  total: number;
  totalStock: number | null;
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
  dates: string[] | null; // ISO format date strings
  quantities: number[] | null;
}

export interface SalesTrend {
  trend: Trend;
}

export interface SellingItemsResponse {
  average: number;
  items: {
    names: string[] | null;
    quantities: number[] | null;
  };
}

export interface SellingCategoriesResponse {
  topSelling: {
    categories: string[] | null;
    quantities: number[] | null;
  };
}

export interface DailySalesResponse {
  sales: Sales;
}

export type Sales = { hours?: string[] } & Omit<
  Record<string, number[]>,
  "hours"
>;

export interface TopSelling {
  categories: string[] | null;
  quantities: number[] | null;
}

export interface PaymentMethodResponse {
  topSelling: TopSelling;
}

interface QuantityTotal {
  total: number;
  quantity: number;
}

export interface SalesMarkupResponse {
  insured: QuantityTotal | null;
  notInsured: QuantityTotal | null;
}
