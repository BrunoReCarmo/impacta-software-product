import styles from "./styles.module.scss";
import { useCallback, useMemo } from "react";
import { CreatePostInputDTO } from "@common/dto";
import { usePostTags } from "@/api/post/queries/usePostTags";
import { useFormContext, useWatch } from "react-hook-form";

export default function Tags() {
  const { tags } = usePostTags();
  const { setValue, control } = useFormContext<CreatePostInputDTO>();

  const selectedTags = useWatch({ control, name: "tagsId" }) ?? [];

  const handleTagClick = useCallback((tagId: number) => {
    setValue(
      "tagsId",
      selectedTags.includes(tagId)
        ? selectedTags.filter((id) => id !== tagId)
        : [...selectedTags, tagId],
      { shouldValidate: true }
    );
  }, [selectedTags, setValue]);

  const TagsMapped = useMemo(
    () =>
      tags?.map((tag) => {
        const isSelected = selectedTags.includes(tag.id);

        return (
          <div
            key={tag.id}
            className={`${styles.container__tag} ${isSelected ? styles["container__tag--selected"] : ""}`}
            style={{ "--custom-color": tag.color } as React.CSSProperties}
            onClick={() => handleTagClick(tag.id)}
          >
            {tag.tag_name}
          </div>
        );
      }),
    [tags, selectedTags, handleTagClick]
  );

  return <div className={styles.container}>{TagsMapped}</div>;
}