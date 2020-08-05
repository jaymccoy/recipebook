#!/bin/bash
docker stop jrecipes
docker run -p 3000:3000 -d --name jrecipes jaymccoy/jrecipes
