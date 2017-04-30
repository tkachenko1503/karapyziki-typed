export type PageData = {
    site: object,
    page: object
};

export type PostData = {
    content: string,
    datePublished: Date,
    title: string
};

export type PostView = {
    title: string,
    content: string,
    contentPreview: string,
    picture: string,
    datePublished: string,
    prettyDate: string,
    url: string
};
