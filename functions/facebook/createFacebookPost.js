const leaderName = leader => `${leader.Prefix} ${leader.NickName} ${leader.LastName}`

const description = (dateID, stateCode, post) => {
  const [year, month, day] = dateID.split('-')
  let description

  description = 'Today we are praying for '
  description +=
    `${leaderName(post.leader1)}, ${leaderName(post.leader2)}, ` +
    `and ${leaderName(post.leader3)}.`
  description += '\n#Pray4Leaders'
  description += `\nhttps://thepsp.org/states/${stateCode.toLowerCase()}/${year}/${month}/${day}/`
  description += '\n'
  description += post.leader1.Facebook ? `\n${post.leader1.Facebook}` : ''
  description += post.leader2.Facebook ? `\n${post.leader2.Facebook}` : ''
  description += post.leader3.Facebook ? `\n${post.leader3.Facebook}` : ''

  return description
}

const imageUrl = (dateID, stateCode) => {
  const [year, month, day] = dateID.split('-')

  let url = 'https://firebasestorage.googleapis.com/v0/b/repsp123-posts/o/'
  url += `${year}%2F${month}%2F${day}%2F${dateID}_psp_${stateCode}.png?alt=media`

  return url
}

module.exports.createFacebookPost = async (db, dateID, stateCode, post) => {
  const facebookPostCollection = db
    .collection('states')
    .doc(stateCode)
    .collection('facebookPosts')

  const facebookPost = {
    dateID: dateID,
    description: description(dateID, stateCode, post),
    image: imageUrl(dateID, stateCode),
  }

  return facebookPostCollection.doc(dateID).set(facebookPost)
}
