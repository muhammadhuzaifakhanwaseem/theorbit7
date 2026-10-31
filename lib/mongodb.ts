import "server-only";
import { MongoClient, type Db } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

/**
 * Shared MongoDB client, reused across invocations of the same function instance.
 * MONGODB_URI is provided by the Vercel ↔ MongoDB Atlas integration.
 */
const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

export function getMongoClient(): MongoClient | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  if (!globalForMongo._mongoClient) {
    const client = new MongoClient(uri, { appName: "theorbit7-website", maxPoolSize: 5, serverSelectionTimeoutMS: 8000 });
    attachDatabasePool(client);
    globalForMongo._mongoClient = client;
  }
  return globalForMongo._mongoClient;
}

export function getDb(): Db | null {
  return getMongoClient()?.db(process.env.MONGODB_DB || "theorbit7") ?? null;
}
