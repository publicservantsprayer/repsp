const createCompositeImage = require('./createCompositeImage')

const text = {
  fullDate: 'Sunday, January 1, 2019',
  praying: 'Today we are praying for:',
  leader1: 'Alaska Representative Story Andi',
  leader2: 'Alaska Representative Benjamin Carpenter',
  leader3: 'Alaska Representative Gabrielle LeDoux',
  url: 'https://thepsp.org',
}

createCompositeImage(
  'leader1.jpg',
  'leader2.jpg',
  'leader3.jpg',
  'public-servants-prayer-scaled.png',
  text,
  //'#6D3C73', // purple
  'white',
  'post.png'
)
