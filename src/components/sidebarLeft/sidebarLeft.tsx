import styled from 'styled-components'
import React, { useEffect, useRef, useState } from 'react'
import { editorConfigSelectors } from '../../jotai-hooks/editorConfig/selector'
import { pageConfigSelectors } from '../../jotai-hooks/pageConfig/selector'
import usePreventPinch from '../../hooks/usePreventPinch'
import useIsFirst from '../../hooks/useIsFirst'
import useOnResizeEffect from '../../hooks/useOnResizeEffect'
import { modeSelectors } from '../../jotai-hooks/mode/selector'
import Contents from './contents'
import Title from './title'
import Search from './search'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { RelationOrient, RelationType } from '../../jotai-hooks/relations/atom'

export type ContentData = {
  key: string
  orient: RelationOrient
  type: RelationType
  description: string
}

export const contents: ContentData[] = [
  {
    key: 'normal-arrow-outward',
    orient: 'outward',
    type: 'normal',
    description: 'outward arrow with a label placeholder',
  },
  {
    key: 'normal-arrow-inward',
    orient: 'inward',
    type: 'normal',
    description: 'inward arrow with a label placeholder',
  },
  {
    key: 'thick-arrow-outward',
    orient: 'outward',
    type: 'thick',
    description: 'thick outward arrow with a label placeholder',
  },
]

const SidebarLeft = () => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  usePreventPinch(sidebarRef)
  const gridNum = pageConfigSelectors.useGridNum()
  useOnResizeEffect(gridNum.rowNum, sidebarRef)

  // SidebarLeft Animation
  const sidebarLeftIsOpen = editorConfigSelectors.useSidebarLeftIsOpen()
  const style = useIsFirst()
    ? { width: '0' }
    : {
        animationName:
          sidebarLeftIsOpen === undefined ? '' : sidebarLeftIsOpen ? 'animate-sidebar-1' : 'animate-sidebar-2',
      }

  // Search relations
  const mode = modeSelectors.useCurrentMode()
  const [word, setWord] = useState('Enter keyword')
  const [buffer, setBuffer] = useState('')
  const [selectedContentIndex, setSelectedContentIndex] = useState<number>(-1)
  const matchingContents =
    buffer === 'Enter keyword' || '' ? contents : contents.filter((command) => command.description.match(buffer))
  const colorTheme = colorThemeSelector.useColorTheme()

  useEffect(() => {
    if (selectedContentIndex === -1) {
      setWord(buffer)
    } else {
      setWord(matchingContents[selectedContentIndex].key)
    }
  }, [buffer, matchingContents, selectedContentIndex, setSelectedContentIndex])

  const separationIsVisible = editorConfigSelectors.useSeparationIsVisible()

  return (
    <StyledSidebar
      id="sidebar-left"
      ref={sidebarRef}
      style={{
        ...style,
        backgroundColor: colorTheme.sidebarBackground,
        borderRight:
          sidebarLeftIsOpen === true ? `0.5px solid ${separationIsVisible ? colorTheme.border : 'transparent'}` : '',
      }}
    >
      <StyledFlex>
        <Title />
        <Search
          word={word}
          setWord={setWord}
          buffer={buffer}
          setBuffer={setBuffer}
          selectedContentIndex={selectedContentIndex}
          setSelectedContentIndex={setSelectedContentIndex}
          matchingContents={matchingContents}
        />
        <Contents buffer={buffer} selectedContentIndex={selectedContentIndex} matchingContents={matchingContents} />
      </StyledFlex>
    </StyledSidebar>
  )
}

const StyledSidebar = styled.div`
  top: 34px;
  height: calc(100% - 50px);
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  position: fixed;
  box-sizing: border-box;
  z-index: 1;
`

const StyledFlex = styled.div`
  position: relative;
  width: calc(100% - 1px);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px 0;
  z-index: 0;
`

export default React.memo(SidebarLeft)
