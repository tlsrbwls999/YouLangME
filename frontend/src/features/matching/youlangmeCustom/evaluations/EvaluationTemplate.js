
import CancelIcon from '@mui/icons-material/Cancel';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import axios from 'axios';
import { useState } from 'react';
import { accessToken, API_URL } from '../../../../common/api/http-config';

// css
import classes from './EvaluationTemplate.module.scss';

const EvaluationTemplate = (props) => {
    console.log(props.sessionId)
    const closeModal = () => {
        props.toggleModal();
    };

  const [isEvaluation, setIsEvaluation] = useState(null)

  const closeSessionTrue = (event) => {
    console.log(props.sessionId)
    axios.delete(API_URL + `meeting/end/${props.sessionId}`, {headers: {
        'X-AUTH-TOKEN': accessToken,
      }})
      .then((res)=> {
        console.log(res.data)
        props.leaveSession()
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const closeSessionFalse = (event) => {
    console.log(props.sessionId)
    axios.delete(API_URL + `meeting/end/${props.sessionId}`, {headers: {
        'X-AUTH-TOKEN': accessToken,
      }})
      .then((res)=> {
        console.log(res.data)
        props.leaveSession()
      })
      .catch((err) => {
        console.log(err.message)
      })
  }



  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div>Evaluation</div>
            <div onClick={closeModal}>
              <CancelIcon />
            </div>
          </div>
          <div className={classes.main}>
             <div>채팅에 만족하셨습니까?</div>
                <SentimentSatisfiedAltIcon fontSize="large" onClick={(e)=>closeSessionTrue(e)} />
                <SentimentVeryDissatisfiedIcon  fontSize="large" onClick={(e)=>closeSessionFalse(e)} />
          </div>
        </div>
      </div>
    </>
  );
};
export default EvaluationTemplate;