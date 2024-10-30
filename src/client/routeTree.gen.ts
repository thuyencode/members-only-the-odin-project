/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProtectedRouteImport } from './routes/_protected/route'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const AuthSignUpLazyImport = createFileRoute('/_auth/sign-up')()
const AuthSignInLazyImport = createFileRoute('/_auth/sign-in')()
const ProtectednewMessageNewIndexLazyImport = createFileRoute(
  '/_protected/(new-message)/new/',
)()

// Create/Update Routes

const ProtectedRouteRoute = ProtectedRouteImport.update({
  id: '/_protected',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AuthSignUpLazyRoute = AuthSignUpLazyImport.update({
  id: '/_auth/sign-up',
  path: '/sign-up',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/_auth/sign-up.lazy').then((d) => d.Route))

const AuthSignInLazyRoute = AuthSignInLazyImport.update({
  id: '/_auth/sign-in',
  path: '/sign-in',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/_auth/sign-in.lazy').then((d) => d.Route))

const ProtectednewMessageNewIndexLazyRoute =
  ProtectednewMessageNewIndexLazyImport.update({
    id: '/(new-message)/new/',
    path: '/new/',
    getParentRoute: () => ProtectedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_protected/(new-message)/new/index.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_protected': {
      id: '/_protected'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth/sign-in': {
      id: '/_auth/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof AuthSignInLazyImport
      parentRoute: typeof rootRoute
    }
    '/_auth/sign-up': {
      id: '/_auth/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof AuthSignUpLazyImport
      parentRoute: typeof rootRoute
    }
    '/_protected/(new-message)/new/': {
      id: '/_protected/(new-message)/new/'
      path: '/new'
      fullPath: '/new'
      preLoaderRoute: typeof ProtectednewMessageNewIndexLazyImport
      parentRoute: typeof ProtectedRouteImport
    }
  }
}

// Create and export the route tree

interface ProtectedRouteRouteChildren {
  ProtectednewMessageNewIndexLazyRoute: typeof ProtectednewMessageNewIndexLazyRoute
}

const ProtectedRouteRouteChildren: ProtectedRouteRouteChildren = {
  ProtectednewMessageNewIndexLazyRoute: ProtectednewMessageNewIndexLazyRoute,
}

const ProtectedRouteRouteWithChildren = ProtectedRouteRoute._addFileChildren(
  ProtectedRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof ProtectedRouteRouteWithChildren
  '/sign-in': typeof AuthSignInLazyRoute
  '/sign-up': typeof AuthSignUpLazyRoute
  '/new': typeof ProtectednewMessageNewIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof ProtectedRouteRouteWithChildren
  '/sign-in': typeof AuthSignInLazyRoute
  '/sign-up': typeof AuthSignUpLazyRoute
  '/new': typeof ProtectednewMessageNewIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_protected': typeof ProtectedRouteRouteWithChildren
  '/_auth/sign-in': typeof AuthSignInLazyRoute
  '/_auth/sign-up': typeof AuthSignUpLazyRoute
  '/_protected/(new-message)/new/': typeof ProtectednewMessageNewIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/sign-in' | '/sign-up' | '/new'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/sign-in' | '/sign-up' | '/new'
  id:
    | '__root__'
    | '/'
    | '/_protected'
    | '/_auth/sign-in'
    | '/_auth/sign-up'
    | '/_protected/(new-message)/new/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ProtectedRouteRoute: typeof ProtectedRouteRouteWithChildren
  AuthSignInLazyRoute: typeof AuthSignInLazyRoute
  AuthSignUpLazyRoute: typeof AuthSignUpLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ProtectedRouteRoute: ProtectedRouteRouteWithChildren,
  AuthSignInLazyRoute: AuthSignInLazyRoute,
  AuthSignUpLazyRoute: AuthSignUpLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_protected",
        "/_auth/sign-in",
        "/_auth/sign-up"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_protected": {
      "filePath": "_protected/route.tsx",
      "children": [
        "/_protected/(new-message)/new/"
      ]
    },
    "/_auth/sign-in": {
      "filePath": "_auth/sign-in.lazy.tsx"
    },
    "/_auth/sign-up": {
      "filePath": "_auth/sign-up.lazy.tsx"
    },
    "/_protected/(new-message)/new/": {
      "filePath": "_protected/(new-message)/new/index.lazy.tsx",
      "parent": "/_protected"
    }
  }
}
ROUTE_MANIFEST_END */
