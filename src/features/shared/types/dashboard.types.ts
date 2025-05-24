export interface GeneralRequest {
  startDate: string;
  endDate: string;
}

export type ChangeType = "INCREASE" | "DECREASE" | "NO_CHANGE";

export interface MetricData {
  total: number;
  percentageChange: number;
  changeType: ChangeType;
}

export interface StockItem {
  itemName: string;
  quantity: number;
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
