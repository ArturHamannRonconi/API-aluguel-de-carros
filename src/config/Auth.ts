import { Secret } from 'jsonwebtoken'

import Expiration from '@myTypes/Expiration'

class Auth
{
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static EXPIRES_TOKEN: Expiration = '15m'
  public static EXPIRES_REFRESH_TOKEN: Expiration = '30d'
  public static EXPIRES_REFRESH_TOKEN_DAYS = 30
  public static PRIVATE_KEY_TOKEN: Secret = '7a08a0940a9343e60c812a9a70ea65cb'
  public static PRIVATE_KEY_REFRESH_TOKEN: Secret = '5be38f88a100561196723b95d5452cb8'
}

export default Auth