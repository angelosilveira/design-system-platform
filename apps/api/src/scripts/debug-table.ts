import { db } from "../lib/db";

const count = await db.query("SELECT count(*) FROM component_docs");
console.log("Total de linhas:", count.rows[0].count);

const nullCheck = await db.query(
  "SELECT component_name, embedding IS NULL as embedding_is_null FROM component_docs",
);
console.log(nullCheck.rows);

await db.end();
