import os
import yaml
import sys


class Loader(yaml.SafeLoader):

    def __init__(self, stream):

        self._root = os.path.split(stream.name)[0]

        super(Loader, self).__init__(stream)

    def include(self, node):

        filename = os.path.join(self._root, self.construct_scalar(node))

        with open(filename, 'r') as f:
            return yaml.load(f, Loader)


def main():
    Loader.add_constructor('!include', Loader.include)

    _filename = sys.argv[1]
    print(_filename)
    _rootname, _extension = os.path.splitext(_filename)
    if _extension.lower() in ['.yaml', '.yml']:
        with open(_filename, 'r') as f:
            data = yaml.load(f, Loader)
            _ofilename = os.path.join(os.path.dirname(_filename), sys.argv[2])
            print(_ofilename)
            with open(_ofilename, 'w') as of:
                of.write(yaml.dump(data, default_flow_style=False))

    
if __name__ == '__main__':
    main()
