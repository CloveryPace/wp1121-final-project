import { sql, relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  uuid,
  varchar,
  date,
  integer,
  timestamp,
  text,
  index,
  unique,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  displayId: uuid("display_id").defaultRandom().notNull().unique(),
  username: varchar("username", { length: 100 }).notNull(),
  hashedPassword: varchar("hashed_password", { length: 100 }).notNull(),
  image: text("user_image"),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  usersToEventsTable: many(usersToEventsTable),
  subscriptionTable: many(subscriptionsTable),
  reservationTable: many(reservationTable),
}));

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
  categoryId: uuid("category_id").references(() => usersTable.displayId, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  categoryName: varchar("category_name", { length: 100 }),
  location: varchar("location", { length: 100 }).notNull(),
});

export const eventsRelations = relations(eventsTable, ({ many }) => ({
  usersToEventsTable: many(usersToEventsTable),
  eventsToFoodTable: many(eventsToFoodTable),
}));

export const usersToEventsTable = pgTable(
  "users_to_events",
  {
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
  },
  (table) => ({
    userAndEventIndex: index("user_and_event_index").on(
      table.userId,
      table.eventId,
    ),
    uniqCombination: unique().on(table.eventId, table.userId),
  }),
);

// 設定usersToEventsTable：eventsTable和usersTable之間的一對一關係
export const usersToEventsRelations = relations(
  usersToEventsTable,
  ({ one }) => ({
    event: one(eventsTable, {
      fields: [usersToEventsTable.eventId],
      references: [eventsTable.displayId],
    }),
    user: one(usersTable, {
      fields: [usersToEventsTable.userId],
      references: [usersTable.displayId],
    }),
  }),
);

export const foodTable = pgTable("food", {
  id: serial("id").primaryKey(),
  eventId: uuid("event_id").references(() => eventsTable.displayId, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  name: varchar("name").notNull(),
  count: integer("count").notNull(),
  image: text("image").notNull(),
});

export const foodRelations = relations(foodTable, ({ many }) => ({
  eventsToFoodTable: many(eventsToFoodTable),
  reservationTable: many(reservationTable),
}));

export const eventsToFoodTable = pgTable(
  "events_to_food",
  {
    id: serial("id").primaryKey(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => eventsTable.displayId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    foodId: uuid("food_id")
      .notNull()
      .references(() => foodTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    eventAndFoodIndex: index("event_and_food_index").on(
      table.foodId,
      table.eventId,
    ),
    uniqCombination: unique().on(table.eventId, table.foodId),
  }),
);

// 設定eventsToFoodTable：eventsTable和foodTable之間的一對一關係
export const eventsToFoodRelations = relations(
  eventsToFoodTable,
  ({ one }) => ({
    event: one(eventsTable, {
      fields: [eventsToFoodTable.eventId],
      references: [eventsTable.displayId],
    }),
    food: one(foodTable, {
      fields: [eventsToFoodTable.foodId],
      references: [foodTable.id],
    }),
  }),
);

export const subscriptionsTable = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  subscriberId: uuid("subscriber_id").references(() => usersTable.displayId, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  subscribedUserId: uuid("subscribed_user_id").references(
    () => usersTable.displayId,
    {
      onDelete: "cascade",
      onUpdate: "cascade",
    },
  ),
});

// 設定subscriptionsTable
export const subscriptionRelations = relations(
  subscriptionsTable,
  ({ one }) => ({
    subscriberId: one(usersTable, {
      fields: [subscriptionsTable.subscriberId],
      references: [usersTable.displayId],
    }),
    subscribedUserId: one(usersTable, {
      fields: [subscriptionsTable.subscribedUserId],
      references: [usersTable.displayId],
    }),
  }),
);

export const reservationTable = pgTable("reservations", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id").references(() => usersTable.displayId, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  foodId: uuid("food_id").references(() => foodTable.id, {
    onDelete: "cascade",
    onUpdate: "cascade",
  }),
  count: integer("count").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});
