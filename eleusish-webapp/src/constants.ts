export const defaultRule = `
const RED = 'red';
const BLACK = 'black';

const suitesToColor = {
  Diamonds: RED,
  Hearts: RED,
  Clubs: BLACK,
  Spades: BLACK
}

const ranksToNumber = {
  Ace: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Height: 8,
  Nine: 9,
  Ten: 10,
  Jack: 11,
  Queen: 12,
  King: 13
}

function getColor(card) {
  return suitesToColor[card.Suite]
}

function getNumber(card) {
  return ranksToNumber[card.Rank]
}

// Card example:
// const card = { Suite: 'Diamonds', Rank: 'Ace' }

function getInitialCards (remainingCards) {
  return [];
}

function isValid (previousCards, newCard) {
  return true;
}
`
