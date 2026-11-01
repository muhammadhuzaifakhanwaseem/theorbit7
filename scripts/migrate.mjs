/**
 * Database migration: creates indexes and default blog taxonomy (idempotent).
 * The app also runs these lazily on first use, so this is optional on Vercel.
 *
 *   npm run db:migrate            (reads MONGODB_URI from the environment or .env.local)
 */
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set.");
  process.exit(1);
}
const client = new MongoClient(uri);
await client.connect();
const db = client.db(process.env.MONGODB_DB || "theorbit7");

const indexes = [
  ["submissions", { createdAt: -1 }, {}],
  ["admin_users", { username: 1 }, { unique: true }],
  ["admin_sessions", { tokenHash: 1 }, { unique: true }],
  ["admin_sessions", { expiresAt: 1 }, { expireAfterSeconds: 0 }],
  ["admin_login_attempts", { at: 1 }, { expireAfterSeconds: 3600 }],
  ["blog_posts", { slug: 1 }, { unique: true }],
  ["blog_posts", { previousSlugs: 1 }, {}],
  ["blog_posts", { status: 1, publishedAt: -1 }, {}],
  ["blog_posts", { categoryId: 1, publishedAt: -1 }, {}],
  ["blog_posts", { updatedAt: -1 }, {}],
  ["blog_categories", { slug: 1 }, { unique: true }],
  ["blog_authors", { slug: 1 }, { unique: true }],
];
for (const [col, keys, opts] of indexes) {
  const name = await db.collection(col).createIndex(keys, opts);
  console.log(`✓ ${col}.${name}`);
}

const categories = [
  ["Web Development", "web-development"],
  ["Mobile Apps", "mobile-apps"],
  ["Software & AI", "software-and-ai"],
  ["SEO", "seo"],
  ["Digital Marketing", "digital-marketing"],
  ["Design & Branding", "design-and-branding"],
];
if ((await db.collection("blog_categories").countDocuments()) === 0) {
  await db.collection("blog_categories").insertMany(categories.map(([name, slug]) => ({ name, slug, description: "", createdAt: new Date() })));
  console.log(`✓ seeded ${categories.length} blog categories`);
}
if ((await db.collection("blog_authors").countDocuments()) === 0) {
  await db.collection("blog_authors").insertOne({ name: "The Orbit 7 Team", slug: "the-orbit-7-team", role: "Editorial team", bio: "", avatar: null, createdAt: new Date() });
  console.log("✓ seeded default author");
}
await client.close();
console.log("Migration complete.");
