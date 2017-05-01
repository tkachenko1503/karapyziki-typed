export type PageData = {
    site: object,
    page: object
};

export type PostData = {
    content: string,
    datePublished: Date,
    title: string,
    picture: object
};

export type PostView = {
    id: string,
    title: string,
    content: string,
    contentPreview: string,
    picture: string,
    datePublished: string,
    prettyDate: string,
    inputDate: string,
    url: string
};
