#!/bin/sh
set -e

echo "🔄 Waiting for database to be ready..."
while ! pg_isready -h "$DEV_HOST" -p "$DEV_PORT" -U "$DEV_USER" 2>/dev/null; do
  echo "  ⏳ Database not ready yet, waiting..."
  sleep 2
done

echo "✅ Database is ready!"

echo "📦 Running migrations..."
npx sequelize db:migrate --env production || true

echo "🌱 Running seeders..."
if [ ! -f /app/.seeded ]; then
  npx sequelize db:seed:all --env production || true
  touch /app/.seeded
  echo "✅ Seeding completed"
else
  echo "⏭️  Seeding skipped (already seeded)"
fi

echo "🚀 Starting ServerDaerah..."
exec npm start
