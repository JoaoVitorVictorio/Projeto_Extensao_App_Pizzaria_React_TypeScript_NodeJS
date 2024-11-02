import prismaClient from "../../../prisma";

interface CategoryRequest {
    name: string;
}

class CreateCategoryService {
    async execute({ name }: CategoryRequest) {
        if (!name) {
            throw new Error('Nome inválido');
        }

        try {
            const category = await prismaClient.category.create({
                data: {
                    name,
                },
                select: {
                    id: true,
                    name: true,
                },
            });

            return category;
        } catch (error) {
            throw new Error('Falha ao criar categoria: ' + error.message);
        }
    }
}

export { CreateCategoryService };
