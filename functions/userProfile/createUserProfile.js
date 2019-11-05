module.exports.createUserProfile = async (db, user) => {
  const profile = await db
    .collection('userProfiles')
    .doc(user.uid)
    .get()
  if (!profile.exists) {
    return db
      .collection('userProfiles')
      .doc(user.uid)
      .set({
        email: user.email,
        sendDailyEmail: true,
      })
  }
  return null
}
