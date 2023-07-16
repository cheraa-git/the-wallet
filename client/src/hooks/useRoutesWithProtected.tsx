import { IndexRouteObject, Navigate, NonIndexRouteObject, RouteObject, useLocation, useRoutes } from 'react-router-dom'

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
  const location = useLocation()
  const protectedRoutes: RouteObject[] = routes.map(route => {
    if (route.protected && route.element) {
      return {
        ...route,
        protected: undefined,
        element: route.protected.accessibility
          ? route.element
          : <Navigate to={route.protected.navigate} state={{ referrer: location }}/>
      }
    }
    return { ...route, protected: undefined }
  })
  return useRoutes(protectedRoutes)
}
