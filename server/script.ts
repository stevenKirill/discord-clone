import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();
    const user = await prisma.user.create({
        data: {
            name: 'Kirill',
            email: 'hello',
            age: 28,
        }
    })
    console.log(user);
}

main().catch((e) => console.error(e.message));