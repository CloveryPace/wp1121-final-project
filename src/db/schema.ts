import { sql, relations } from "drizzle-orm";
import {
  index,
  pgTable,
  serial,
  uuid,
  varchar,
  unique,
  date,
  integer,
  timestamp
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    username: varchar("username", { length: 100 }).notNull(),
    hashedPassword: varchar("hashed_password", { length: 100 }),
  }
);

export const eventsTable = pgTable(
  "events",
  {
    id: serial("id").primaryKey(),
    displayId: uuid("display_id").defaultRandom().notNull().unique(),
    userId: uuid("user_id").notNull()
    .references(() => usersTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    latest_time: date('latest_time').notNull(),
    categoryId: uuid("category_id").references(() => usersTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  }
);

export const foodTable = pgTable(
  "food",
  {
    id: serial("id").primaryKey(),
    eventId: uuid("event_id").references(() => eventsTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    name: varchar("name").notNull(),
    count: integer("count").notNull()
  }
);

export const event_categoriesTable = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    categoryName: varchar("category_name", { length: 100 }).notNull()
  }
);

export const subscriptionTable = pgTable(
  "subscriptions",
  {
    id: serial("id").primaryKey(),
    subscriberId: uuid("subscriber_id").references(() => usersTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    subscribedUserId: uuid("subscribed_user_id").references(() => usersTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),  
  }
);

export const reservationTable = pgTable(
  "reservations",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id").references(() => usersTable.displayId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
    foodId: uuid("subscribed_user_id").references(() => foodTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }), 
    count: integer("count").notNull(),
    createdAt: timestamp("created_at").default(sql`now()`),
  }
);
