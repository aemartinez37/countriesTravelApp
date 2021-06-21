import styled from "styled-components";

export const StyledCountry = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 16px;
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export const StyledCountryImage = styled.img`
  border-radius: 9999px;
  height: 100px;
  width: 100px;
`;

export const StyledCountryName = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;

export const StyledCountries = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
  padding: 16px;
`;

export const StyledFlag = styled.img`
  width: 40px;
`;
