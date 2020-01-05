import { handleActions } from "redux-actions";
import { get, pick } from "lodash";
import {
  setCurrentLeftSidebarItem,
  resetPosts,
  fetchPostsSuccess,
  setSearchContent,
  showPostDetail,
  hidePostDetail,
  signInSuccess,
  signOutSuccess,
  alertNotification,
  fetchCategoriesSuccess,
  signInFail,
  signUpSuccess,
  signUpFail,
  updateUser,
  fetchPostCommentsSuccess,
  addPostCommentSuccess,
  filterPostComments,
  likePostComment,
  unLikePostComment
} from "./actions";
import { likeComment, getUserByUsername, unLikeComment } from "../utils";

const initStates = {
  openComment: null,
  authInfo: {
    status: null,
    message: null
  },
  posts: [],
  resetedPosts: true,
  currentItemId: null,
  searchContent: null,
  categories: [],
  post: null,
  commentFilter: "asc",
  notifications: []
};

export const reducer = handleActions(
  {
    [fetchCategoriesSuccess]: (state, { payload }) => ({
      ...state,
      categories: [...(get(payload, "categories") || [])]
    }),
    [setCurrentLeftSidebarItem]: (state, { payload }) => ({
      ...state,
      currentItemId: get(payload, "itemId") || null
    }),
    [resetPosts]: (state, { payload }) => ({
      ...state,
      posts: [],
      resetedPosts: true
    }),
    [fetchPostsSuccess]: (state, { payload }) => ({
      ...state,
      posts: get(payload, "posts") || [],
      resetedPosts: false
    }),
    [setSearchContent]: (state, { payload }) => ({
      ...state,
      searchContent: get(payload, "content")
    }),
    [showPostDetail]: (state, { payload }) => ({
      ...state,
      commentFilter: "desc",
      post: get(payload, "post") || null
    }),
    [hidePostDetail]: (state, action) => ({
      ...state,
      post: null
    }),
    [signInSuccess]: (state, { payload }) => ({
      ...state,
      user: get(payload, "user") || null,
      authInfo: {
        status: true,
        message: null
      }
    }),
    [signInFail]: (state, { payload }) => ({
      ...state,
      user: null,
      authInfo: {
        status: false,
        message: get(payload, "msg")
      }
    }),
    [signUpSuccess]: (state, { payload }) => ({
      ...state,
      authInfo: {
        status: true,
        message: null
      }
    }),
    [signUpFail]: (state, { payload }) => ({
      ...state,
      authInfo: {
        status: false,
        message: get(payload, "msg")
      }
    }),
    [signOutSuccess]: (state, action) => ({
      ...state,
      user: null
    }),
    [alertNotification]: (state, { payload }) => ({
      ...state,
      notifications: [pick(payload, ["type", "message"])]
    }),
    [updateUser]: (state, { payload }) => ({
      ...state,
      user: get(payload, "user")
    }),
    [fetchPostCommentsSuccess]: (state, { payload }) => ({
      ...state,
      post: {
        ...state.post,
        comments: get(payload, "comments") || []
      }
    }),
    [addPostCommentSuccess]: (state, { payload }) => {
      const comment = get(payload, "comment") || null;

      if (!comment) {
        return { ...state };
      }

      const comments = get(state, ["post", "comments"]) || [];

      if (!comment.parentId) {
        return {
          ...state,
          post: {
            ...state.post,
            comments:
              state.commentFilter === "asc"
                ? [...comments, comment]
                : [comment, ...comments]
          }
        };
      }

      const parentIndex = comments.findIndex(
        cmt => cmt.id === comment.parentId
      );

      if (parentIndex < 0) {
        return { ...state };
      }

      comments[parentIndex].children =
        state.commentFilter === "asc"
          ? [...(comments[parentIndex].children || []), comment]
          : [comment, ...(comments[parentIndex].children || [])];

      return {
        ...state,
        post: {
          ...state.post,
          comments
        }
      };
    },
    [filterPostComments]: (state, { payload }) => {
      if (
        get(state, "commentFilter") === (get(payload, "asc") ? "asc" : "desc")
      ) {
        return { ...state };
      }
      let comments = get(state, ["post", "comments"]);

      if (!get(payload, "asc")) {
        comments = comments
          .sort(
            (cmtOne, cmtTwo) =>
              new Date(cmtTwo.createdDate) - new Date(cmtOne.createdDate)
          )
          .map(cmt => ({
            ...cmt,
            children: (cmt.children || []).sort(
              (cmtOne, cmtTwo) =>
                new Date(cmtTwo.createdDate) - new Date(cmtOne.createdDate)
            )
          }));
      } else {
        comments = comments
          .sort(
            (cmtOne, cmtTwo) =>
              new Date(cmtOne.createdDate) - new Date(cmtTwo.createdDate)
          )
          .map(cmt => ({
            ...cmt,
            children: (cmt.children || []).sort(
              (cmtOne, cmtTwo) =>
                new Date(cmtOne.createdDate) - new Date(cmtTwo.createdDate)
            )
          }));
      }

      return {
        ...state,
        post: {
          ...state.post,
          comments
        },
        commentFilter: get(payload, "asc") ? "asc" : "desc"
      };
    },
    [likePostComment]: (state, { payload }) => {
      const commentId = get(payload, "commentId");
      const {
        user: { likeComments = [], username },
        post: { comments }
      } = state;

      if (likeComments.findIndex(cmtId => cmtId === commentId) > -1) {
        return {
          ...state
        };
      }

      likeComment(username, commentId);

      let commentIndex = comments.findIndex(cmt => cmt.id === commentId);

      if (commentIndex > -1) {
        comments[commentIndex].likes++;
      } else {
        commentIndex = comments.findIndex(cmt =>
          cmt.children.findIndex(sCmt => sCmt.id === commentId)
        );

        if (commentIndex > -1) {
          const sCommentIndex = comments[commentIndex].children.findIndex(
            sCmt => sCmt.id === commentId
          );

          if (sCommentIndex > -1) {
            comments[commentIndex].children[sCommentIndex].likes++;
          }
        }
      }

      return {
        ...state,
        user: getUserByUsername(username),
        post: {
          ...state.post,
          comments
        }
      };
    },
    [unLikePostComment]: (state, { payload }) => {
      const commentId = get(payload, "commentId");
      const {
        user: { likeComments = [], username },
        post: { comments }
      } = state;

      if (likeComments.findIndex(cmtId => cmtId === commentId) < 0) {
        return {
          ...state
        };
      }

      unLikeComment(username, commentId);

      let commentIndex = comments.findIndex(cmt => cmt.id === commentId);

      if (commentIndex > -1) {
        comments[commentIndex].likes--;
      } else {
        commentIndex = comments.findIndex(cmt =>
          cmt.children.findIndex(sCmt => sCmt.id === commentId)
        );

        if (commentIndex > -1) {
          const sCommentIndex = comments[commentIndex].children.findIndex(
            sCmt => sCmt.id === commentId
          );

          if (sCommentIndex > -1) {
            comments[commentIndex].children[sCommentIndex].likes--;
          }
        }
      }

      return {
        ...state,
        user: getUserByUsername(username),
        post: {
          ...state.post,
          comments
        }
      };
    }
  },
  initStates
);
