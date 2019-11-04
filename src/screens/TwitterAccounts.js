import React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import 'array-foreach-async'

import { H1, H2 } from '../utilities/formating'
import useUSAState from '../utilities/useUSAState'
import TwitterTimeline from '../TwitterTimeline'
import {
  useHttpsCallable,
  useStateTwitterAccounts,
  useOtherTwitterAccounts,
  useHttpsCallableFunction,
} from '../utilities/firebase'
import Layout from '../Layout'

const TwitterAccessToken = ({ temp_oauth_token, oauth_verifier }) => {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const [result, error] = useHttpsCallable('twitterAccessToken', {
    temp_oauth_token: temp_oauth_token,
    oauth_verifier: oauth_verifier,
  })

  if (!result && !error) enqueueSnackbar('Finalizing authorization...', { variant: 'info' })

  if (result && result.data) {
    enqueueSnackbar(`Authorized ${result.data.accountName}!`, {
      variant: 'success',
    })
    history.push(`/twitter-accounts/${result.data.accountName}`)
  }

  if (error) enqueueSnackbar(`Unable to complete authorization!`, { variant: 'error' })

  return null
}

const AuthorizeResult = ({ accountName }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [result, error] = useHttpsCallable('twitterAuthorize', {
    accountName: accountName,
    callbackUrl: `${window.location.origin}/twitter-accounts`,
  })

  if (!result && !error) enqueueSnackbar('Starting authorization...', { variant: 'info' })

  if (result && result.data) {
    enqueueSnackbar('Forwarding you to Twitter...', { variant: 'info' })
    window.location = result.data.redirectUrl
  }

  if (error) {
    enqueueSnackbar(`Unable to start authorization!`, { variant: 'error' })
  }

  return <Box>{error && <p>Unable to complete authorization</p>}</Box>
}

const Retweets = ({ accountName }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [result, error] = useHttpsCallable('twitterRetweets', {
    accountName: accountName,
  })

  if (result && result.data) {
    return (
      <Box>
        Last 5 retweeted posts:
        {result.data.map(tweet => (
          <Box key={tweet.created_at}>
            <hr />
            <p>{tweet.created_at}</p>
            <p>{tweet.text}</p>
          </Box>
        ))}
      </Box>
    )
  }

  if (error) {
    enqueueSnackbar(`Unable to get retweets`, { variant: 'error' })
  }
  return null
}

const TwitterAccount = ({ account }) => {
  const [showRetweets, setShowRetweets] = React.useState()
  const [showTimeline, setShowTimeline] = React.useState()
  const [authorize, setAuthorize] = React.useState()

  return (
    <Box p={1}>
      <Box m={1}>
        <Button variant="outlined" onClick={() => setShowTimeline(!showTimeline)}>
          Timeline
        </Button>
      </Box>
      <Box m={1}>
        <Button variant="outlined" onClick={() => setShowRetweets(!showRetweets)}>
          Retweets
        </Button>
      </Box>
      <Box m={1}>
        <Button variant="outlined" onClick={() => setAuthorize(true)}>
          Authorize
        </Button>
      </Box>

      {showRetweets && <Retweets accountName={account.accountName} />}
      {showTimeline && <TwitterTimeline accountName={account.accountName} />}
      {authorize && <AuthorizeResult accountName={account.accountName} />}
    </Box>
  )
}

function TwitterAccountHeader({ account }) {
  const params = useParams()
  const history = useHistory()
  const { stateNameFromStateCode } = useUSAState()

  const showAccount = params.accountName === account.accountName

  const handleToggleShowAccount = () => {
    if (showAccount) history.push('/twitter-accounts')
    else history.push(`/twitter-accounts/${account.accountName}`)
  }

  return (
    <Box m={1}>
      <Paper>
        <Box padding={1} display="flex" width="100%">
          <Box p={0}>
            <Button variant="outlined" onClick={handleToggleShowAccount}>
              {account.accountName}
            </Button>
          </Box>
          <Box p={1} flexGrow={1}>
            {account.stateAccount && stateNameFromStateCode(account.stateCode)}
          </Box>
          <Box p={0}>
            {account.credentials && (
              <img src={account.credentials.profile_image_url_https} alt="Twitter profile" />
            )}
          </Box>
        </Box>
        {showAccount && <TwitterAccount account={account} />}
      </Paper>
    </Box>
  )
}

const useTempOauthToken = () => {
  const urlQueryParams = new URLSearchParams(useLocation().search)

  if (!urlQueryParams.get('oauth_verifier')) return null

  return {
    temp_oauth_token: urlQueryParams.get('oauth_token'),
    oauth_verifier: urlQueryParams.get('oauth_verifier'),
  }
}

const CheckForLocked = () => {
  const checkAuthorization = useHttpsCallableFunction('twitterCheckForLocked')
  const [currentlyChecking, setCurrentlyChecking] = React.useState()
  const [accountsLocked, setAccountsLocked] = React.useState([])
  const [complete, setComplete] = React.useState()
  const { stateCodes } = useUSAState()

  React.useEffect(() => {
    const accounts = stateCodes.map(stateCode => `Praying4_${stateCode}`)
    const checkAccounts = async () => {
      await accounts.forEachAsync(async accountName => {
        setCurrentlyChecking(accountName)
        const result = await checkAuthorization({ accountName: accountName })
        if (result && result.data && result.data.locked) {
          setAccountsLocked(accountsLocked => [...accountsLocked, accountName])
        }
      })
      setCurrentlyChecking(false)
      setComplete(true)
    }
    checkAccounts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      {currentlyChecking && <Box m={1}>Checking: {currentlyChecking}</Box>}
      {accountsLocked.length > 0 && (
        <Box m={1}>
          Currently locked:{' '}
          {accountsLocked.map(accountName => (
            <Box key={accountName}>{accountName}</Box>
          ))}
        </Box>
      )}
      {complete && <Box m={1}>Checked all accounts.</Box>}
    </Box>
  )
}

export default () => {
  const tempOauthToken = useTempOauthToken()
  const [stateTwitterAccounts] = useStateTwitterAccounts()
  const [otherTwitterAccounts] = useOtherTwitterAccounts()
  const [showCheckForLocked, setShowCheckForLocked] = React.useState()

  return (
    <Layout>
      <Box m={1}>
        <H1>Twitter Accounts</H1>

        {tempOauthToken && <TwitterAccessToken {...tempOauthToken} />}

        <Box p={0}>
          <Button variant="outlined" onClick={() => setShowCheckForLocked(!showCheckForLocked)}>
            Check for locked accounts
          </Button>
        </Box>

        {showCheckForLocked && <CheckForLocked />}

        <H2>Non-state Accounts</H2>
        {otherTwitterAccounts &&
          otherTwitterAccounts.map(account => {
            return <TwitterAccountHeader account={account} key={account.accountName} />
          })}

        <H2>State Accounts</H2>
        {stateTwitterAccounts &&
          stateTwitterAccounts.map(account => {
            return <TwitterAccountHeader account={account} key={account.accountName} />
          })}
      </Box>
    </Layout>
  )
}
