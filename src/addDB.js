// ✅ Explicit file import
import { PrismaClient } from './generated/prisma/index.js'; 
import { generateUser } from './user.js'

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: generateUser(),
  })
  console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
