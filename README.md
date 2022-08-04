### Decisions

- Nextjs over CRA: it's more complex but it gives me API endpoints for free and I can use them to avoid sharing the API secret with the client. See https://nextjs.org/docs/api-routes/introduction#use-cases.
- Persistence of consents

### Things that need to be improved

- Request/response validation against a schema.
- Using one unique yapily user for everything right now.

### TODO

- Error handling
- HTTP method filtering
- Loading states
- Right now, monthly stats are only valid for months with <1000 transactions

