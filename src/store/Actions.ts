import {IComment, INewsItem} from "../Interfaces";
import {MenuType} from "../Enums";
import {IAppState} from "./Reducers";
import {ThunkAction} from "redux-thunk";

export const updateNewsItems = (menuType: MenuType): ThunkAction<void, IAppState, undefined, any> => {
    return (dispatch) => {
        // reset the news items to empty when the page changes
        dispatch({type: "CHANGE_NEWS_ITEMS", payload: []});

        // which page type to fetch
        let url: string;
        switch (menuType) {
            case MenuType.popular:
                url = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
                break;
            case MenuType.new:
                url = `https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`;
                break;
            case MenuType.ask:
                url = `https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty`;
                break;
            case MenuType.show:
                url = `https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty`;
                break;
        }

        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            const firstId = data[0];
            const newsItems: INewsItem[] = [];

            for (const [i, id] of data.entries()) {
                const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;

                fetch(url).then(response => {
                    return response.json();
                }).then(data => {
                    const newsItem: INewsItem = {
                        id: data.id,
                        title: data.title,
                        url: data.url,
                        kids: data.kids,
                        score: data.score,
                        by: data.by,
                    };

                    newsItems[i] = newsItem;

                    // the web requests aren't necessarily going to be coming in sequentially, so filter out any
                    // news items that haven't come in yet and will still be undefined
                    const orderedNewsItems = newsItems.filter(x => x !== undefined);
                    dispatch({type: "CHANGE_NEWS_ITEMS", payload: orderedNewsItems});

                    // change the current article to be the first item returned
                    if (id === firstId) {
                        dispatch(changeActiveNewsItem(newsItem));
                    }
                });

                // only get the first 15 items
                if (i >= 14) {
                    break;
                }
            }
        });
    }
};


export const changeActiveNewsItem = (article: INewsItem): ThunkAction<void, IAppState, undefined, any> => {
    return (dispatch) => {
        dispatch({type: "CHANGE_CURRENT_ARTICLE", payload: article});
        // clear the comments when the active news item changes
        dispatch({type: "CHANGE_COMMENTS", payload: []});

        const url = `https://hacker-news.firebaseio.com/v0/item/${article.id}.json?print=pretty`;

        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            const kids = (data?.kids || []) as number[]; // kids isn't defined if there are no comments
            const comments: IComment[] = [];

            for (const [i, commentID] of kids.entries()) {
                const commentUrl = `https://hacker-news.firebaseio.com/v0/item/${commentID}.json?print=pretty`;

                fetch(commentUrl).then(response => {
                    return response.json();
                }).then(commentData => {
                    // dont add comments that have been deleted
                    if (commentData !== null && commentData.deleted !== true) {
                        // !== true instead of === false since the property is only sometimes defined

                        comments[i] = {
                            text: commentData.text,
                            by: commentData.by
                        };

                        const orderedComments = comments.filter(x => x !== undefined);
                        dispatch({type: "CHANGE_COMMENTS", payload: orderedComments});
                        return commentData.text;
                    }
                });

                // only get the first 10 items
                if (i >= 9) {
                    break;
                }
            }
        });
    }
};
