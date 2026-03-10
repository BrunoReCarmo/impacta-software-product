import Tab from "./Tab";
import { useMemo } from "react";
import { TabsProps } from "./props";
import styles from "./styles.module.scss"

export default function Tabs<T>({ tabs, handleSetValue }: TabsProps<T>) {
  const MappedTabs = useMemo(
    () =>
      tabs.map((tab, index) => (
        <Tab
          key={`${index}-${tab?.value}`}
          handleSelect={() => handleSetValue(tab?.value)}
          {...tab}
        />
      )),
    [tabs, handleSetValue]
  );

  return <div className={styles.tabs}>{MappedTabs}</div>;
}
