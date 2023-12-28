-- These two lines make it so that every single SQL query in
-- this file can be ran all at once to "reset" the database:
DROP TRIGGER IF EXISTS "crud_cardio_one" ON "things";
DROP TABLE IF EXISTS "things";

-- Table Schema Template:
CREATE TABLE "creatures" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(500) NOT NULL,
  "type" VARCHAR(500)
);

-- Seed Data Template:
INSERT INTO "creatures"
  ("name", "type")
  VALUES
  ('Gizmo', 'Gremlin'),
  ('Gadget', 'Goblin'),
  ('Bits', 'Unicorn'),
  ('Bobs', 'TacoCat');
  
-- Creates a trigger that handles the updated_at magic:
  -- https://x-team.com/blog/automatic-timestamps-with-postgresql/
CREATE OR REPLACE FUNCTION set_updated_at_to_now()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER crud_cardio_one
BEFORE UPDATE ON "creatures"
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at_to_now();
