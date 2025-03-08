# UpWork Interview




```sh
git clone git@github.com:anthonybudd/express-ts-api-template.git
cd express-ts-api-template

# [Optional] Find & Replace (case-sensaive, whole repo): "legal-api" => "your-api-name" 
LC_ALL=C find . -type f -name '*.*' -exec sed -i '' s/legal-api/your-api-name/g {} +

# Private RSA key for JWT signing
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem

# Start app
cp .env.example .env
npm install
docker compose up
npm run exec:db:refresh
npm run exec:test

# [Optional] Code generation command
npm run generate -- --model="Book"
npm run exec:db:refresh
```


### Routes
| Method      | Route                                                           | Description                           | Payload                               | Response          | 
| ----------- | --------------------------------------------------------------- | ------------------------------------- | ------------------------------------- | ----------------- |  
| GET         | `/_readiness`                                                   | Kuber readiness check                 | --                                    | "healthy"         |  
| GET         | `/api/v1/_healthcheck`                                          | Returns {status: 'ok'} if healthy     | --                                    | {status: 'ok'}    |  
| **Auth**    |                                                                 |                                       |                                       |                   |  
| POST        | `/api/v1/auth/login`                                            | Login                                 | {email, password}                     | {accessToken}     |  
| POST        | `/api/v1/auth/sign-up`                                          | Sign-up                               | {email, password, firstName, tos}     | {accessToken}     |  
| GET         | `/api/v1/_authcheck`                                            | Returns {auth: true} if has auth      | --                                    | {auth: true}      |  
| GET         | `/api/v1/auth/verify-email/:emailVerificationKey`               | Verify email                          | --                                    | {success: true}   |  
| GET         | `/api/v1/auth/resend-verification-email`                        | Resend verification email             | --                                    | {email}           |  
| POST        | `/api/v1/auth/forgot`                                           | Forgot                                | {email}                               | {success: true}   |  
| GET         | `/api/v1/auth/get-user-by-reset-key/:passwordResetKey`          | Get user for given `passwordResetKey` | --                                    | {id, email}       |  
| POST        | `/api/v1/auth/reset`                                            | Reset password                        | {email, password, passwordResetKey}   | {accessToken}     |  
| GET         | `/api/v1/auth/get-user-by-invite-key/:inviteKey`                | Get user for given `inviteKey`        | --                                    | {id, email}       |  
| POST        | `/api/v1/auth/invite`                                           | Complete user invite process          | {inviteKey, email, password, ...}     | {accessToken}     |   
| **User**    |                                                                 |                                       |                                       |                   |  
| GET         | `/api/v1/user`                                                  | Get the current user                  |                                       | {User}            |  
| POST        | `/api/v1/user`                                                  | Update the current user               | {firstName, lastName}                 | {User}            |  
| POST        | `/api/v1/user/update-password`                                  | Update password                       | {password, newPassword}               | {success: true}   |
| **Groups**  |                                                                 |                                       |                                       |                   |  
| GET         | `/api/v1/groups/:groupID`                                       | Returns group by ID                   | --                                    | {Group}           |  
| POST        | `/api/v1/groups/:groupID`                                       | Update group by ID                    | {name: 'New Name'}                    | {Group}           |  
| POST        | `/api/v1/groups/:groupID/users/invite`                          | Invite user to group                  | {email}                               | {UserID, GroupID} |  
| POST        | `/api/v1/groups/:groupID/users/:userID/resend-invitation-email` | Resend invitation email               | {}                                    | {email}           |  
| POST        | `/api/v1/groups/:groupID/users/:userID/set-role`                | Set user role                         | {role: 'User'/'Admin' }               | {UserID, role}    |  
| DELETE      | `/api/v1/groups/:groupID/users/:userID`                         | Remove user from group                | --                                    | {UserID}          |  


