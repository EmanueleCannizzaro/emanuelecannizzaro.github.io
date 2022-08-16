#!/bin/bash

python json2yaml.py ~/gdrive/eeee/emanuele/cv/github_repos.json
python explode_yaml.py ~/gdrive/eeee/emanuele/cv/ec.source.yaml ~/gdrive/eeee/emanuele/cv/ec.yaml
python translate.py  ~/gdrive/eeee/emanuele/cv/ec.yaml it ~/gdrive/eeee/emanuele/cv/ec.translation.json
python translate.py  ~/gdrive/eeee/emanuele/cv/ec.yaml es ~/gdrive/eeee/emanuele/cv/ec.translation.json
python translate.py  ~/gdrive/eeee/emanuele/cv/ec.yaml fr ~/gdrive/eeee/emanuele/cv/ec.translation.json

bundle exec jekyll serve
#bundle exec jekyll serve --livereload
