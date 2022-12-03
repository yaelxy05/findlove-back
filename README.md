# findlove-back

## Process start project
  * ```npm install```
  * create .env with exemple of .env.exemple
  * create account or login on MongoDb Atlas
---
## <div style="font-weight:bold; color:blue;">Routes</div>

## <span style="text-decoration:underline">Routes login && register</span>
### login and register user (POST) (create user and login user)
  - `http://localhost:8000/api/users/register`
  - `http://localhost:8000/api/users/login`
### Informations user single and list
  - `http://localhost:8000/api/users/info-user` 
  - `http://localhost:8000/api/users/user-list`
--- 
## <span style="text-decoration:underline">Routes profil</span>
### create profil user (POST) (create an user profil)
  - `http://localhost:8000/api/profil/create/:id`
### profil (GET) (display the user profil)
  - `http://localhost:8000/api/profil`
---
## <span style="text-decoration:underline">Routes Chat</span>
### Create chat (POST)
  - `http://localhost:8000/api/create/chat/:receiverId`
### get chat of user
  - `http://localhost:8000/api/chat/:userId`
---

## <span style="text-decoration:underline">Routes Messages</span>

### Create Message (POST)
  - `http://localhost:8000/api/create/message/:chatId/:senderId`

### get message by id (GET)
  - `http://localhost:8000/api/message/:conversationId`
