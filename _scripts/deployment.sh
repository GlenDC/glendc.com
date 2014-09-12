#!/bin/bash

# Go to website root

cd $WEBSITE

# Get latest changes

git pull origin HEAD

# Generate CV

file_resume=resume.md
include_dir=_includes

cat $include_dir/resume-header.md > $file_resume
cat $include_dir/description.md >> $file_resume
echo  >> $file_resume
sed 's/[\t]//g' $include_dir/resume-experience.md >> $file_resume
cat $include_dir/resume-skills.md >> $file_resume
cat $include_dir/resume-software.md >> $file_resume
cat $include_dir/resume-hackatons.md >> $file_resume
sed 's/[\t]//g' $include_dir/resume-education.md >> $file_resume

gimli -outputdir files/ -f $file_resume -s /scripts/github.css

sleep 10

# generate new css

sass --watch _sass:assets/css&

# close sass

sleep 30 && pkill -f sass

# build HTML Content

sleep 10 && jekyll build