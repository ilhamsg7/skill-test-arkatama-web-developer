export type Base<T> = {
    prev_page?: number | null,
    items?: T,
    current_page?: number | null,
    next_page?: number | null,
}