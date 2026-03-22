"use client";

import { Input } from "@/components/core";
import styles from "./styles.module.scss";
import UserChip from "@/components/core/MainLayout/Header/User";
import Tags from "./Tags";

export default function PostField() {
  return (
    <div className={styles.container}>
      <UserChip onlyPic/>
      <div className={styles.container__column}>
        <Input type="text" />
        <Tags />
      </div>
    </div>
  );
}
