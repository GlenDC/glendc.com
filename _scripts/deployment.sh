#!/bin/bash

# Go to website root

cd $WEBSITE

while true
do

	# Get latest changes

	git pull origin HEAD

	# generate new css

	sass --watch _sass:assets/css&

	# close sass

	sleep 30 && pkill -f sass

	# build HTML Content

	sleep 10 && jekyll build

	# wait for 15 minutes

	sleep 15m
done
