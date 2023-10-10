echo "Removing old docker container..."
(docker stop dishboard-dev-task-db && docker kill dishboard-dev-task-db || :) && (docker rm dishboard-dev-task-db || :)

echo "Creating a new instance..."
docker run \
    --name dishboard-dev-task-db \
    -e POSTGRES_PASSWORD=postgres \
    -e PGPASSWORD=postgres \
    -p 5430:5432 \
    -d postgres

echo "Waiting for the database to start..."
sleep 15

echo "Creating the database..."
echo "CREATE DATABASE dev;" | docker exec -i dishboard-dev-task-db psql -U postgres

echo "Installing pg_cron..."
docker exec -it dishboard-dev-task-db bash -c "apt-get update && apt-get -y install postgresql-16-cron"

echo "Configuring pg_cron in postgresql.conf..."
docker exec -it dishboard-dev-task-db bash -c "echo \"shared_preload_libraries = 'pg_cron'\" >> /var/lib/postgresql/data/postgresql.conf"
docker exec -it dishboard-dev-task-db bash -c "echo \"cron.host = '/tmp'\" >> /var/lib/postgresql/data/postgresql.conf"
docker exec -it dishboard-dev-task-db bash -c "echo \"cron.database_name = 'dev'\" >> /var/lib/postgresql/data/postgresql.conf"

echo "Restarting PostgreSQL for configuration changes to take effect..."
docker stop dishboard-dev-task-db
docker start dishboard-dev-task-db

sleep 10

echo "Setting up pg_cron in the 'dev' database..."
docker exec -it dishboard-dev-task-db bash -c "psql -U postgres -d dev -c 'CREATE EXTENSION pg_cron;'"
