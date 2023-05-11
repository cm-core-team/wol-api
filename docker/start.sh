# remove old image
docker stop -t 0.2 wol-api-backend 2>/dev/null || true
docker rm -f wol-api-backend 2>/dev/null || true

# build new image
docker build -t wol-api-backend -f docker/Dockerfile .
docker run --name wol-api-backend -it wol-api-backend
