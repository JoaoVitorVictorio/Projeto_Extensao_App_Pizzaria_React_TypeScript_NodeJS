import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: AuthRequest) {

        //Verificar se o e-mail existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("Usuário/senha incorreto");
        }

        //Verifica se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("Usuário/senha incorreto");
            
        }

        return { ok: true }

    }
}

export { AuthUserService };