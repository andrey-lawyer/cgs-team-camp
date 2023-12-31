// Local storage keys
export const STORAGE_KEYS = {
  JWT_TOKEN_STUDENT: 'JWT_TOKEN_STUDENT',
  JWT_TOKEN_INSTRUCTOR: 'JWT_TOKEN_INSTRUCTOR',
  ADDRESS: 'ADDRESS',
  TOKEN: 'TOKEN'
};

// React-query keys
export const QUERY_KEYS = {
  EXAMPLE: 'EXAMPLE',
  TOKEN: 'TOKEN',
  STATISTIC: 'statistic',
  TRENDING: 'trending',
  TODOS: 'todos',
  USER: 'user',
  TODOID: 'todoId'
};

// Backend Routes
export const BACKEND_KEYS = {
  EXAMPLE: 'example',
  COURSES: 'courses',
  ARTICLES: 'articles',
  STATISTIC: 'statistic',
  TRENDING: 'trending',
  FEATURED_ARTICLES: 'featured_articles'
};

export const ROUTER_KEYS = {
  ROOT: '/',
  HOME: '/home',
  AUTHORIZED: '/authorized',
  TODOS: '/todos',
  TODOID: '/todos/:todosId',
  REGISTER: '/register',
  LOGIN: '/login',
  FORGET_PASSWORD: '/forget-password',
  CHANGE_PASSWORD: '/change-password',
  VERIFICATION: '/new-password/:verificationToken',
  NOROUTE: '*'
};
