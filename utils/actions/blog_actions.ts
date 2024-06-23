"use server";
import { sql } from "@vercel/postgres";

export async function getBlogPageCount() {
  const count = await sql`SELECT COUNT(*) FROM posts;`;
  return Math.ceil(count.rows[0].count / 12);
}

export const addNewPost = async (
  title: string,
  body: string,
  tags: string[],
  owner_id: string
) => {
  try {
    await sql`INSERT INTO posts (title, body, tags, owner_id) 
        VALUES (${title}, ${body}, ${JSON.stringify(tags)}, ${owner_id})`.catch(
      (err) => console.log(err)
    );
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async (
  current_user_id: string,
  search: string,
  page: number
) => {
  try {
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
    return posts.rows;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getMyPosts = async (current_user_id: string) => {
  try {
    const posts = await sql`SELECT p.*,
       COALESCE(SUM(CASE WHEN pl.vote_type = 'like' THEN 1 ELSE 0 END), 0) AS total_likes,
       COALESCE(SUM(CASE WHEN pl.vote_type = 'dislike' THEN 1 ELSE 0 END), 0) AS total_dislikes,
       COALESCE(current_user_vote.vote_type, 'none') AS user_vote_type,
       COALESCE(v.view_count, 0) AS views
FROM posts p
LEFT JOIN post_likes pl ON p.id = pl.post_id
LEFT JOIN post_likes current_user_vote 
    ON p.id = current_user_vote.post_id AND current_user_vote.owner_id = ${current_user_id}
LEFT JOIN (
    SELECT post_id, COUNT(*) AS view_count
    FROM post_views
    GROUP BY post_id
) v ON p.id = v.post_id 
WHERE p.owner_id = ${current_user_id}
 GROUP BY p.id, current_user_vote.vote_type, v.view_count;
;
`;
    return posts.rows;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPost = async (post_id: string, current_user_id: string) => {
  try {
    const post = await sql`SELECT p.*,
       COALESCE(SUM(CASE WHEN pl.vote_type = 'like' THEN 1 ELSE 0 END), 0) AS total_likes,
       COALESCE(SUM(CASE WHEN pl.vote_type = 'dislike' THEN 1 ELSE 0 END), 0) AS total_dislikes,
       COALESCE(current_user_vote.vote_type, 'none') AS user_vote_type,
       COALESCE(v.view_count, 0) AS views
FROM posts p
LEFT JOIN post_likes pl ON p.id = pl.post_id
LEFT JOIN post_likes current_user_vote 
    ON p.id = current_user_vote.post_id AND current_user_vote.owner_id = ${current_user_id}
LEFT JOIN (
    SELECT post_id, COUNT(*) AS view_count
    FROM post_views
    GROUP BY post_id
) v ON p.id = v.post_id
WHERE p.id = ${post_id}
GROUP BY p.id, current_user_vote.vote_type, v.view_count;
    `;
    return post.rows[0];
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const getComments = async (post_id: number, current_user_id: string) => {
  const comments = await sql`SELECT c.*,
       CASE WHEN c.owner_id = ${current_user_id} THEN TRUE ELSE FALSE END AS is_user_comment,
       COALESCE(cl.vote_type, 'none') AS user_vote_type,
       COALESCE(SUM(CASE WHEN cl.vote_type = 'like' THEN 1 ELSE 0 END), 0) AS total_likes,
       COALESCE(SUM(CASE WHEN cl.vote_type = 'dislike' THEN 1 ELSE 0 END), 0) AS total_dislikes
FROM comments c
LEFT JOIN comment_likes cl 
    ON c.id = cl.comment_id 
    AND cl.owner_id = ${current_user_id}
WHERE c.post_id = ${post_id}
GROUP BY c.id, is_user_comment, user_vote_type;

    `;
  return comments.rows;
};

export const addNewComment = async (
  post_id: number,
  owner_id: string,
  content: string
) => {
  const comment = await sql`INSERT INTO comments (post_id, owner_id, content)
VALUES (${post_id}, ${owner_id}, ${content}) 
ON CONFLICT (post_id, owner_id) DO NOTHING
RETURNING *;
`;
  return comment.rows[0];
};

export const commentConflict = async (post_id: number, owner_id: string) => {
  const comment = await sql`SELECT * FROM comments 
WHERE post_id = ${post_id} AND owner_id = ${owner_id};`;
  if (comment.rows.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const addNewCommentLike = async (
  comment_id: number,
  owner_id: string,
  vote_type: string
) => {
  if (vote_type === "none") {
    await sql`DELETE FROM comment_likes WHERE comment_id = ${comment_id} AND owner_id = ${owner_id};`;
  } else {
    await sql`INSERT INTO comment_likes (comment_id, owner_id, vote_type)
    VALUES (${comment_id}, ${owner_id}, ${vote_type})
    ON CONFLICT (comment_id, owner_id) 
    DO UPDATE SET vote_type = EXCLUDED.vote_type
    RETURNING *;
    `;
  }
};

export const addNewPostLike = async (
  post_id: number,
  owner_id: string,
  vote_type: string
) => {
  if (vote_type === "none") {
    await sql`DELETE FROM post_likes WHERE post_id = ${post_id} AND owner_id = ${owner_id};`;
  } else {
    await sql`INSERT INTO post_likes (post_id, owner_id, vote_type)
    VALUES (${post_id}, ${owner_id}, ${vote_type})
    ON CONFLICT (post_id, owner_id) 
    DO UPDATE SET vote_type = EXCLUDED.vote_type
    RETURNING *;
    `;
  }
};

export const addPostView = async (post_id: number, viewer_id: string) => {
  if (!viewer_id) {
    return;
  }
  const views = await sql`INSERT INTO post_views (post_id, viewer_id)
VALUES (${post_id}, ${viewer_id})
ON CONFLICT (post_id, viewer_id) DO NOTHING;
`;

  return views.rows[0];
};

export const editPost = async (
  post_id: number,
  title: string,
  body: string,
  tags: string[]
) => {
  const post = await sql`UPDATE posts SET title = ${title}, 
  body = ${body}, 
  tags = ${JSON.stringify(tags)}  
  WHERE id = ${post_id} RETURNING *;`;
  return post.rows[0];
};

export const deletePost = async (post_id: number) => {
  await sql`DELETE FROM posts WHERE id = ${post_id};`;
};

export const editComment = async (comment_id: number, content: string) => {
  const comment = await sql`UPDATE comments SET content = ${content} 
  WHERE id = ${comment_id} RETURNING *;`;
  return comment.rows[0];
};

export const deleteComment = async (comment_id: number) => {
  await sql`DELETE FROM comments WHERE id = ${comment_id};`;
};
