package com.main21.member.service;

import com.main21.exception.ExceptionCode;
import com.main21.member.dto.AuthDto;
import com.main21.member.entity.Member;
import com.main21.member.repository.MemberRepository;
import com.main21.security.exception.AuthException;
import com.main21.security.utils.JwtTokenUtils;
import com.main21.security.utils.RedisUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;

import static com.main21.security.utils.AuthConstants.AUTHORIZATION;
import static com.main21.security.utils.AuthConstants.REFRESH_TOKEN;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
    private final JwtTokenUtils jwtTokenUtils;
    private final MemberRepository memberRepository;
    private final RedisUtils redisUtils;


    /**
     * 사용자 로그아웃 비즈니스 로직 메서드
     * @param accessToken 액세스 토큰
     * @param refreshToken 리프레시 토큰
     * @author mozzi327
     */
    public void logoutMember(String accessToken,
                             String refreshToken) {
        // accessToken parsing(Bearer ..)
        accessToken = jwtTokenUtils.parseAccessToken(accessToken);

        // 복호화가 가능한지 확인
        if (!jwtTokenUtils.validateToken(accessToken))
            throw new AuthException(ExceptionCode.INVALID_AUTH_TOKEN);

        // refreshToken이 존재하는 경우 리프레시 토큰 삭제
        redisUtils.deleteData(refreshToken);


        // 엑세스 토큰 만료 전까지 블랙리스트 처리
        Long expiration = jwtTokenUtils.getExpiration(accessToken);
        redisUtils.setBlackList(accessToken,"Logout" , expiration);
    }


    /**
     * 액세스 토큰 리이슈 메서드
     * @param accessToken 액세스 토큰
     * @param refreshToken 리프레시 토큰
     * @return AuthDto.Response
     * @author mozzi327
     */
    public AuthDto.Response reIssueToken(String accessToken,
                                         String refreshToken, HttpServletResponse res) {

        // accessToken parsing(Bearer ..)
        accessToken = jwtTokenUtils.parseAccessToken(accessToken);

        // 복호화가 가능한지 확인
        if (!jwtTokenUtils.validateToken(accessToken))
            throw new AuthException(ExceptionCode.INVALID_AUTH_TOKEN);

        // refreshToken이 존재하지 않는 경우 예외를 던짐
        if (redisUtils.getData(refreshToken) == null)
            throw new AuthException(ExceptionCode.INVALID_AUTH_TOKEN);

        // 레디스에 저장된 Id 추출
        Long memberId = redisUtils.getId(refreshToken);

        // 액세스 토큰 발행
        Member findMember = ifExistMember(memberId);
        String generateToken = createReIssueToken(findMember);

        res.addHeader(AUTHORIZATION, generateToken);
        res.addHeader(REFRESH_TOKEN, refreshToken);

        return AuthDto.Response.builder()
                .nickname(findMember.getNickname())
                .build();
    }


    /**
     * 토큰 Response 생성 메서드
     * @param findMember 사용자 정보
     * @return AuthDto.Token(액세스 토큰, 리프레시 토큰)
     * @author mozzi327
     */
    private String createReIssueToken(Member findMember) {
        return jwtTokenUtils.generateAccessToken(findMember);
    }


    /**
     * 사용자 식별자를 통해 사용자 정보가 존재하는지 확인하는 메서드
     *
     * @param memberId 사용자 식별자
     * @return Member
     * @author mozzi327
     */
    public Member ifExistMember(Long memberId) {
        return memberRepository
                .findById(memberId)
                .orElseThrow(() -> new AuthException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
