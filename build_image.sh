#!/usr/bin/env bash

ng build --prod
docker build -t vitex-stats-server-static .
docker tag vitex-stats-server-static:latest yourimagerepo/vitex-stats-server-static:1.3
docker push yourimagerepo/vitex-stats-server-static:1.3
