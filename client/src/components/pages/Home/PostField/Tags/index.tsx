import { usePostTags } from "@/api/post/usePostTags";
import { useMemo } from "react";

export default function Tags() {
  const { tags } = usePostTags();

  const TagsMapped = useMemo(
    () => tags?.map((tag) => <>{tag?.tag_name}</>),
    [tags]
  );

  return <div>{TagsMapped}</div>;
}
