import { SaleItem } from "@features/shared/types/sales-action.types";
import { SaleCartFormData } from "@features/sales/sales.types";

export const printReceipt = (
  data: SaleCartFormData,
  addedSalesItems: SaleItem[],
  subTotal: number,
  nhisAmount: number,
) => {
  const receiptContent = `
    <html lang="en">
      <head>
        <title>Receipt</title>
        <style>
          @media print {
            body { 
              width: 90mm;
              margin: 0;
              padding: 0;
            }
          }
          body {
            font-family: 'Courier New', monospace;
            padding: 10px;
            margin: 0;
            display: flex;
            justify-content: center;
            background-color: #fff;
          }
          .receipt-card {
            width: 340px;
            background: white;
            padding: 10px;
            border: 1px solid #000;
          }
          .header {
            text-align: center;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
            margin-bottom: 10px;
          }
          .header h1 {
            font-size: 18px;
            margin: 5px 0;
          }
          .info {
            font-size: 12px;
            margin: 5px 0;
          }
          .items {
            margin: 15px 0;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
          }
          .item {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            margin: 5px 0;
          }
          .batch-id {
            font-size: 8px;
            color: #666;
          }
          .total {
            font-weight: bold;
            text-align: right;
            font-size: 14px;
            margin-top: 10px;
          }
          .footer {
            text-align: center;
            font-size: 10px;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="receipt-card">
          <div class="header">
            <h1>SALES RECEIPT</h1>
            <div class="info">Date: ${new Date().toLocaleString()}</div>
            <div class="info">Payment: ${data.paymentType}</div>
          </div>
          
          <div class="items">
            ${data.saleItems
              .map((item) => {
                const saleItem = addedSalesItems.find(
                  (sale) => sale.batchId === item.batchId,
                );
                const itemName = saleItem?.item?.name ?? "";
                const price = saleItem?.item?.sellingPrice ?? 0;
                const total = price * item.quantity;
                return `
                <div class="item">
                  <div>
                    ${itemName}
                    <div class="batch-id">#${item.batchId}</div>
                  </div>
                  <div>
                    ${item.quantity} x GHC ${price.toFixed(2)} = GHC ${total.toFixed(2)}
                  </div>
                </div>
              `;
              })
              .join("")}
          </div>

          <div class="total">
            NHIS Covered: GHC ${nhisAmount.toFixed(2)}<br />
            TOTAL: GHC ${(subTotal - nhisAmount).toFixed(2)}
          </div>

          ${data.notes ? `<div class="info">Notes: ${data.notes}</div>` : ""}
          
          <div class="footer">
            Thank you for your purchase!
          </div>
        </div>
      </body>
    </html>
  `;

  const receiptBlob = new Blob([receiptContent], { type: "text/html" });
  const receiptUrl = URL.createObjectURL(receiptBlob);
  const receiptWindow = window.open(
    receiptUrl,
    "Receipt",
    "width=400,height=600",
  );

  if (receiptWindow) {
    receiptWindow.addEventListener("load", () => {
      receiptWindow.print();
      URL.revokeObjectURL(receiptUrl);
    });
  }
};
