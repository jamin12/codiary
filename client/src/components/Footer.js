import React from 'react'
import styled from 'styled-components'

const FooterText = styled.p`
    color: #a1a1a1;
    text-align: center;
    p:first-child{
        padding-top: 60px;
    }
`

const Footer = () => {
  return (
    <div className="home-footer">
        <FooterText>
            <p>제작자: 강경민, 임효현</p>
            <p>이 이상 넣을 얘기가 없어서 고민하다 이거까지만 적음ㅎ</p>
            <p>Copyright ⓒ whs12skeocndwjrdma.</p>
        </FooterText>
    </div>
  )
}

export default Footer;