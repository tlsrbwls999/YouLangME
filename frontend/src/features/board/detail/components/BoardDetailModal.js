import { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';
// API
import { fetchBoard, addComment, like, dislike } from '../../boardAPI';
import Modal from '../../../../common/UI/Modal/Modal';
//components
import CommentListItem from './CommentListItem';
import LikeContainer from './LikeContainer';
// mui
import CircularProgress from '@mui/material/CircularProgress';

import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import classes from './BoardDetailModal.module.scss';
import { set } from 'date-fns/esm';
const BoardDetail = (props) => {
  const [boardDetail, setBoardDetail] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [likeUsers, setLikeUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsliked] = useState(false);
  const boardId = useParams().boardId;
  const API_URL = 'http://127.0.0.1:8080/';
  const commentRef = useRef();

  useEffect(() => {
    (async () => {
      const boardInfo = await fetchBoard(boardId);
      const likeUsers = boardInfo.likeUsers;
      const currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
      for (const iterator of likeUsers) {
        if (iterator.id === currentUserId) {
          setIsliked(true);
        }
      }

      setBoardDetail(boardInfo.boardDetail);
      setCommentList(boardInfo.commentList);
      setLikeUsers(boardInfo.likeUsers);

      setIsLoading(false);
    })();
  }, [boardId]);

  const addCommentHandler = async (event) => {
    event.preventDefault();
    const newComment = commentRef.current.value;
    if (!newComment.trim().length) {
      return;
    }
    const response = await addComment(boardId, newComment);
    if (response) {
      setCommentList((prevState) => {
        return [...prevState]; // 이부분 백엔드 쪽에 insert한 댓글 데이터 보내달라고 요청 필요
      });
    }
  };

  const likeHandler = async () => {
    const result = await like(boardId);
    if (result.success) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const addedUser = { id: currentUser.id, name: currentUser.name };
      setIsliked(true);
      setLikeUsers((prevState) => [...prevState, addedUser]);
    }
  };
  const dislikeHandler = async () => {
    const result = await dislike(boardId);
    if (result.success) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      setIsliked(false);
      setLikeUsers((prevState) =>
        prevState.filter((user) => user.id !== currentUser.id)
      );
    }
  };
  return (
    <>
      {!isLoading ? (
        <Modal>
          <div className={classes.wrapper}>
            <div className={classes.header}>
              <img
                src={`${API_URL}image/profile/${boardDetail.userId}.jpg`}
                alt="유저 프로파일 이미지"
              />
              <div className={classes.username}>{boardDetail.userName}</div>
              <div className={classes.createdAt}>
                {boardDetail.modifiedTime}
              </div>
            </div>
            <div className={classes.main}>
              <div className={classes.photoContainer}>
                {boardDetail.imgList.map((image) => (
                  <img
                    key={image}
                    src={`${API_URL}image/board/${image}`}
                    alt="게시판 이미지"
                  />
                ))}
              </div>
              <div className={classes.contentContainer}>
                {boardDetail.contents}
              </div>
              <div className={classes.likeCommentCnt}>
                <div>
                  <LikeContainer
                    isLiked={isLiked}
                    like={likeHandler}
                    dislike={dislikeHandler}
                    cnt={likeUsers.length}
                  />
                </div>
                <div>
                  <ChatBubbleOutlineIcon />
                  {commentList.length}
                </div>
              </div>
              <br />
            </div>
            <div className={classes.comment}>
              <div className={classes.header}>
                <ChatBubbleOutlineIcon />
                <div>댓글</div>
              </div>
              <div className={classes.commentInput}>
                <form onSubmit={addCommentHandler}>
                  <input
                    type="text"
                    placeholder="댓글을 작성해주세요"
                    ref={commentRef}
                  />
                  <button>게시</button>
                </form>
              </div>
              <div className={classes.commentContainer}>
                {commentList.map((comment) => (
                  <CommentListItem key={comment.id} commentInfo={comment} />
                ))}
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default BoardDetail;
