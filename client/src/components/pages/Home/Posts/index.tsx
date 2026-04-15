'use client'

import { usePosts } from "@/api/post/queries/usePosts";
import { useMemo } from "react";
import PostCard from "./Card";

export default function Posts() {
  const { data } = usePosts()

  const MappedPost = useMemo(() => {
    if (!data || typeof data !== "object") return null;
    return data.map((post) => <PostCard key={post.id} post={post} />);
  }, [data]);

  return MappedPost
}