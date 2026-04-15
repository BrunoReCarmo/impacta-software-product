import { useMemo } from "react";
import { CardProps } from "./props";
import styles from "./styles.module.scss";
import UserChip from "@/components/core/MainLayout/Header/User";

export default function PostCard({ post }: CardProps) {

    console.log(post);
const MappedTags = useMemo(() => {
  return post.tags.map(({ tag }) => (  
    <span
      className={styles.container__tag}
      key={tag.id}
      style={{ "--custom-color": tag.color } as React.CSSProperties}
    >
      {tag.tag_name}
    </span>
  ));
}, [post.tags]);

  return (
    <div className={styles.container}>
      <UserChip user={post.user} />
      <h1>{post.title}</h1>
      {MappedTags.length > 0 && (
        <div className={styles.container__row}>
          {MappedTags}
        </div>
      )}
      <p>{post.body}</p>
    </div>
  );
}