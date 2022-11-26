import { SQLiteD1Connector, SQLiteD1Database } from "drizzle-orm-sqlite/d1";
import { eq } from "drizzle-orm/expressions";
import { Request as IttyRequest, Route, Router } from "itty-router";
import { json } from "itty-router-extras";
import { users } from "./schema";

export interface Env {
  DB: D1Database;
}

interface Request extends IttyRequest {
  db: SQLiteD1Database;
}

interface Methods {
  get: Route;
  post: Route;
}

function injectDB(request: Request, env: Env) {
  const db = new SQLiteD1Connector(env.DB).connect();
  request.db = db;
}

const router = Router<Request, Methods>({ base: "/" });

router.get("/users", injectDB, async (req: Request, env: Env) => {
  const result = await req.db.select(users).execute();
  return json(result);
});

router.get("/users/:id", injectDB, async (req: Request, env: Env) => {
  const result = await req.db.select(users).where(eq(users.id, Number(req.params!["id"]) )).execute();
  return json(result);
});

router.post("/users", injectDB, async (req: Request, env: Env) => {
  const { name, email } = await req.json!();
  const res = await req.db.insert(users).values({ name, email }).returning().execute();
  return json({ res });
});


export default {
  fetch: router.handle,
};
