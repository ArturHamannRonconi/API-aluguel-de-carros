class AppError extends Error
{
  constructor(
    public readonly message: string,
    public readonly code: number = 400
  )
  {
    super(message)
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export default AppError