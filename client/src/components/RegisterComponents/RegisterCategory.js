import React from 'react';
import styled from 'styled-components';

const categories = [
  { id: 0, place: '공유오피스' },
  { id: 1, place: '캠핑' },
  { id: 2, place: '바다근처' },
  { id: 3, place: '짐보관' },
  { id: 4, place: '파티룸' },
  { id: 5, place: '게스트하우스' },
  { id: 6, place: '호텔' },
  { id: 7, place: '스터디룸' },
  { id: 8, place: '계곡근처' },
  { id: 9, place: '공연장' },
];

// TODO
// 변수명 바꾸기
// onChange 함수 바꾸기
function RegisterCategory({ checkedList, setCheckedList }) {
  const handleCategory = (isChecked, item) => {
    if (isChecked) {
      setCheckedList([...checkedList, item]);
    } else if (!isChecked) {
      setCheckedList(checkedList.filter(el => el !== item));
    }
  };

  return (
    <Wrapper>
      {categories.map(category => (
        <Category key={category.id}>
          <input
            type="checkbox"
            id={category.id}
            value={category.place}
            checked={checkedList.includes(category.place)}
            onChange={event =>
              handleCategory(event.target.checked, event.target.value)
            }
          />
          <Label htmlFor={category.id}>{category.place}</Label>
        </Category>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 95%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;

  input {
    margin: 0px;
  }
`;

const Category = styled.div`
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  word-break: keep-all;
  margin-bottom: 3px;
`;

const Label = styled.label`
  color: #2b2b2b;
  margin-left: 4px;
`;

export default RegisterCategory;