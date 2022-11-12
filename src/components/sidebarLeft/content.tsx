import React from 'react'
import { match } from 'ts-pattern'
import styled from 'styled-components'
import normalArrowInward from '../assets/ver-alpha/icons/normal-arrow-inward.svg'
import normalArrowOutward from '../assets/ver-alpha/icons/normal-arrow-outward.svg'
import thickArrowOutward from '../assets/ver-alpha/icons/thick-arrow-outward.svg'
import { ContentData } from './sidebarLeft'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'

const Content = ({ buffer, content, isSelected }: { buffer: string; content: ContentData; isSelected: boolean }) => {
  const { key, description } = content
  const svg = match(key)
    .with('normal-arrow-inward', () => normalArrowInward)
    .with('normal-arrow-outward', () => normalArrowOutward)
    .with('thick-arrow-outward', () => thickArrowOutward)
    .otherwise(() => '')

  const arr = description.split(buffer)
  const colorTheme = colorThemeSelector.useColorTheme()

  return (
    <StyledFlex style={{ backgroundColor: isSelected ? colorTheme.itemSelected : '' }}>
      <svg
        style={{
          position: 'relative',
          color: colorTheme.icon,
          width: '30%',
          height: '60%',
          marginLeft: '10%',
        }}
      >
        <use xlinkHref={`${svg}#relation`} />
      </svg>
      <StyledText style={{ color: colorTheme.text }}>
        {arr.map((str, index) => {
          if (index === arr.length - 1) {
            return <span>{str}</span>
          }
          return (
            <span>
              <span>{str}</span>
              <span style={{ color: 'red' }}>{buffer}</span>
            </span>
          )
        })}
      </StyledText>
    </StyledFlex>
  )
}

const StyledFlex = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`

const StyledText = styled.div`
  position: relative;
  width: 50%;
  margin-right: 5%;
`

export default React.memo(Content)
