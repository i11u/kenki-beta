/*
 * SidebarState is the state to specify the view of the sidebar peculiar to each content.
 * DEFAULT state is the toplevel. You can switch to each content.
 * */
export type SidebarState = 'DEFAULT' | 'NOTEBOOKS' | 'ARCHIVES' | 'THEMES' | 'KEYBOARDS' | 'GUIDES' | 'FORUM'

/*
 * WorkingModule specifies which module you are working on at the moment.
 * Currently, you can traverse through sidebar, editor, and pageinfo.
 * The keybinding for this is 'ctrl+tab' (& its shifted keybinding), which is the same as browser tab switching.
 * */
export type WorkingModule = 'SIDEBAR' | 'EDITOR1' | 'EDITOR2' | 'EDITOR3' | 'EDITOR4' | 'PAGEINFO'

export type EditorState = 'CURSOR' | 'TEXT' | 'RECT' | 'ELLIPSE' | 'LINE' | 'ARROW' | 'PICTURE' | 'VIDEO'

export type KenkiElement = {
  name: string
}
