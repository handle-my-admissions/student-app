import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: `${process.env.REACT_APP_COGNITO_POOL_ID}`,
  ClientId: `${process.env.REACT_APP_COGNITO_CLIENT_ID}`
}
export default new CognitoUserPool(poolData)
