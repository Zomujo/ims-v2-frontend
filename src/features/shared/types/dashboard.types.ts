export interface GeneralRequest {
  startDate: string;
  endDate: string;
}

export type ChangeType = "INCREASE" | "DECREASE" | "NONE";

export type StockLevel = "LOW_STOCK" | "OUT_OF_STOCK" | "HIGH_STOCK";

export interface MetricData {
  total: number;
  percentageChange: number;
  changeType: ChangeType;
}

export interface StockItem {
  itemName: string;
  quantity: number;
  stockLevel: StockLevel;
}

export interface ItemStockLevel extends MetricData {
  totalStock: number;
  items: StockItem[];
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

export interface DailySalesResponse {
  sales: { dates: string[]; quantities: number[] }[];
}

export interface PaymentMethodResponse {
  topSelling: {
    categories: string[];
    quantities: number[];
  };
}
