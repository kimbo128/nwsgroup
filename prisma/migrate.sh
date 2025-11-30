#!/bin/bash
# Railway migration script
set -e

echo "Running Prisma migrations..."

# Generate Prisma Client
npx prisma generate

# Push schema to database (creates tables if they don't exist)
npx prisma db push --accept-data-loss

echo "Migrations completed successfully!"

