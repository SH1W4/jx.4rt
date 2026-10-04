import { pgTable, serial, text, timestamp, real } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  source: text("source").notNull(),
  rawState: text("raw_state").notNull(),
  classification: text("classification").notNull(),
  classificationConfidence: real("classification_confidence").notNull(),
  commercialScore: real("commercial_score").notNull(),
  artisticScore: real("artistic_score").notNull(),
  reputationScore: real("reputation_score").notNull(),
  relationshipScore: real("relationship_score").notNull(),
  expansionScore: real("expansion_score").notNull(),
});
