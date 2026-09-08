import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { id: "notification-1", title: "Low stock alert", message: "Printer Paper (A4) is below its minimum level.", time: "5 min ago", type: "warning", unread: true },
    { id: "notification-2", title: "Repair request updated", message: "Dell 24-inch Monitor repair is now in progress.", time: "28 min ago", type: "repair", unread: true },
    { id: "notification-3", title: "Asset assigned", message: "Laptop LAP-HR-0023 was assigned to Priya Sharma.", time: "1 hour ago", type: "asset", unread: true },
    { id: "notification-4", title: "Clearance completed", message: "Clearance for Kavya Reddy has been completed.", time: "Yesterday", type: "success", unread: false },
  ],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    notificationAdded: {
      reducer(state, action) { state.items.unshift(action.payload); },
      prepare(notification) { return { payload: { id: nanoid(), time: "Just now", unread: true, type: "asset", ...notification } }; },
    },
    notificationMarkedRead(state, action) {
      const notification = state.items.find((item) => item.id === action.payload);
      if (notification) notification.unread = false;
    },
    allNotificationsMarkedRead(state) { state.items.forEach((item) => { item.unread = false; }); },
    notificationRemoved(state, action) { state.items = state.items.filter((item) => item.id !== action.payload); },
    notificationsCleared(state) { state.items = []; },
  },
});

export const { notificationAdded, notificationMarkedRead, allNotificationsMarkedRead, notificationRemoved, notificationsCleared } = notificationsSlice.actions;
export const selectNotifications = (state) => state.notifications.items;
export const selectUnreadNotificationCount = (state) => state.notifications.items.filter((item) => item.unread).length;
export default notificationsSlice.reducer;