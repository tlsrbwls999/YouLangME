import { useState, useEffect, useRef } from 'react';
//API
import { fetchFeed, fetchFeedMore } from './FeedAPI';
import { fetchAllFeed } from './FeedAPI';

// custom component
import FeedBoardItem from './FeedBoardItem';
import FeedFollowItem from './FeedFollowItem';
import CreateNewBoardLink from '../../board/create/component/CreateNewBoardLink';

// external component
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';

import classes from './FeedList.module.scss';

const FeedLIst = (props) => {
  const [followeeFeedList, setFolloweeFeedList] = useState([]);
  const [rightFolloweeFeedList, setRightFolloweeFeedList] = useState([]);
  const [leftFolloweeFeedList, setLeftFolloweeFeedList] = useState([]);

  const [nextFeedId, setNextFeedId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFeedOver, setIsFeedOver] = useState(false);

  let rightWeight = useRef(0);
  let leftWeight = useRef(0);
  useEffect(() => {
    setIsLoading(() => true);
    (async () => {
      const data = await fetchFeed();

      const [rightFeed, leftFeed] = [[], []];

      for (let i = 0; i < data.feedResponseDtoList.length; i++) {
        const tmp = data.feedResponseDtoList[i];
        let weight = 1;
        if (tmp.imgList?.length > 0) {
          weight = 3;
        } else if (tmp.imgList?.length === 0) {
          weight = 2;
        }
        if (rightWeight.current <= leftWeight.current) {
          rightWeight.current = rightWeight.current + weight;
          console.log(rightWeight.current);

          rightFeed.push(tmp);
        } else {
          leftWeight.current = leftWeight.current + weight;
          console.log(leftWeight.current);
          leftFeed.push(tmp);
        }
      }
      setRightFolloweeFeedList((prevState) => [...prevState, ...rightFeed]);

      setLeftFolloweeFeedList((prevState) => [...prevState, ...leftFeed]);

      setNextFeedId(data.nextId);
    })();
    setIsLoading(() => false);
  }, []);

  const fetchFeedMoreHandler = async () => {
    const data = await fetchFeedMore(nextFeedId);
    const [rightFeed, leftFeed] = [[], []];

    for (let i = 0; i < data.feedResponseDtoList.length; i++) {
      const tmp = data.feedResponseDtoList[i];
      let weight = 1;
      if (tmp.imgList?.length > 0) {
        weight = 3;
      } else if (tmp.imgList?.length === 0) {
        weight = 2;
      }
      if (rightWeight.current <= leftWeight.current) {
        rightWeight.current = rightWeight.current + weight;
        console.log(rightWeight.current);

        rightFeed.push(tmp);
      } else {
        leftWeight.current = leftWeight.current + weight;
        console.log(leftWeight.current);
        leftFeed.push(tmp);
      }
    }
    setRightFolloweeFeedList((prevState) => [...prevState, ...rightFeed]);

    setLeftFolloweeFeedList((prevState) => [...prevState, ...leftFeed]);

    setNextFeedId(data.nextId);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div>피드</div>
            <CreateNewBoardLink />
          </div>
          <div className={classes.main}>
            {isLoading ? (
              <div>
                <CircularProgress size={60} />
              </div>
            ) : (
              <>
                <div className={classes.feedArea1}>
                  {rightFolloweeFeedList.map((item) => {
                    let tmp;
                    if (item.logType === 'WRITE_POST') {
                      tmp = (
                        <FeedBoardItem
                          key={item.detail + 'W'}
                          boardInfo={item}
                        />
                      );
                    } else if (item.logType === 'FOLLOWED') {
                      tmp = (
                        <FeedFollowItem
                          key={item.detail + 'F'}
                          followInfo={item}
                        />
                      );
                    }
                    return tmp;
                  })}
                </div>
                <div className={classes.feedArea2}>
                  {leftFolloweeFeedList.map((item) => {
                    let tmp;
                    if (item.logType === 'WRITE_POST') {
                      tmp = (
                        <FeedBoardItem
                          key={item.detail + 'W'}
                          boardInfo={item}
                        />
                      );
                    } else if (item.logType === 'FOLLOWED') {
                      tmp = (
                        <FeedFollowItem
                          key={item.detail + 'F'}
                          followInfo={item}
                        />
                      );
                    }
                    return tmp;
                  })}
                </div>
              </>
            )}
          </div>
          <div className={classes.footer}>
            {nextFeedId !== -1 && (
              <div className={classes.more} onClick={fetchFeedMoreHandler}>
                <div>더보기</div>
                <ExpandMoreIcon />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedLIst;
