package com.main21.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * 로그인 및 토큰 재발급을 위한 Dto 클래스 모음
 * @author mozzi327
 */
public class AuthDto {
    @Getter
    @AllArgsConstructor
    public static class Login {
        private String email;
        private String password;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Token {
        private String accessToken;
        private String refreshToken;
    }

    @Getter
    public static class Response {
        private final String accessToken;
        private final String nickname;
        private final String email;

        @Builder
        public Response(String accessToken, String nickname, String email) {
            this.accessToken = accessToken;
            this.nickname = nickname;
            this.email = email;
        }
    }
}
