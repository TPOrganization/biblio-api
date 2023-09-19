# API NESTJS - 19/09/2023

## Configuration de l'application environnement de dev
- Créer une base de données POSTGRES / Mysql avec Docker
- Si BDD mysql, n'oubliez pas de créer un utilisateur dédié et de lui attribuer tous les droit dessus, la connexion root sera refuser par TypeOrm
- Version Node : v19.7.0
- Créer un fichier .env à la racine de l'application comprenant les informations suivantes :

        # APP
        PORT=3500
        FRONT_URL=http://localhost:4200
        
        # DATABASE
        DB_TYPE=mysql
        DB_HOST=localhost
        DB_PORT=3306
        DB_USER=root
        DB_PASSWORD=mysql
        DB_DATABASE=
        DB_SSL=false
        DB_SYNCRHONIZE=false
        DB_LOGGING=true
        DB_SETUP_TABLE=setup
        FORCE_INSTALL_SCHEMA=false

        # JWT
        JWT_SECRET=£54654AZDA213QS1D3oIO
        JWT_EXPIRE_SECONDS=86400

        # ENCRYPTION
        ENCRYPTION_ALGORITHM=aes-256-cbc
        ENCRYPTION_SECRET=0GBAY6H5M9UIbbGO6ryh1JldOdCl4gH5

        # STORAGE
        UPLOAD_PATH=./data/upload
        IMAGE_PATH=./data/image

        # EMAIL
        EMAIL_ADMIN_REDIRECT=true
        EMAIL_ADMIN_ADDRESS=angelique.grnt@gmail.com
        EMAIL_FROM_ADDRESS=thomas.pinvin@digixp.fr
        EMAIL_LOG=false

        # EMAIL - MAILJET
        MAILJET_HOST=in-v3.mailjet.com
        MAILJET_PORT=587
        MAILJET_USER=538fb464f27239082efd8ea3499ca59d
        MAILJET_PASSWORD=f4084498b476efbabd92db9157268f90

## Installer / Lancer l'application sur environnement de dev

        npm install
        npm run dev

## Url health check

        http://localhost:3500/api/health 

## MAJ Version package
        
        npm install -g npm-check-updates
        npm-check-updates -u

## Création d'une nouvelle branche
- Partir de la branche "develop"
        git checkout develop
- Faire les modifs puis commit les fichiers
        git add .
        git commit -m "feat / fix : [UN TEXTE] [NUMERO TICKET JIRA] => BA-22 par exemple"
- Avant de push (création de la branche avec le numéro de ticket)
        git checkout -b BA-22
        git push origin BA-22
- Puis à la fin du dev de la feature, faire une pull request de la branche vers develop
