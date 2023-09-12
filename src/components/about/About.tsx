import styled from "styled-components";
import { Box, Container, Typography } from "@material-ui/core";
import { Canvas } from "@react-three/fiber";

import Steve from "./aboutAnimation/Steve";
import Carlo from "./aboutAnimation/Carlo";
import HanBH from "./aboutAnimation/HanBH";

const Wrap = styled(Container)`
  && {
    margin: 0 auto;
    padding: 2rem;
    max-width: none;
    text-align: left;
    overflow-y: auto;
    text-align: center;
  }

  &.mobile {
    padding: 1rem;
  }

  // 스크롤바
  &::-webkit-scrollbar {
    width: 6px;
  } /* 스크롤 바 */
  &::-webkit-scrollbar-track {
    background-color: "transparent";
  } /* 스크롤 바 밑의 배경 */

  &:hover {
    // 스크롤바
    &::-webkit-scrollbar {
      width: 6px;
    } /* 스크롤 바 */
    &::-webkit-scrollbar-track {
      background-color: transparent;
    } /* 스크롤 바 밑의 배경 */
    &::-webkit-scrollbar-thumb {
      background-color: #e6e6e6;
    } /* 실질적 스크롤 바 */
    &::-webkit-scrollbar-thumb:hover {
      background: #e6e6e6;
    } /* 실질적 스크롤 바 위에 마우스를 올려다 둘 때 */
    &::-webkit-scrollbar-thumb:active {
      background: #e6e6e6;
    } /* 실질적 스크롤 바를 클릭할 때 */
    &::-webkit-scrollbar-button {
      display: none;
    } /* 스크롤 바 상 하단 버튼 */
  }

  & img {
    max-width: 100%;
  }
`;

const MainBox = styled(Box)`
  position: relative;
  height: 100%;
  z-index: 2;
`;

const TextBox = styled(Box)`
  padding: 2rem;
  color: #fff;
  p {
    line-height: 1.8;
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  }
  &:before {
    content: "";
    margin: 3rem auto 5rem;
    width: 15%;
    height: 2px;
    display: block;
    background: #fff;
  }
`;

const ParallaxArea = styled(Box)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
`;

const CanvasBox = styled(Box)`
  margin: 0 auto;
  max-width: 25em;
  height: 25em;
  width: 100%;
`;
interface ContainerInterface {
  isMobile: string;
}

const _ = ({ isMobile }: ContainerInterface) => {
  return (
    <>
      <Wrap className={isMobile}>
        <MainBox>
          <Box>
            <CanvasBox className={isMobile ? isMobile : ""}>
              <Canvas>
                <Steve isMobile={isMobile} />
              </Canvas>
            </CanvasBox>
            <TextBox>
              <Typography>
                안녕하세요. 퍼블리셔 경력을 가진 프론트엔드 개발자
                Steve(김승태)라고 합니다.
              </Typography>
              <Box mt={2}>
                <Typography>
                  다양한 효과나 움직임에 대한 관심이 많아
                  <br /> ThreeJs와 gsap, css3 등 각종 효과를 사용하여 만들어본{" "}
                  <br />
                  포트폴리오 사이트입니다.
                </Typography>
              </Box>
            </TextBox>
          </Box>

          {/* <Box mt={30}>
            <CanvasBox>
              <Canvas>
                <HanBH isMobile={isMobile} />
              </Canvas>
            </CanvasBox>
            <TextBox>
              <Typography>안녕하세요. 백엔드 개발자 HanBH입니다.</Typography>
            </TextBox>
          </Box>

          <Box mt={30}>
            <CanvasBox>
              <Canvas>
                <Carlo isMobile={isMobile} />
              </Canvas>
            </CanvasBox>
            <TextBox>
              <Typography>
                안녕하세요! 3년차 백엔드 개발자 Carlo(박진성)입니다.
              </Typography>
              <Typography>
                주요 기술 스택으로는 Java, Spring, JPA, ElasticSearch 가
                있습니다. <br />
                좋아하는 건 게임, 유튜브 시청 입니다.
              </Typography>
            </TextBox>
          </Box> */}
        </MainBox>
        <ParallaxArea></ParallaxArea>
      </Wrap>
    </>
  );
};

export default _;
