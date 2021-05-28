type AuthenticateResponse = {
  user: { name:string, email: string, username: string },
  token: string
}

export default AuthenticateResponse