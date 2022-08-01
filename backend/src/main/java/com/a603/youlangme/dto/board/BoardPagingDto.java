package com.a603.youlangme.dto.board;

import com.a603.youlangme.entity.User;
import lombok.*;

import javax.persistence.Lob;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardPagingDto {
    // boardId, userId 추가, userName으로 수정
    private Long boardId;
    private String contents;
    private Long userId;
    private String userName;
    private LocalDateTime createdTime;


    //List<BoadrImg>boadrImgList=new ArrayList<>();

   // private Long replyCount; //댓글 개수


}
