const CommandManager = {
  loadKeyMapings(customKeyMappings: string) {
    console.log('loadKeyMappings')
  },
}

const defaultKeyMappings = [
  // Move on the current page
  { keys: 'h', command: 'moveLeft' },
  { keys: 'j', command: 'moveDown' },
  { keys: 'k', command: 'moveUp' },
  { keys: 'l', command: 'moveRight' },
  { keys: '<ctrl-b>', command: 'moveLeft' },
  { keys: '<ctrl-n>', command: 'moveDown' },
  { keys: '<ctrl-p>', command: 'moveUp' },
  { keys: '<ctrl-f>', command: 'moveRight' },
  { keys: 'H', command: 'scrollLeft' },
  { keys: 'J', command: 'scrollDown' },
  { keys: 'K', command: 'scrollUp' },
  { keys: 'L', command: 'scrollRight' },
  { keys: '<shift-ctrl-b>', command: 'scrollLeft' },
  { keys: '<shift-ctrl-n>', command: 'scrollDown' },
  { keys: '<shift-ctrl-n>', command: 'scrollUp' },
  { keys: '<shift-ctrl-n>', command: 'scrollRight' },
  { keys: '<number>-h', command: 'moveLeftByOffset' },
  { keys: '<number>-j', command: 'moveDownByOffset' },
  { keys: '<number>-k', command: 'moveUpByOffset' },
  { keys: '<number>-l', command: 'moveRightByOffset' },
  /*
   * Hints
   * */
  { keys: 'f', command: 'showHints' },
]

const defaultExCommands = {}

const commandDescriptions = {}

export default CommandManager
