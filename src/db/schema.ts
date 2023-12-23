import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  uuid,
  varchar,
  date,
  integer,
  timestamp,
  text,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  displayId: uuid("display_id").defaultRandom().notNull().unique(),
  username: varchar("username", { length: 100 }).notNull(),
  hashedPassword: varchar("hashed_password", { length: 100 }).notNull(),
  image: text("user_image"),
});

export const eventsTable = pgTable("events", {
  id: serial("id").primaryKey(),
  displayId: uuid("display_id").defaultRandom().notNull().unique(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  latest_time: date("latest_time").notNull(),
  categoryName: varchar("category_name", { length: 100 }).notNull(),
  location: varchar("location", { length: 100 }).notNull(),
});

export const foodTable = pgTable("food", {
  id: serial("id").primaryKey(),
  displayId: uuid("display_id").defaultRandom().notNull().unique(),
  eventId: uuid("event_id")
    .notNull()
    .references(() => eventsTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  name: varchar("name").notNull(),
  count: integer("count").notNull(),
  image: text("image"),
});

export const subscriptionsTable = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  subscriberId: uuid("subscriber_id")
    .notNull()
    .references(() => usersTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  subscribedUserId: uuid("subscribed_user_id")
    .notNull()
    .references(() => usersTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
});

export const reservationTable = pgTable("reservations", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  eventId: uuid("event_id")
    .notNull()
    .references(() => eventsTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  count: integer("count").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});
