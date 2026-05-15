# Labb 4 - Authentication API

Detta är en REST API byggd med Node.js, Express, MongoDB och JWT.  
API:et används för att registrera användare, logga in användare och skydda routes med JWT-token.

## Publicerad API-länk

https://labb4-auth-api.onrender.com

## Funktioner

- Skapa användarkonto
- Logga in med användarkonto
- Hashade lösenord med bcrypt
- JWT-token skapas vid lyckad inloggning
- Skyddad route som kräver giltig JWT
- MongoDB används som databas

## Tekniker

- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- JSON Web Token
- dotenv
- cors

## Installation

Klona repot:

```bash
git clone https://github.com/Coco10023/labb4-auth-api.git
```

Gå in i projektmappen:
cd labb4-auth-api

Installera dependencies:
npm install

Skapa en .env-fil i projektets rot:
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Starta projektet lokalt:
npm run dev

API:et körs då på:
http://localhost:3000


## Endpoints
Test route

GET /

Kontrollerar att API:et fungerar.

Exempel response:

{
  "message": "API fungerar!"
}

## Registrera användare

POST /api/auth/register

Skapar ett nytt användarkonto.

Body:

{
  "username": "testuser",
  "email": "test@test.se",
  "password": "password123"
}

Exempel response:

{
  "message": "Användarkonto skapat."
}


## Logga in användare

POST /api/auth/login

Loggar in användaren och returnerar en JWT-token.

Body:

{
  "username": "testuser",
  "password": "password123"
}

Exempel response:

{
  "message": "Inloggning lyckades.",
  "token": "JWT_TOKEN_HÄR"
}

## Hämta skyddad data

GET /api/products

Denna route kräver en giltig JWT-token.

Header:

Authorization: Bearer JWT_TOKEN_HÄR

Exempel response:

{
  "message": "Du är inloggad och får se skyddad data.",
  "user": {
    "userId": "user_id",
    "username": "testuser"
  },
  "data": [
    {
      "id": 1,
      "name": "Testprodukt",
      "description": "Denna data visas bara för användare med giltig JWT.",
      "price": 100
    }
  ]
}

Om token saknas:
{
  "message": "Ingen token skickades."
}

## Säkerhet

Lösenord sparas inte i klartext.
De hashas med bcrypt innan de lagras i databasen.

JWT används för att skydda routes.
Klienten måste skicka token i Authorization-headern för att få åtkomst till skyddad data.

## Databasmodell

Användare sparas med följande fält:

username
email
password
account_created

## Scripts

Starta lokalt med nodemon:

npm run dev

Starta produktion:

npm start

GitHub - repo: 
https://github.com/Coco10023/labb4-auth-api.git
