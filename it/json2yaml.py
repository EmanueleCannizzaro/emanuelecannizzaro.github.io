#!/usr/bin/env python

import json
import os
import sys
import yaml

def main():
    _filename = sys.argv[1]
    print(_filename)
    _rootname, _extension = os.path.splitext(_filename)
    if _extension.lower() in ['.json']:
        with open(_filename, 'r') as f:    
            data = json.load(f)
            _ofilename = f"{_rootname}.yaml"
            print(_ofilename)
            with open(_ofilename, 'w') as of:
                of.write(yaml.dump(data, default_flow_style=False))
    
if __name__ == '__main__':
    main()
