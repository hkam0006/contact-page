## Run With Docker

```bash
docker compose up --build
```

Then open:

- Web app: http://localhost:3000/contact
- Contacts list: http://localhost:3000/contacts
- API: http://localhost:3001/contacts

The API container runs `prisma db push` on startup to create the database schema for the demo.

## Run Locally

Install dependencies:

```bash
npm install
```

Start PostgreSQL locally and set:

```bash
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/contacts?schema=openagent_takehome"
```

Prepare the database:

```bash
npm run prisma:generate
npm run db:push --workspace @contact-demo/api
```

Start the API:

```bash
npm run start:dev --workspace @contact-demo/api
```

Start the web app in another terminal:

```bash
npm run dev --workspace @contact-demo/web
```

## API

### `POST /contacts`

Creates an unverified contact.

```json
{
  "firstName": "Alex",
  "lastName": "Nguyen",
  "email": "alex@example.com",
  "phone": "0412 345 678",
  "note": "Please call after 2pm."
}
```

### `GET /contacts`

Lists contacts newest first.

### `PATCH /contacts/:id`

Marks a contact as verified.

```json
{
  "verified": true
}
```

### `DELETE /contacts/:id`

Deletes a contact.

## Tests

```bash
npm test
```

## Assumptions

- Authentication is out of scope for the contacts list page.

## AI Usage

I used Codex as an AI-assisted pair programming to speed up development and support the TDD workflow. In particular, I used AI to help draft initial test cases, explore implementation options, and review parts of the frontend, API, Docker, and Prisma setup.

All generated suggestions were reviewed and modified by me before being included. I made the final implementation decisions, adjusted the code to fit the project requirements, and verified the behavior through tests and manual review.

I can walk through the codebase, explain the design decisions, and discuss the trade-offs made in the solution.
