import { db } from "../lib/db";

const result = await db.query("SELECT component_name FROM component_docs");
console.log(result.rows);
await db.end();
