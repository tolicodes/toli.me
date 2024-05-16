#!/bin/bash
docker pull pdf2htmlex/pdf2htmlex:0.18.8.rc2-master-20200820-ubuntu-20.04-x86_64
docker run -ti --rm -v ./pdf:/pdf -w /pdf pdf2htmlex/pdf2htmlex:0.18.8.rc2-master-20200820-ubuntu-20.04-x86_64 --zoom 1.5 resume.pdf
cp pdf/resume.html ./resume.html
cp pdf/resume.pdf ./resume.pdf

# Define the file to modify
FILE="resume.html"

# Check if the file exists
if [[ ! -f "$FILE" ]]; then
  echo "Error: File '$FILE' not found."
  exit 1
fi

# Add header content to the top of the file
HEADER_CONTENT="---
layout: default
title: Resume
---"

# Prepend the header content to the file
echo -e "$HEADER_CONTENT\n$(cat $FILE)" > "$FILE"

# Define the page container content to add
PAGE_CONTAINER_OPEN='<div id="page-container">'
INCLUDE_CONTENT='{% include resume_header.html %}'

# Add the include content directly after the page container div
sed -i.bak "/$PAGE_CONTAINER_OPEN/a\\
    $INCLUDE_CONTENT" "$FILE"

echo "Added header and include content to $FILE."
