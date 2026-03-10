import { TabProps } from "./Tab/props";

export interface TabsProps<T> {
    handleSetValue: (option: T) => void;
    tabs: Array<TabProps<T>>;
}