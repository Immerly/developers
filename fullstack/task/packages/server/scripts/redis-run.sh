echo "Running redis..."

docker run \
    --name dishboard-dev-redis \
    -p 6379:6379 \
    -d redis