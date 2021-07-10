import { RateLimiterRedis } from 'rate-limiter-flexible'
import { NextFunction, Request, Response } from 'express'
import { createClient, RedisClient } from 'redis'

import AppError from '@shared/errors/AppError'

class RateLimiter
{
  private client: RedisClient
  private rateLimiter: RateLimiterRedis

  constructor()
  {
    this.client = createClient({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    })

    this.rateLimiter = new RateLimiterRedis({
      storeClient: this.client,
      points: 10,
      duration: 5
    })
  }

  public async exec(request: Request, response: Response, next: NextFunction): Promise<void> 
  {
    try {
      await this.rateLimiter.consume(request.ip)
      next()
    }
    catch(err) {
      throw new AppError('Too many requests', 429)
    }
  }
}

export default new RateLimiter()