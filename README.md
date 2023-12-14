# CSDS234-Final-Project

## How to Use:
**Note:** 
- You will need to have a Postgres database hosted (can be locally).
- If you are not using Prisma Accelerate:
  - delete "DIRECT_DATABASE_URL" from your .env file
  - delete ```directUrl = env("DIRECT_DATABASE_URL")``` from prisma/schema.prisma

**How to Run the Web App:**
1. Clone the repository
2. Navigate to web-ui
3. Create a new file named ".env"
4. Copy the environment variables from ".env.example" into ".env" and add their values
6. Run ```npm install```
7. Run ```npx prisma generate --no-engine```
8. Run ``npm run dev```

**View Live Site:**\
Our website is deployed at https://csds-234-final-project.vercel.app/
