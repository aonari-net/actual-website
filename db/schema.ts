import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  adminNickname: text("admin_nickname"), // For admin's easier navigation
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const subscriptions = sqliteTable("subscriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  plan: text("plan").notNull(), // 'monthly', 'yearly', 'lifetime'
  price: text("price").notNull(), // Amount paid
  status: text("status").notNull(), // 'active', 'cancelled', 'expired'
  licenseKey: text("license_key"), // The distributed key
  startDate: integer("start_date", { mode: "timestamp" }).notNull(),
  endDate: integer("end_date", { mode: "timestamp" }),
});
