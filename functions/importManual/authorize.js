const fs = require('fs')
const util = require('util')
const readline = require('readline-promise').default
const { google } = require('googleapis')

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json'

async function authorize() {
  // Load client secrets from a local file.
  try {
    const readFile = util.promisify(fs.readFile)
    const content = await readFile('credentials.json')

    // Authorize a client with credentials, then call the Google Sheets API.
    const credentials = JSON.parse(content)
    const { client_secret, client_id, redirect_uris } = credentials.installed
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

    // Check if we have previously stored a token.
    try {
      const token = await readFile(TOKEN_PATH)
      oAuth2Client.setCredentials(JSON.parse(token))
      return oAuth2Client
    } catch (err) {
      return await getNewToken(oAuth2Client)
    }
  } catch (err) {
    if (err) return console.log('Error loading client secret file:', err)
  }
  return null
}

async function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  })
  console.log('Authorize this app by visiting this url:', authUrl)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  })

  const code = await rl.questionAsync('Enter the code from that page here: ')
  rl.close()
  try {
    const result = await oAuth2Client.getToken(code)
    oAuth2Client.setCredentials(result.tokens)
    // Store the token to disk for later program executions
    try {
      const writeFile = util.promisify(fs.writeFile)
      await writeFile(TOKEN_PATH, JSON.stringify(result.tokens))
    } catch (err) {
      return console.error(err)
    }
    console.log('Token stored to', TOKEN_PATH)
    return oAuth2Client
  } catch (err) {
    if (err) return console.error('Error while trying to retrieve access token', err)
  }
  return null
}

module.exports.authorize = authorize
