import React from 'react'
import styled from 'styled-components'
import tw from 'tailwind.macro'

export const Container = styled.div`
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  @media (min-width: 768px) {
    width: ${props=>props.width || `auto`};
  }
`

const LabelStyled = styled.div`
  ${tw`p-2 text-2xl flex leading-none`}
  background: ${props => props.background || (props.black ? "black" : "#f9f9f9")};
  color: ${props => props.color || (props.black ? "white" : "black")};
  transition: all 0.3s;
  .label {
    flex-grow: 1;
  }
  .icon {
    ${tw`ml-3 mr-2 self-center`}
  }
  @media (min-width: 768px) {
    ${tw`text-4xl`}
  }
`

export const Label = ({title,placeholder,isDown,onClick,color,background,black}) => {
  
  return(
    <LabelStyled
      onClick={onClick}
      color={!isDown ? color : undefined}
      background={!isDown ? background : undefined}
      black={black}
    >
      <div className="label">
        {isDown ? placeholder : (title || placeholder)}
      </div>
      <div className="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="20" height="20">
          <g fill={!isDown && color ? color : (black ? 'white' : '#000')}>
            <polygon points="199.404,63.993 171.12,35.709 99.702,107.127 28.284,35.709 0,63.993 99.702,163.695"/>
          </g>
        </svg>
      </div>
    </LabelStyled>
  )
}

const SelectViewport = styled.div`
  position: relative;
  .options {
    ${tw`mb-2`}
    max-height: ${props => props.isDown ? `${props.numChildren*60}px` : `0`};
    overflow: hidden;
    transition: max-height 0.3s;
  }
`

export const Select = ({numChildren,isDown,children}) => {
  return(
    <SelectViewport isDown={isDown} numChildren={numChildren}>
      <div className="options">
        {children}
      </div>
    </SelectViewport>
  )
}

export const Option = styled.div`
  ${tw`m-0 pl-2 pr-4 text-2xl`}
  background: ${props => props.black ? 'black': '#f9f9f9'};
  color: ${props => props.black ? 'white': '#000'};
  @media (min-width: 768px) {
    ${tw`text-4xl`}
  }
  &:hover {
    background: ${props => props.black ? '#222': '#efefef'};
  }
`