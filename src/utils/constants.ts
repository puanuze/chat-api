export const LogLevel: { [env: string]: 'info' | 'warning' | 'debug' } = {
  development: 'debug',
  staging: 'warning',
  production: 'warning',
}
