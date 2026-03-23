# /src/api — Data Layer

## Responsibility

Manages all **external data communication**:
- Supabase client initialization and configuration
- API service functions for each domain (devices, warranties, auth)
- Abstracts network calls so hooks/services never import Supabase directly

## Structure

```
api/
├── supabase.ts          # Supabase client singleton
├── deviceApi.ts         # CRUD operations for devices table
├── warrantyApi.ts       # CRUD operations for warranties table
├── authApi.ts           # Auth-related Supabase calls
└── README.md
```

## Rules

1. Each file exports **pure async functions** — no React hooks here.
2. All functions must have typed return values using interfaces from `/src/types`.
3. Error handling should throw typed errors, not swallow them silently.
