#!/bin/bash

# shell script to create a blog article in a simple way

# get date in orrect format & save it title
vDate=$(date +%Y-%m-%d)
vTitle=_posts/$vDate-$1.markdown
vCategories=$2

# copy templates
cp _templates/post.md $vTitle

# fill in date, title and categories
sed -i "s/rDate/$vDate/g" $vTitle
sed -i "s/rTitle/$2/g" $vTitle
sed -i "s/rCategory/$3/g" $vTitle
