export interface TabProps<T> {
    value: T
    label?: string
    isActive?: boolean
    icon?: React.ReactNode;
    handleSelect?: () => void;
}