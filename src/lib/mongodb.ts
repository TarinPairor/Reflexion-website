import { MongoClient } from "mongodb";

declare global {
  var reflexionMongoClientPromise: Promise<MongoClient> | undefined;
}

function createMongoClientPromise() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  const client = new MongoClient(uri, {
    appName: "reflexion-website",
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 8_000,
  });

  return client.connect().catch((error) => {
    globalThis.reflexionMongoClientPromise = undefined;
    throw error;
  });
}

export function getMongoClient() {
  globalThis.reflexionMongoClientPromise ??= createMongoClientPromise();
  return globalThis.reflexionMongoClientPromise;
}

export async function getRefDatabase() {
  const client = await getMongoClient();
  return client.db("ref");
}
