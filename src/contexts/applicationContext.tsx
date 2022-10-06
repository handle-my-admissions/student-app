import React, { createContext, useState } from 'react'

interface applicationContextType {
  applicationDetails: any
  setApplicationDetails: React.Dispatch<React.SetStateAction<any[]>>
}

export const ApplicationContext = createContext<applicationContextType>({
  applicationDetails: [{}],
  setApplicationDetails: (value: any) => { /** */ }
})

export function ApplicationContextProvider ({ children }: { children: React.ReactNode }): JSX.Element {
  const [applicationDetails, setApplicationDetails] = useState([{}])
  return (
    <ApplicationContext.Provider value={{ applicationDetails, setApplicationDetails }}>
      {children}
    </ApplicationContext.Provider>
  )
}
