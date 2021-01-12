const admin = require('firebase-admin')
const path = require('path')
const os = require('os')
const fs = require('fs')
const moment = require('moment')

const defaultBucket = admin.storage().bucket('repsp123.appspot.com')
const leadersBucket = admin.storage().bucket('repsp123-leaders')
const postsBucket = admin.storage().bucket('repsp123-posts')

const createCompositeImage = require('./createCompositeImage')

const dayOfTheWeekColor = [
  'white', // Sun white
  '#6D3C73', // Mon purple
  'tomato', // Tue red
  '#ffff99', // Wed yellow
  'darkorange', // Thu orange
  '#009933', // Fri green
  'skyblue', // Sat blue
]

const nameAndTitle = leader => `${leader.Title} ${leader.NickName} ${leader.LastName}`

module.exports.createPostPhoto = async (dateID, stateCode, post) => {
  if (!dateID) throw Error(`No dateID`)
  if (!stateCode) throw Error(`No stateCode`)
  if (!post) throw Error(`No post for ${dateID} of ${stateCode}`)

  const postImageName = `${dateID}_psp_${stateCode}.png`
  const logoName = 'public-servants-prayer-scaled.png'
  const postPath = path.join(os.tmpdir(), postImageName)
  const logoPath = path.join(os.tmpdir(), logoName)

  const photoPath1 = path.join(os.tmpdir(), post.leader1.PhotoFile)
  const photoPath2 = path.join(os.tmpdir(), post.leader2.PhotoFile)
  const photoPath3 = path.join(os.tmpdir(), post.leader3.PhotoFile)

  const leader1Photo = leadersBucket.file(post.leader1.PhotoFile)
  const leader2Photo = leadersBucket.file(post.leader2.PhotoFile)
  const leader3Photo = leadersBucket.file(post.leader3.PhotoFile)
  const logo = defaultBucket.file(logoName)

  await Promise.all([
    leader1Photo.download({ destination: photoPath1 }),
    leader2Photo.download({ destination: photoPath2 }),
    leader3Photo.download({ destination: photoPath3 }),
    logo.download({ destination: logoPath }),
  ])

  const text = {
    fullDate: moment(dateID).format('dddd, MMMM Do, YYYY'),
    praying: 'Today we are praying for:',
    leader1: nameAndTitle(post.leader1),
    leader2: nameAndTitle(post.leader2),
    leader3: nameAndTitle(post.leader3),
    url: 'https://thepsp.org',
  }

  const color = dayOfTheWeekColor[new Date(dateID).getDay()]

  await createCompositeImage(photoPath1, photoPath2, photoPath3, logoPath, text, color, postPath)

  const [year, month, day] = dateID.split('-')
  await postsBucket.upload(postPath, {
    destination: `${year}/${month}/${day}/${postImageName}`,
  })

  fs.unlinkSync(photoPath1)
  fs.unlinkSync(photoPath2)
  fs.unlinkSync(photoPath3)
  fs.unlinkSync(postPath)
  fs.unlinkSync(logoPath)
}
