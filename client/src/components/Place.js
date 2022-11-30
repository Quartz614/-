import React from 'react';
import styled from 'styled-components';
import { ImStarFull } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { useSetRecoilState, useResetRecoilState } from 'recoil';

import { DetailInformation, PlaceIDState, mainDataState } from '../atoms';

function Place({ placeData }) {
  const setFocusPlaceID = useSetRecoilState(PlaceIDState);
  const resetDetailInformation = useResetRecoilState(DetailInformation);
  const resetPlaces = useResetRecoilState(mainDataState);

  const { address, charge, image, score, title, placeId } = placeData;

  const slicedTitle = title.slice(0, 15);

  const onClickPlaceComponent = () => {
    resetPlaces();
    resetDetailInformation();
    setFocusPlaceID(placeId);
  };

  const onClickPlaceContainer = e => {
    e.stopPropagation();
  };

  const chargePerHour = new Intl.NumberFormat('ko-KR').format(charge);

  return (
    <MainContainer onClick={onClickPlaceContainer}>
      <Link to={`/detail/${placeId}`}>
        <MainComponent onClick={onClickPlaceComponent}>
          <Image src={image} />
          <TitleContainer>
            <PlaceName>{slicedTitle}</PlaceName>
            <ImStarFull className="starIcon" />
            <PlaceScore>{score}</PlaceScore>
          </TitleContainer>
          <PlaceAddress>{address}</PlaceAddress>
          <PlaceCharge>{chargePerHour}원</PlaceCharge>
        </MainComponent>
      </Link>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  a {
    text-decoration: none;
    color: #2b2b2b;
  }
`;

const MainComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 280px;
  padding: 10px;
  z-index: 10px;
`;

const Image = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin-bottom: 10px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
  padding-bottom: 6px;
  .starIcon {
    color: #ffce31;
    padding-bottom: 2px;
  }
`;

const PlaceName = styled.div`
  width: 83%;
  font-weight: bold;
  font-size: 15px;
  word-break: keep-all;
`;

const PlaceAddress = styled.div`
  width: 100%;
  font-size: 15px;
  padding-bottom: 5px;
`;

const PlaceScore = styled.div`
  margin-top: 1px;
  font-family: inherit;
`;

const PlaceCharge = styled.div`
  text-align: right;
  width: 100%;
  color: #eb7470;
  font-weight: bold;
`;

export default Place;