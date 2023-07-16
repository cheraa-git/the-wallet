import { IndexRouteObject, NonIndexRouteObject, RouteObject, useRoutes } from 'react-router-dom'
import { ProtectedRouteElement } from '../common/protectedRouteElement'

interface Protected {
  accessibility: boolean
  navigate: string
}

interface IndexRouteObjectWithProtected extends IndexRouteObject {
  protected?: Protected
}

interface NonIndexRouteObjectWithProtected extends NonIndexRouteObject {
  protected?: Protected
}


export type RouteObjectWithProtected = IndexRouteObjectWithProtected | NonIndexRouteObjectWithProtected

export const useRoutesWithProtected = (routes: RouteObjectWithProtected[]) => {
  const protectedRoutes: RouteObject[] = routes.map(route => {
    if (route.protected && route.element) {
      return {
        ...route,
        protected: undefined,
        element: <ProtectedRouteElement
          navigate={route.protected.navigate}
          accessibility={route.protected.accessibility}
          element={route.element}
        />
      }
    }
    return { ...route, protected: undefined }
  })
  return useRoutes(protectedRoutes)
}
