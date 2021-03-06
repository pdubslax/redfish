import React, { useState, useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import SocialLogin from 'react-social-login'
// Hooks
import useBrowser from '../hooks/useBrowser'

const AUTH_WITH_FACEBOOK = gql`
  mutation authWithFacebook($accessToken: String!) {
    authWithFacebook(input: { accessToken: $accessToken }) {
      key
    }
  }
`

const Button = ({ children, triggerLogin, densed, ...props }) => (
  <button
    className={densed ? 'facebook-button-densed' : 'facebook-button'}
    onClick={() => triggerLogin()}
    {...props}
  >
    {children}
  </button>
)

const SocialButton = SocialLogin(Button)

function AuthWithFacebook(props) {
  const isBrowser = useBrowser()

  const [isAuth, setIsAuth] = useState(false)
  const [
    authWithFacebook,
    { loading: mutationLoading, error, data },
  ] = useMutation(AUTH_WITH_FACEBOOK)
  const [accessToken, setAccessToken] = useState()

  // Turn on spinner
  const client = useApolloClient()
  useEffect(() => {
    client.writeData({ data: { sending: mutationLoading || isAuth || false } })
  }, [mutationLoading, isAuth])

  useEffect(() => {
    accessToken && !data && sendAuthenticationRequest()
    isAuth && redirectToAppPage()
  }, [accessToken, isAuth])

  useEffect(() => {
    if (error) {
      alert(
        `Error message from a redfish server:\n ${error.graphQLErrors.map(
          ({ message }, i) => `${message}\n`
        )}`
      )
    }
    data && handleResponse()
  }, [data, error])

  const sendAuthenticationRequest = () =>
    authWithFacebook({ variables: { accessToken: accessToken } })

  const redirectToAppPage = () =>
    window.location.replace(process.env.GATSBY_APP_URL)

  const handleResponse = () => {
    // Handle response from Redfish
    localStorage.setItem('token', data.authWithFacebook.key)
    setIsAuth(true)
  }

  const onLoginSuccess = response => {
    console.log('facebook success response', response)
    setAccessToken(response._token.accessToken)
  }

  const onLoginFailure = response =>
    alert(`facebook failure response: ${response}`)

  return (
    <div>
      {isBrowser && (
        <SocialButton
          provider="facebook"
          appId={process.env.GATSBY_OAUTH_FACEBOOK_CLIENT_ID}
          onLoginSuccess={onLoginSuccess}
          onLoginFailure={onLoginFailure}
          densed={props.densed}
        >
          {props.children}
        </SocialButton>
      )}
    </div>
  )
}

export default AuthWithFacebook
