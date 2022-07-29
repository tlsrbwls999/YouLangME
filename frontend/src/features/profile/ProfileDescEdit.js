import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
// import { currentUser } from '../auth/authSlice';

// css
import classes from "./ProfileEdit.module.scss";

// mui material
import { Avatar, Button, Modal, Box, Icon, Typography, IconButton, TextField, Stack } from "@mui/material";
import { grey } from '@mui/material/colors';


// 리덕스 안거치는 단순 서버 통신 API
import { submitDescription } from './ProfileAPI';



const ProfileDescEdit = (props) => {
  // redux
  const { currentUser } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // console.log(' 프로필 리덕스 테스트:', currentUser);


  const description = props.desc;

  const [open, setOpen] = useState(false);
  const descUploadHandler = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isDescTouched, setIsDescTouched] = useState(false);
  const [ profileDesc, setProfileDesc ] = useState(description || '');
  
  // const [profileImg, setProfileImg] = useState({
  //   profileImageFile: "",
  //   previewImageURL: "",
  // });
  
  const descInputChangeHandler = (event) => {
    // console.log( '자기소개 제출:', event.target.value)
    setIsDescTouched(true)
    setProfileDesc(event.target.value);
  }

  const onDescSubmitHandler = () => {
    if (isDescTouched) {
      submitDescription(profileDesc)
    } else {
      submitDescription(description)
    }
    // console.log( '자기소개 제출2:', profileDesc)
    setOpen(false)
    props.getNewProfileDesc(true)
  }



  

  const style = {
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 360,
    fontWeight: 'bold',
    backgroundColor: 'background.paper',
    border: '3px solid #9BA7AF',
    borderRadius: 5,
    boxShadow: 24,
    px: 4, py: 2,
  };

  

  return (
    <>
      {/* IconButton fontawesome으로 만들기 */}
      {/* <IconButton className={classes.add_profile_img} sx={{ color: green[500] }} onClick={profileUploadHandler}>add_circle</IconButton> */}
      <Icon className={classes.cursor} sx={{ color: grey[400] }} onClick={descUploadHandler}>add_circle</Icon>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3>자기소개 수정</h3>
          <br />
          <TextField
            id="description"
            placeholder="자기소개를 작성해주세요!"
            multiline fullWidth
            minRows={10} margin='dense'
            defaultValue={description}
            variant="filled"
            color="secondary"
            onChange={descInputChangeHandler}
          />
          <Stack direction='row-reverse' spacing={1} className={classes.upload_buttons}>
            <Button onClick={onDescSubmitHandler} color="warning" variant="contained" >
              업로드
            </Button>
            <Button onClick={handleClose} color="success" variant="contained" >
              취소
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
};

export default ProfileDescEdit;