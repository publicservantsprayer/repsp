const spawn = require('child-process-promise').spawn

const goldenRatio = 1.61803398875
const photoWidth = 108
const photoHeight = 148
const logoHeight = 123
const padding = Math.round(photoWidth / goldenRatio / 2)
const halfPadding = Math.round(padding / 2)

const widthOfPhotos = (photoWidth * 3) + (padding * 2)
const photoSideMargin = Math.round(widthOfPhotos / goldenRatio / 2)

const imageWidth = widthOfPhotos + (photoSideMargin * 2)
const imageHeight = imageWidth
const imageSize = `${imageWidth}x${imageHeight}`

const dateFontSize = 24
const prayingFontSize = 36
const leaderFontSize = 18

const photo1X = photoSideMargin
const photo2X = photoSideMargin + photoWidth + padding
const photo3X = photoSideMargin + photoWidth + padding + photoWidth + padding

const dateY = padding + halfPadding
const photosY = dateY + dateFontSize + halfPadding
const prayingTextY = photosY + photoHeight + padding
const leader1TextY = prayingTextY + prayingFontSize + halfPadding
const leader2TextY = leader1TextY + leaderFontSize + halfPadding
const leader3TextY = leader2TextY + leaderFontSize + halfPadding
const logoY = leader3TextY + leaderFontSize + halfPadding
const urlY = logoY + logoHeight

const photo1Geo = `+${photo1X}+${photosY}`
const photo2Geo = `+${photo2X}+${photosY}`
const photo3Geo = `+${photo3X}+${photosY}`
const logoGeo = `+${0}+${logoY}`

module.exports = async (photo1, photo2, photo3, logo, text, color, image) => {
  // create background
  await spawn('convert', ['-size', imageSize, 'xc:black', image])
  // add photos
  await spawn('composite', ['-geometry', photo1Geo, photo1, image, image])
  await spawn('composite', ['-geometry', photo2Geo, photo2, image, image])
  await spawn('composite', ['-geometry', photo3Geo, photo3, image, image])
  // add text
  await placeText(image, text.fullDate, dateY, dateFontSize)
  await placeText(image, text.praying, prayingTextY, prayingFontSize, color, 'arial-bold')
  await placeText(image, text.leader1, leader1TextY, leaderFontSize, 'khaki')
  await placeText(image, text.leader2, leader2TextY, leaderFontSize, 'khaki')
  await placeText(image, text.leader3, leader3TextY, leaderFontSize, 'khaki')
  // add logo
  await spawn('composite', ['-gravity', 'north', '-geometry', logoGeo, logo, image, image])
  await placeText(image, text.url, urlY, leaderFontSize, 'darkorange')
  // add border
  await spawn('convert', ['-border', '16', '-bordercolor', color, image, image])
  await spawn('convert', ['-border', '9', '-bordercolor', 'black', image, image])
}

const placeText = async (image, text, yPosition, fontSize, color = 'white', font = 'Arial') => {
  const options = [
    image,
    '-background', 'none',
    '-fill', color,
    '-gravity', 'north',
    '-pointsize', fontSize,
    '-font', font,
    '-annotate', `+0+${yPosition}`, `${text}`,
    image
  ]
  return spawn('convert', options)
}
