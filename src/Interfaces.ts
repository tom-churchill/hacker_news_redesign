export interface INewsItem {
    id: string,
    title: string,
    url: string,
    kids: number[],
    score: number,
    by: string,
}

export interface IComment {
    text: string,
    by: string,
}
