export const leaderPhoto = leader => {
  return `https://firebasestorage.googleapis.com/v0/b/repsp123-leaders/o/${leader.PhotoFile}?alt=media`
}

export const leaderUrl = leader => {
  return `/leader/${leader.permaLink}`
}
