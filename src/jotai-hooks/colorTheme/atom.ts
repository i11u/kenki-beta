import { atom } from 'jotai'

export type ColorTheme = {
  type: string
  icon: string
  header: string
  grid: string
  page: string
  editorBackground: string
  footer: string
  editorConfig: string
  text: string
  textHighlight: string
  border: string
  shadow: string
  sidebarBackground: string
  pageinfoBackground: string
  searchBox: string
  itemSelected: string
  commands: string
  commandOdd: string
  commandEven: string
  blockBorder: string
  boxShadow: string
  background: string
  editorButton: string
  pageTitleText: string
  pageTitleUnderline: string
  collapseMenuBackground: string
  toolsetHintText: string
  currentScaleText: string
  placeholderText: string
  textBlockText: string
}

export const light: ColorTheme = {
  type: 'light',
  icon: '#000000',
  header: '#F3F2EE',
  grid: '#dcdcdc',
  page: '#F3F2EE',
  editorBackground: '#F3F2EE',
  footer: '#F3F2EE',
  editorConfig: '#F3F2EE',
  text: '#737869',
  textHighlight: '#000000',
  border: '#828778',
  shadow: '#dcdcdc',
  sidebarBackground: '#F3F2EE',
  searchBox: '#dcdcdc',
  itemSelected: '#dcdcdc',
  commands: '#EDEAE5',
  commandOdd: '#EDEAE5',
  commandEven: '#F3F2EE',
  blockBorder: '#8d8d8d',
  pageinfoBackground: '#F3F2EE',
  boxShadow: '#b4b4b4',
  background: '#F3F2EE',
  editorButton: '#F3F2EE',
  pageTitleText: '#737869',
  pageTitleUnderline: '#737869',
  collapseMenuBackground: '#F3F2EE',
  toolsetHintText: '#000000',
  currentScaleText: '#000000',
  placeholderText: '#888',
  textBlockText: '#000000',
}

export const dark: ColorTheme = {
  type: 'dark',
  icon: '#ffffff',
  header: '#373B40',
  grid: '#2F4F4FFF',
  page: '#373B40',
  editorBackground: '#373B40',
  editorConfig: '#363c44',
  footer: '#373B40',
  text: '#ffffff',
  textHighlight: '#B7BBAF',
  border: '#ffffff',
  shadow: '#3d444d',
  sidebarBackground: '#373B40',
  searchBox: '#303033',
  itemSelected: '#303033',
  commands: '#25292e',
  commandOdd: '#25292e',
  commandEven: '#2a2e34',
  blockBorder: 'gray',
  pageinfoBackground: '#373B40',
  boxShadow: '#282828',
  background: '#373B40',
  editorButton: '#373B40',
  pageTitleText: '#ffffff',
  pageTitleUnderline: '#ffffff',
  collapseMenuBackground: '#ffffff',
  toolsetHintText: '#ffffff',
  currentScaleText: '#ffffff',
  placeholderText: '#ffffff',
  textBlockText: '#ffffff',
}

export const colorThemeAtom = atom<ColorTheme>(light)
