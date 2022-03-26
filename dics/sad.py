from glob import glob
import string
from unidecode import unidecode

def mapear(fichero, file4, file5, file6):
    for line in fichero:
        palabra = unidecode(line.split(',')[0].strip().strip(string.digits))
        length = len(palabra)
        if '-' in palabra:
            continue
        if length == 4:
            file4.write(f'{palabra}\n')
        elif length == 5:
            file5.write(f'{palabra}\n')
        elif length == 6:
            file6.write(f'{palabra}\n')

def main():
    file4 = open('size4.text', 'w')
    file5 = open('size5.text', 'w')
    file6  = open('size6.text', 'w')

    a = open("a.txt")

    names = glob('*.txt')


    for name in names:
        with open(name) as fichero:
            mapear(fichero, file4, file5, file6)


if __name__ == "__main__":
    main()
