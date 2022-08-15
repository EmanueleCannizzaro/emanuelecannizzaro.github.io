
from collections import OrderedDict
from google_speech import Speech
import googletrans
from googletrans import Translator
import json
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


class JobApplication():
    def __init__(self, name:str=None):
        self.name = name

    def read(self, filename:str):
        Loader.add_constructor('!include', Loader.include)

        _rootname, _extension = os.path.splitext(filename)
        if _extension.lower() in ['.yaml', '.yml']:
            with open(filename, 'r') as f:
                data = yaml.load(f, Loader)
                return data

    def to_jaml(self, filename:str):
        print(filename)
        with open(filename, 'w') as of:
            of.write(yaml.dump(self.data, default_flow_style=False, sort_keys=False))

    ###
    def replace(self, data:dict, match:str, repl:str):
        for k, v in data.items():
            if type(v) is dict:
                self.replace(v, match, repl)
            elif type(v) is list:
                for ix in range(len(v)):
                    if type(v[ix]) is str:
                        if v[ix] == match:
                            data[k][ix] = repl
            elif type(v) is str:
                if v == match:
                    data[k] = repl
    ###

    def replace_with_translation(self, data:dict, vocabulary:dict, verbose_flag:bool=False, **kwargs):
        if isinstance(data, dict):
            for k, v in data.items():
                if v:
                    if type(v) is dict:
                        self.replace_with_translation(v, vocabulary, verbose_flag, **kwargs)
                    elif type(v) is bool:
                        pass
                    elif type(v) is int:
                        pass
                    elif type(v) is float:
                        pass
                    elif type(v) is list:
                        for ix in range(len(v)):
                            if type(v[ix]) is dict:
                                self.replace_with_translation(v[ix], vocabulary, verbose_flag, **kwargs)
                            elif type(v[ix]) is bool:
                                pass
                            elif type(v[ix]) is int:
                                pass
                            elif type(v[ix]) is float:
                                pass
                            elif type(v[ix]) is str:
                                if v[ix] in vocabulary['enforce'].keys():
                                    data[k][ix] = vocabulary['enforce'][v[ix]]
                                elif v[ix] not in vocabulary['ignore']:
                                    _translated = self.translate_string(v[ix], **kwargs)
                                    if _translated != v[ix]:
                                        print(f"{_translated} vs. {v[ix]}")
                                        data[k][ix] = _translated
                            else:
                                raise ValueError(f"Found unknown type, that is type({v[ix]}) = {type(v[ix])}.")
                    elif type(v) is str:
                        if v in vocabulary['enforce'].keys():
                            data[k] = vocabulary['enforce'][v]
                        elif v not in vocabulary['ignore']:
                            _translated = self.translate_string(v, **kwargs)
                            if _translated != v:
                                if verbose_flag:
                                    print(f"{_translated} vs. {v}")
                                data[k] = _translated
                    else:
                        raise ValueError(f"Found unknown type, that is type({v}) = {type(v)}.")

    @staticmethod
    def print_keyword_args(**kwargs):
        # kwargs is a dict of the keyword args passed to the function
        for key, value in kwargs.items():
            print(f"{key} = {value}")

    def translate_dictionary(self, data:dict, vocabulary:dict, **kwargs):
        _data = self.replace_with_translation(data, vocabulary, **kwargs)
        return _data

    def translate_string(self, text, speech_flag:bool=False, vebose_flag:bool=False, **kwargs):
        translator = Translator(service_urls=['translate.googleapis.com'])

        if vebose_flag:
            self.print_keyword_args(**kwargs)
        sep = ''
        #sep = '\t'
        translation = translator.translate(text, **kwargs)
        #if translation.pronunciation:
        #    if any(x != [] for x in translation.pronunciation):
        #print(f"{sep}{text}{sep } -> {sep}{translation.text}{sep } -> {sep}({translation.pronunciation})")
        #    else:
        #        print(f"{sep}{text}{sep } -> {sep}{translation.text}{sep }")
        #else:
        print(f"{sep}{text}{sep } -> {sep}{translation.text}{sep }")
        if speech_flag:
            speech = Speech(translation.text, kwargs['dest'])
            speech.play()
        #speech.play(sox_effects)

        # save the speech to an MP3 file (no effect is applied)
        #speech.save("output.mp3")
        return translation.text

