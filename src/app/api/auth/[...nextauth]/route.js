import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Se asigna el nombre de usuario y el uid al objeto session
      session.user.username = session?.user?.name.split(' ')[0].toLowerCase()
      session.user.uid = token?.sub
      // Se retorna el objeto session con los datos modificados
      // Estos valores estaran disponibles mientras el usuario este logueado
      return session
    },
  },
  // La clave secreta global asegura que los tokens de sesión sean seguros y no puedan ser falsificados, incluso si se utilizan varios proveedores de autenticación diferentes.
  secret: process.env.GLOBAL_SECRET_KEY
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
