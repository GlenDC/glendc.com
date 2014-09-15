#!/bin/bash

# Go to website root

cd $WEBSITE

while true
do

	# Get latest changes

	git pull origin HEAD

	# wait for 10 minutes

	sleep 10m

done
