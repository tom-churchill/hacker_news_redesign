import {IComment, INewsItem} from "../Interfaces";

export interface IAppState {
    readonly currentArticle: INewsItem | null;
    readonly newsItems: INewsItem[];
    readonly comments: IComment[];
}

const initialState: IAppState = {
    currentArticle: null,
    newsItems: [],
    comments: [],
};

const reducers = (state=initialState, action: any): IAppState => {
        switch (action.type) {
            case "CHANGE_NEWS_ITEMS":
                return {...state, newsItems: action.payload};
            case "CHANGE_COMMENTS":
                return {...state, comments: action.payload};
            case "CHANGE_CURRENT_ARTICLE":
                return {...state, currentArticle: action.payload};
        default:
            return state;
    }
};

export default reducers;