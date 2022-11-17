import { atom } from 'jotai'

export type Mode =
  | 'CURSOR'
  | 'EDIT'
  | 'COMMAND'
  | 'SELECT'
  | 'MULTISELECT'
  | 'BLOCKHINT'
  | 'INSERT'
  | 'SETTINGS'
  | 'HELP'
  | 'TEXT'
  | 'RECT'
  | 'ELLIPSE'
  | 'LINE'
  | 'ARROW'
  | 'PICTURE'
  | 'VIDEO'

export const modeAtom = atom<Mode>('CURSOR')
