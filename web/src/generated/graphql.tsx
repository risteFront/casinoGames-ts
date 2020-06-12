import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};


export type Game = {
   __typename?: 'Game',
  id: Scalars['Int'],
  name: Scalars['String'],
  description: Scalars['String'],
  price: Scalars['String'],
  url: Scalars['String'],
};

export type LoginResponse = {
   __typename?: 'LoginResponse',
  accessToken: Scalars['String'],
  user: User,
};

export type Mutation = {
   __typename?: 'Mutation',
  logout: Scalars['Boolean'],
  revokeRefreshTokensForUser: Scalars['Boolean'],
  login: LoginResponse,
  register: Scalars['Boolean'],
  sendToAll: Scalars['Boolean'],
  userPosts: Scalars['Boolean'],
  games: Scalars['Boolean'],
  removeGame: Scalars['Boolean'],
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int']
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationRegisterArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationSendToAllArgs = {
  email: Scalars['String'],
  body: Scalars['String'],
  header: Scalars['String'],
  name: Scalars['String']
};


export type MutationUserPostsArgs = {
  email: Scalars['String'],
  body: Scalars['String'],
  header: Scalars['String'],
  name: Scalars['String']
};


export type MutationGamesArgs = {
  url: Scalars['String'],
  price: Scalars['String'],
  description: Scalars['String'],
  name: Scalars['String']
};


export type MutationRemoveGameArgs = {
  name: Scalars['String']
};

export type Posts = {
   __typename?: 'Posts',
  id: Scalars['Int'],
  name: Scalars['String'],
  header: Scalars['String'],
  body: Scalars['String'],
  email: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  hello: Scalars['String'],
  bye: Scalars['String'],
  users: Array<User>,
  me?: Maybe<User>,
  admin: Array<User>,
  posts: Array<Posts>,
  loadGames: Array<Game>,
};


export type QueryPostsArgs = {
  email: Scalars['String']
};

export type User = {
   __typename?: 'User',
  id: Scalars['Int'],
  email: Scalars['String'],
  role: Scalars['String'],
};
export type GamesMutationVariables = {
  name: Scalars['String'],
  description: Scalars['String'],
  price: Scalars['String'],
  url: Scalars['String']
};


export type GamesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'games'>
);

export type AdminQueryVariables = {};


export type AdminQuery = (
  { __typename?: 'Query' }
  & { admin: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'role'>
  )> }
);

export type ByeQueryVariables = {};


export type ByeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'bye'>
);

export type HelloQueryVariables = {};


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type LoadGamesQueryVariables = {};


export type LoadGamesQuery = (
  { __typename?: 'Query' }
  & { loadGames: Array<(
    { __typename?: 'Game' }
    & Pick<Game, 'name' | 'description' | 'price' | 'url'>
  )> }
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'role'>
    ) }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'role'>
  )> }
);

export type PostsQueryVariables = {
  email: Scalars['String']
};


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Posts' }
    & Pick<Posts, 'name' | 'header' | 'body'>
  )> }
);

export type RegisterMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type RemoveGameMutationVariables = {
  name: Scalars['String']
};


export type RemoveGameMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeGame'>
);

export type UserPostMutationVariables = {
  name: Scalars['String'],
  header: Scalars['String'],
  body: Scalars['String'],
  email: Scalars['String']
};


export type UserPostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'userPosts'>
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export const GamesDocument = gql`
    mutation Games($name: String!, $description: String!, $price: String!, $url: String!) {
  games(name: $name, description: $description, price: $price, url: $url)
}
    `;
export type GamesMutationFn = ApolloReactCommon.MutationFunction<GamesMutation, GamesMutationVariables>;

    export function useGamesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GamesMutation, GamesMutationVariables>) {
      return ApolloReactHooks.useMutation<GamesMutation, GamesMutationVariables>(GamesDocument, baseOptions);
    }
