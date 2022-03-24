#!/usr/bin/env bash

IMAGE_NAME=${IMAGE_NAME:=yourimagerepo/vitex-stats-server-static}
IMAGE_VERSION=${IMAGE_VERSION:=1.21}

ng build --prod
docker build -t vitex-stats-server-static .
docker tag vitex-stats-server-static:latest ${IMAGE_NAME}:${IMAGE_VERSION}
docker push ${IMAGE_NAME}:${IMAGE_VERSION}
