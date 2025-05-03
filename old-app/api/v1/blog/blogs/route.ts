import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export const POST = async (req: NextRequest) => {
  const { search, page, current_user_id } = await req.json();
  const posts = await sql`SELECT p.*,
       COALESCE(SUM(CASE WHEN pl.vote_type = 'like' THEN 1 ELSE 0 END), 0) AS total_likes,
       COALESCE(SUM(CASE WHEN pl.vote_type = 'dislike' THEN 1 ELSE 0 END), 0) AS total_dislikes,
       COALESCE(current_user_vote.vote_type, 'none') AS user_vote_type,
       COALESCE(v.view_count, 0) AS views
FROM (
    SELECT *
    FROM posts
    WHERE title ILIKE ${"%" + search + "%"}
    LIMIT 12 OFFSET ${(page - 1) * 12}
) p
LEFT JOIN post_likes pl ON p.id = pl.post_id
LEFT JOIN post_likes current_user_vote 
    ON p.id = current_user_vote.post_id AND current_user_vote.owner_id = ${current_user_id}
LEFT JOIN (
    SELECT post_id, COUNT(*) AS view_count
    FROM post_views
    GROUP BY post_id
) v ON p.id = v.post_id 
GROUP BY p.id, p.title, p.body, p.tags, p.owner_id, 
p.created_at, p.updated_at, current_user_vote.vote_type, v.view_count;
`;
  return NextResponse.json(posts.rows, { status: 200 });
};
