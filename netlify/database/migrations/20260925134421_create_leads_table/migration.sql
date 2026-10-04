CREATE TABLE "leads" (
	"id" serial PRIMARY KEY,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"source" text NOT NULL,
	"raw_state" text NOT NULL,
	"classification" text NOT NULL,
	"classification_confidence" real NOT NULL,
	"commercial_score" real NOT NULL,
	"artistic_score" real NOT NULL,
	"reputation_score" real NOT NULL,
	"relationship_score" real NOT NULL,
	"expansion_score" real NOT NULL
);
