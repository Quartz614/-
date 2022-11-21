package com.main21.reserve.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class MbtiCount {

    @Id
    @Column(name = "MBTI_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "MBTI")
    private String mbti;

    @Column(name = "PLACE_ID")
    private Long placeId;

    @Column(name = "TOTAL_COUNT")
    private Integer totalCount;

    @Builder
    public MbtiCount(String mbti,
                     Long placeId,
                     Integer totalCount) {
        this.mbti = mbti;
        this.placeId = placeId;
        this.totalCount = totalCount;
    }

    public void addOneMbti() {
        totalCount++;
    }
}