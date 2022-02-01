<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>



## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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
création du fichier .env avec les variables d'environnement
Utilisation de ConfigService de ConfigModule

### Middleware pour le Log
Toutes les requetes sont affichées dans la console avec le status et la route
Utilisation pour toutes les routes 
chargé dans app.module... 
configure(consumer: MiddlewareConsumer)

### Securité
répertoire auth
Utilisation de jwt
Fichier Jwt.strategy 
il gère tous seul la présence du token dans les headers Authorization  et sa validité 
La startégie est validée en nvoyant un objet user -> { id: payload.id, role: payload.role }
Fichier jwt-auth.guard
ajoute user à request

role.guard
gestion des roles ADMIN et USER
recupere le role de l'objet user
role.decorator
génère le decorateur @Role



###Les routes
auth, user, activité

### exemple de custom validation
cf fichier activites/dto/ValidationDist









# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil MyÅ›liwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