# you can also apply audio effects while playing (using SoX)
# see http://sox.sourceforge.net/sox.html#EFFECTS for full effect documentation
#sox_effects = ("speed", "1.5")

#engine = pyttsx3.init()
#voices = engine.getProperty('voices')
#rate = engine.getProperty('rate')
#rate_old = rate
#rate = 75
#engine.setProperty('rate', rate)
#print(engine.rate)


dest = 'it' #['it', 'fr']
texts = ["""Sicily is the largest island in the Mediterranean Sea and one of the 20 regions of Italy. The Strait of Messina separates it from the region of Calabria in Southern Italy. It is one of the five Italian autonomous regions and is officially referred to as Regione Siciliana. The region has 5 million inhabitants. Its capital city is Palermo.

Sicily is in the central Mediterranean Sea, south of the Italian Peninsula in continental Europe, from which it is separated by the narrow Strait of Messina. Its most prominent landmark is Mount Etna, one of the tallest active volcanoes in Europe,[5] and one of the most active in the world, currently 3,357 m (11,014 ft) high. The island has a typical Mediterranean climate.

The earliest archaeological evidence of human activity on the island dates from as early as 12,000 BC.[6][7] By around 750 BC, Sicily had three Phoenician and a dozen Greek colonies and it was later the site of the Sicilian Wars and the Punic Wars. After the end of the Roman province of Sicilia with the fall of the Roman Empire in the 5th century AD, Sicily was ruled during the Early Middle Ages by the Vandals, the Ostrogoths, the Byzantine Empire, and the Emirate of Sicily. The Norman conquest of southern Italy led to the creation of the County of Sicily in 1071, that was succeeded by Kingdom of Sicily, a state that existed from 1130 until 1816.[8][9] Later, it was unified under the House of Bourbon with the Kingdom of Naples as the Kingdom of the Two Sicilies. The island became part of Italy in 1860 following the Expedition of the Thousand, a revolt led by Giuseppe Garibaldi during the Italian unification, and a plebiscite. Sicily was given special status as an autonomous region on 15 May 1946, 18 days before the Italian institutional referendum of 1946.

Sicily has a rich and unique culture, especially with regard to the arts, music, literature, cuisine, and architecture."""]


def main():
    application = JobApplication()

    languages = googletrans.LANGUAGES
    print("Available languages for translations are : \n {}.".format(', '.join(languages)))

    filename = os.path.abspath(sys.argv[1])
    print(filename)

    source = "en"
    dest = sys.argv[2]

    tfilename = sys.argv[3]

    with open(tfilename, 'r') as f:
        vocabularies = json.load(f)
    vocabulary = vocabularies[source][dest]

    if dest not in languages:
        raise ValueError(f"The defined language {googletrans.LANGUAGES[dest]} is not an available language.")
    kwargs = {}
    kwargs['src'] = source
    kwargs['dest'] = dest

    #for text in texts:
    #    s = application.translate_string(text, **kwargs)

    application.data = application.read(filename)
    #print(json.dumps(application.data, sort_keys=True, indent=4))
    application.data_original = application.data

    rootname, extension = os.path.splitext(filename)
    ofilename = os.path.join(os.path.dirname(filename), f"{rootname}_{dest}{extension}")
    print(ofilename)
    #application.data =
    application.translate_dictionary(application.data, vocabulary, **kwargs)
    #print(json.dumps(application.data, sort_keys=True, indent=4))
    application.to_jaml(ofilename)

if __name__ == '__main__':
    main()
