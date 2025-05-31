export interface NotificationPayload {
  id: string;
  message: string;
  linkName: string;
  linkRoute: string;
  status: "READ" | "UNREAD";
  createdAt: string;
}

export const mockNotifications: NotificationPayload[] = [
  {
    id: "44220956-0962-4dd0-9e65-1564c585563c",
    message: "Paracetamol has low stock",
    linkName: "View Item",
    linkRoute: "/home",
    status: "UNREAD",
    createdAt: "2025-05-23T21:06:30.664Z",
  },
  {
    id: "a1d4b1e9-b3d8-44cf-97a0-9d87a86a1ab1",
    message: "Ibuprofen out of stock",
    linkName: "View Item",
    linkRoute: "/inventory",
    status: "READ",
    createdAt: "2025-05-22T18:45:12.389Z",
  },
  {
    id: "b2a998cb-671e-4ed2-a2f1-569af3ad2a01",
    message: "Cough Syrup expires soon",
    linkName: "View Item",
    linkRoute: "/alerts",
    status: "UNREAD",
    createdAt: "2025-05-21T10:30:00.000Z",
  },
  {
    id: "f45d9fd3-d062-4c9c-906a-9ad872e5e3d0",
    message: "New stock for Amoxicillin",
    linkName: "View Item",
    linkRoute: "/medications",
    status: "READ",
    createdAt: "2025-05-20T14:15:22.500Z",
  },
  {
    id: "d88c2612-3adf-4ac5-8bb3-947872163a19",
    message: "Diclofenac stock below minimum",
    linkName: "View Item",
    linkRoute: "/inventory",
    status: "UNREAD",
    createdAt: "2025-05-19T09:02:11.918Z",
  },
  {
    id: "44220956-0962-4dd0-9e65-1564c585563c",
    message: "Paracetamol has low stock",
    linkName: "View Item",
    linkRoute: "/home",
    status: "UNREAD",
    createdAt: "2025-05-23T21:06:30.664Z",
  },
  {
    id: "44220956-0962-4dd0-9e65-1564c585563c",
    message: "Paracetamol has low stock",
    linkName: "View Item",
    linkRoute: "/home",
    status: "UNREAD",
    createdAt: "2025-05-23T21:06:30.664Z",
  },
];
