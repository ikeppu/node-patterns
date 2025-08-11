// pages/api/submit.ts (or inside a Blitz resolver)
import type { NextApiRequest, NextApiResponse } from "next";
import { SafeSanitizer } from "@/lib/SafeSanitizer";
import { getRepository } from "typeorm";
import { Comment } from "@/db/entities/Comment";

const sanitizer = new SafeSanitizer({
  maxLen: 1000,
  aggressiveSqlKeywords: false, // set true if you *really* want to strip keywords
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const cleanBody = sanitizer.sanitizeDeep(req.body);

  // TypeORM: stick to parameters (Repository/QueryBuilder) — no string concat.
  const repo = getRepository(Comment);
  await repo.save({
    postId: Number(cleanBody.postId),
    author: cleanBody.author,
    body: cleanBody.body,
  });

  res.json({ ok: true });
}
