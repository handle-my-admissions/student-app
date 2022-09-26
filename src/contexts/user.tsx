/* eslint-disable react/prop-types */
import React from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '../UserPool';

// {
//   user: undefined,
//   setUser: (user: any) => {},
//   authenticate: (Username: string, Password: string) => Promise,
//   logout: () => {},
// }
type userContextType = {
  user: any,
  setUser: (user: any) => void,
  authenticate: (Username: string, Password: string) => Promise<any>,
  logout: () => void,
}

export const UserContext = React.createContext<userContextType>({
  user: undefined,
  setUser: (user: any) => {},
  authenticate: (Username: string, Password: string) => new Promise((resolve, reject) => {}),
  logout: () => {},
});

const authenticate = async (Username:string, Password:string) => new Promise((resolve, reject) => {
  const user = new CognitoUser({ Username, Pool });
  const authDetails = new AuthenticationDetails({ Username, Password });

  user.authenticateUser(authDetails, {
    onSuccess: (data) => {
      resolve(data);
    },

    onFailure: (err) => {
      reject(err);
    },

    newPasswordRequired: (data) => {
      resolve(data);
    },
  });
});

const logout = () => {
  const user = Pool.getCurrentUser();
  if (user) {
    user.signOut();
  }
};

export const UserContextProvider = ({ children }:{children: React.ReactNode}) => {
  const [user, setUser] = React.useState();
  if (user === undefined) {
    const localUser = Pool.getCurrentUser();
    
    if (localUser) {
      localUser.getSession((err:any, session:any) => {
        if (err) {
          console.log('Error getting the session:', err);
        } else if (session.isValid()) {
          setUser(session);
        }
      });
    } else {
      console.log('No user logged in');
    }
    
  }

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      authenticate,
      logout,
    }}
    >
      {children}
    </UserContext.Provider>
  );
}
