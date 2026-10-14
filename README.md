# Quiet Walls

Quiet Walls lets people create a personal link where anyone can leave them an
anonymous message. Wall owners sign in to read and delete messages in a private
inbox. Senders do not get read receipts or replies.

## Getting started

Requirements: PHP, Composer, Node.js, and npm.

```sh
composer install
cp .env.example .env
php artisan key:generate
```

The default database connection is SQLite. Create `database/database.sqlite`
if it does not exist, then run the migrations and build the frontend:

```sh
php artisan migrate
npm install
npm run build
php artisan serve
```

Open the local application, create an account, and share the wall link shown in
your inbox.

## Privacy

Messages are stored with their recipient, content, and timestamps. Quiet Walls
does not ask for or store a sender name or account with a message. Hosting or
network providers may still retain connection logs; this app does not promise
anonymity from those providers. Senders receive a submission confirmation but
no read receipt or information about what the recipient does with a message.

## Tests

```sh
php artisan test
```
# QUITE-WALLS
