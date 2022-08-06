## Getting started

To run the app locally you will need:
- node 16
- yarn

Then you can spin up the app in dev mode.

```
cd app
yarn dev
```

To check the linter

```
yarn lint
```

To run tests

```
yarn test
```

## Decisions

Here is some context into the technical and product decisions I made while working on this.

### Nextjs

Using `create-react-app` would have been simpler but Nextjs allowed me to have API endpoints with zero config and without having to deploy a separate Express server or similar. API endpoints were necessary so that the Yapily application secret would not be exposed to the client.

Nextjs also comes with other advantages:
- Great routing
- Automatic code splitting

### TailwindCSS

I used TailwindCSS over MaterialUI because I did not need any complex UI widgets and TailwindCSS is far more light weight, ships no JS to the client and the amount of CSS is minimal. In contrast, MaterialUI is pretty sizeable.

### Tanstack `react-query`

Admittedly, the server state in this application is quite simple, yet I decided to use `react-query`. I did it because it massively simplifies server state management and entirely bypasses the need to have something more complex like `redux` in place. We get for free:
- Cache management
- Retries
- Loading and error states

### `react-charts`

I wanted to have some kind of visualizations and had never tried `react-charts` until now. I was curious and so I just went for it as opposed to stop and compare it with other tools. For a more real use-case, I would work back from principles&strategy to make this decision.

### Consents

I persist Yapily consents for 24h in cookies. This means the user can refresh the accounts or transactions page and not have to reauthenticate with the bank every single time. This made development a bit more streamlined. In a real-world production environment, we would have to check if security and compliance allow this.

### Bank compatibility

Some Yapily sandbox banks required pre-authentication, which is a completely different auth workflow. Others require special header values such as `psu-id` in order to get consents. For simplicity sake, I have decided to only support banks that do not need anythign special to provide consents.

### Yapily application users

I avoided having a full-blown database in place to keep scope reasonable. I then used a single Yapily application user to interact with the API at all times.

### Limited visualizations

For scope reasons, I kept the transactions page quite minimal. A few potential improvements:
- Automatically detect which months are empty and only allow you to select months with transactions
- Table sorting and filtering
- At the moment, due to a Yapily limitation, I only display 1000 transactions per month at max. I decided to avoid implementing pagination.

## To be improved for the future

This is, by no means, a production-ready application.

- UX
  - Better navigation
  - Clearer error states
  - The app works on mobile but struggles when there is lots of data and small resolutions.
- Better test coverage
- Observability
- Request/response validation against a schema

### TODO

- Error handling
- HTTP method filtering
- Loading states
- Right now, monthly stats are only valid for months with <1000 transactions

