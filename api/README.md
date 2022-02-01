<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>



## Description

[Nest](https://github.com/nestjs/nest) api de test

## Installation

```bash

$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Infos

```bash
### Configuration 
cr�ation du fichier .env avec les variables d'environnement
Utilisation de ConfigService de ConfigModule

### Middleware pour le Log
Toutes les requetes sont affich�es dans la console avec le status et la route
Utilisation pour toutes les routes 
charg� dans app.module... 
configure(consumer: MiddlewareConsumer)

### Securit�
r�pertoire auth
Utilisation de jwt
Fichier Jwt.strategy 
il g�re tous seul la pr�sence du token dans les headers Authorization  et sa validit� 
La start�gie est valid�e en nvoyant un objet user -> { id: payload.id, role: payload.role }
Fichier jwt-auth.guard
ajoute user � request

role.guard
gestion des roles ADMIN et USER
recupere le role de l'objet user
role.decorator
g�n�re le decorateur @Role



###Les routes
auth, user, activit�

### exemple de custom validation
cf fichier activites/dto/ValidationDist




```

