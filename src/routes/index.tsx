import { NodeElement } from 'rc-tree/lib/interface'
import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { Application, CalendarPage, Dashboard, Documents, Landing, Login, MyApplications, MyQueries, Notices, SignUp } from '../pages'
import Profile from '../pages/Profile'
import { PrivateRoute } from '../utils/PrivateRoute'

function routeCheckWrapper (element: NodeElement): JSX.Element {
  return <PrivateRoute>
        {element}
    </PrivateRoute>
}

export const Routes = (): JSX.Element | null => {
  return useRoutes([
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/s',
      element: routeCheckWrapper(<Dashboard />)
    },
    {
      path: '/s/calendar',
      element: routeCheckWrapper(<CalendarPage />)
    },
    {
      path: '/s/myapplications',
      element: routeCheckWrapper(<MyApplications />)
    },
    {
      path: '/s/myapplications/:ApplicationId',
      element: routeCheckWrapper(<Application />)
    },
    {
      path: '/s/docs',
      element: routeCheckWrapper(<Documents />)
    },
    {
      path: '/s/myqueries',
      element: routeCheckWrapper(<MyQueries />)
    },
    {
      path: '/s/notices',
      element: routeCheckWrapper(<Notices />)
    },
    {
      path: '/s/profile',
      element: routeCheckWrapper(<Profile />)
    },
    {
      path: '*',
      element: <Navigate to="/s/" replace />
    }

  ])
}
