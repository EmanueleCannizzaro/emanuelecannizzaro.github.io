#!/bin/bash

python json2yaml.py _data/github_repos.json
python explode_yaml.py _data/data.yaml data.yml

bundle exec jekyll serve --livereload
