import styled from "styled-components";

const StyledCharacter = styled.div`
  border: 1px solid #aaa;
  background-color: #fff;
  padding: 2%;
  margin-bottom: 5px;
  dispaly: flex;
  justifyContent: space-between;
  &:hover {
    opacity: 0.8;
  }
`;

export default StyledCharacter;
