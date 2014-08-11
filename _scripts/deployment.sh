#!/bin/bash

# Printable CV Generation

file_resume=resume.md
resume_dir=../_includes

cat $resume_dir/resume-header.md > $file_resume
sed 's/[\t]//g' $resume_dir/resume-experience.md >> $file_resume
cat $resume_dir/resume-skills.md >> $file_resume
cat $resume_dir/resume-software.md >> $file_resume

# hackatons ignored for now
# cat $resume_dir/resume-hackatons.md >> $file_resume

sed 's/[\t]//g' $resume_dir/resume-education.md >> $file_resume

gimli -outputdir ../files/

rm -f $file_resume
