package com.a603.youlangme.controller;

import com.a603.youlangme.dto.user.*;
import com.a603.youlangme.entity.Favorite;
import com.a603.youlangme.entity.User;
import com.a603.youlangme.enums.Language;
import com.a603.youlangme.enums.Nationality;
import com.a603.youlangme.response.CommonResult;
import com.a603.youlangme.response.OneResult;
import com.a603.youlangme.service.ResponseService;
import com.a603.youlangme.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final ResponseService responseService;


    // 유저 정보 조회 (유저 테이블)
    // 시큐리티 설정....
    @GetMapping("/{id}")
    public OneResult<UserEntireInfoResponseDto> getEntireInfo(@PathVariable("id") Long id) {

        User user = userService.findUserById(id);

        return responseService.getOneResult(new UserEntireInfoResponseDto(user));
    }


    // 이메일 중복 체크
    @GetMapping("/check-email")
    public CommonResult checkEmail(@RequestParam("email") String emailToCheck) {
        User user = userService.findUserByEmail(emailToCheck);

        // 있으면(중복이면) true
        return responseService.getOneResult(user!=null);
    }

    // 이름 중복 체크
    @GetMapping("/check-name")
    public CommonResult checkName(@RequestParam("name") String nameToCheck) {
        User user = userService.findUserByName(nameToCheck);

        // 있으면(중복이면) true
        return responseService.getOneResult(user!=null);
    }

    // 사용자 기본 정보 저장
    @PostMapping("/basic-info")
    public CommonResult setBasicInfo(@RequestBody UserSetBasicInfoRequestDto userSetBasicInfoRequestDto){

        // 로그인 유저 가져오기
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        log.info("=3=3=3==3=3=="+userSetBasicInfoRequestDto.toString());
        userService.updateBasicInfo(loginUser.getId(), userSetBasicInfoRequestDto);



        return responseService.getSuccessResult();
    }

    // Profile Start

    @PostMapping("/description") // Create & Update
    public CommonResult setUserDescription (@RequestBody Map<String, String> descriptionMap) {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        userService.updateUserDescription(loginUser.getId(), descriptionMap.get("description"));

        return responseService.getSuccessResult();
    }

    @GetMapping("/image/{id}") // Read
    public CommonResult showUserImage(@PathVariable(value = "id") Long id) throws IOException {
        byte[] image = userService.findUserImage(id);
        return responseService.getOneResult(image);
    }

    @PostMapping("/image") // Create & Update
    public CommonResult setUserImage (@RequestParam("imageFile") MultipartFile file) throws IOException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        userService.updateUserImage(loginUser.getId(), file);

        return responseService.getSuccessResult();
    }

    @GetMapping("/profile/{id}") // Read
    public OneResult<UserProfileResponseDto> showUserProfile (@PathVariable(value ="id") Long id) throws IOException {
        UserProfileResponseDto userProfileResponseDto = userService.findUserProfile(id);
        return responseService.getOneResult(userProfileResponseDto);
    }


    // test
    @PostMapping("/images") // Create & Update
    public CommonResult setUserImages (@RequestParam("imageFile") List<MultipartFile> files, @RequestParam("asd") String asd) throws IOException {
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        User loginUser = (User) authentication.getPrincipal();

        //userService.updateUserImage(loginUser.getId(), file);
        System.out.println(files);
        System.out.println(asd);
        return responseService.getSuccessResult();
    }


    // Profile End


}