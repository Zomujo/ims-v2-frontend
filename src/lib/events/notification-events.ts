class NotificationEventEmitter {
  private listeners: Array<() => void> = [];

  subscribe(callback: () => void) {
    this.listeners.push(callback);

    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  emit() {
    this.listeners.forEach((callback) => callback());
  }
}

export const notificationEvents = new NotificationEventEmitter();