export type GamesMutationHookResult = ReturnType<typeof useGamesMutation>;
export type GamesMutationResult = ApolloReactCommon.MutationResult<GamesMutation>;
export type GamesMutationOptions = ApolloReactCommon.BaseMutationOptions<GamesMutation, GamesMutationVariables>;
export const AdminDocument = gql`
    query Admin {
  admin {
    id
    role
  }
}
    `;

    export function useAdminQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminQuery, AdminQueryVariables>) {
      return ApolloReactHooks.useQuery<AdminQuery, AdminQueryVariables>(AdminDocument, baseOptions);
    }
      export function useAdminLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminQuery, AdminQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<AdminQuery, AdminQueryVariables>(AdminDocument, baseOptions);
      }
      
export type AdminQueryHookResult = ReturnType<typeof useAdminQuery>;
export type AdminQueryResult = ApolloReactCommon.QueryResult<AdminQuery, AdminQueryVariables>;
export const ByeDocument = gql`
    query Bye {
  bye
}
    `;

    export function useByeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ByeQuery, ByeQueryVariables>) {
      return ApolloReactHooks.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
    }
      export function useByeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
      }
      
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeQueryResult = ApolloReactCommon.QueryResult<ByeQuery, ByeQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

    export function useHelloQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
      return ApolloReactHooks.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
    }
      export function useHelloLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
      
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloQueryResult = ApolloReactCommon.QueryResult<HelloQuery, HelloQueryVariables>;
export const LoadGamesDocument = gql`
    query LoadGames {
  loadGames {
    name
    description
    price
    url
  }
}
    `;

    export function useLoadGamesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LoadGamesQuery, LoadGamesQueryVariables>) {
      return ApolloReactHooks.useQuery<LoadGamesQuery, LoadGamesQueryVariables>(LoadGamesDocument, baseOptions);
    }
      export function useLoadGamesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LoadGamesQuery, LoadGamesQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<LoadGamesQuery, LoadGamesQueryVariables>(LoadGamesDocument, baseOptions);
      }
      
export type LoadGamesQueryHookResult = ReturnType<typeof useLoadGamesQuery>;
export type LoadGamesQueryResult = ApolloReactCommon.QueryResult<LoadGamesQuery, LoadGamesQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      role
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

    export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
      return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
    }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

    export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
      return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
    }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    role
  }
}
    `;

    export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
      return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
    }
      export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
      
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const PostsDocument = gql`
    query Posts($email: String!) {
  posts(email: $email) {
    name
    header
    body
  }
}
    `;

    export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
      return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
    }
      export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
      
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password)
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

    export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
      return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
    }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveGameDocument = gql`
    mutation RemoveGame($name: String!) {
  removeGame(name: $name)
}
    `;
export type RemoveGameMutationFn = ApolloReactCommon.MutationFunction<RemoveGameMutation, RemoveGameMutationVariables>;

    export function useRemoveGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveGameMutation, RemoveGameMutationVariables>) {
      return ApolloReactHooks.useMutation<RemoveGameMutation, RemoveGameMutationVariables>(RemoveGameDocument, baseOptions);
    }
export type RemoveGameMutationHookResult = ReturnType<typeof useRemoveGameMutation>;
export type RemoveGameMutationResult = ApolloReactCommon.MutationResult<RemoveGameMutation>;
export type RemoveGameMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveGameMutation, RemoveGameMutationVariables>;
export const UserPostDocument = gql`
    mutation UserPost($name: String!, $header: String!, $body: String!, $email: String!) {
  userPosts(name: $name, header: $header, body: $body, email: $email)
}
    `;
export type UserPostMutationFn = ApolloReactCommon.MutationFunction<UserPostMutation, UserPostMutationVariables>;

    export function useUserPostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UserPostMutation, UserPostMutationVariables>) {
      return ApolloReactHooks.useMutation<UserPostMutation, UserPostMutationVariables>(UserPostDocument, baseOptions);
    }
export type UserPostMutationHookResult = ReturnType<typeof useUserPostMutation>;
export type UserPostMutationResult = ApolloReactCommon.MutationResult<UserPostMutation>;
export type UserPostMutationOptions = ApolloReactCommon.BaseMutationOptions<UserPostMutation, UserPostMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
  }
}
    `;

    export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
      return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
    }
      export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
      
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;