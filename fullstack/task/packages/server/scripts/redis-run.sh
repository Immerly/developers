echo "Running redis..."
(docker stop dishboard-dev-redis && docker kill dishboard-dev-redis || :) && (docker rm dishboard-dev-redis || :)

docker run \
    --name dishboard-dev-redis \
    -p 6379:6379 \
    -d redis