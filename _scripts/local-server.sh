#!/bin/bash

# Script to start up local servies, used to work on the website

# generate html & content
jekyll serve --watch &

# generate css
sass --watch _sass:assets/css &