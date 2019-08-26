

// Assigns indexes to sheet columns - not used currently
function createColumn () {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  let index = 0
  const column = {}
  for (let letter of alphabet) {
    column[letter] = index
    index += 1
  }
  for (let letter of alphabet) {
    column[`A${letter}`] = index
    index += 1
  }
  for (let letter of alphabet) {
    column[`B${letter}`] = index
    index += 1
  }
  for (let letter of alphabet) {
    column[`C${letter}`] = index
    index += 1
  }
  return column
}

exports.column = createColumn()
