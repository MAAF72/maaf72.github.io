import os
import numpy
import time
import random

WINDOWS_LINE_ENDING = b'\r\n'
UNIX_LINE_ENDING = b'\n'

TC_INPUT_DIR = os.path.join('input')
TC_OUTPUT_DIR = os.path.join('output')

def create_tc(input_name):
    #Store the input string in input variable
    input = '' 
    
    q = get_randint(10**4, 10**4)
    
    input += '{}\n'.format(q)
    
    for _ in range(q):
        V = get_randint(10**15, 10**15)
        a = get_randint(1, 1)
        
        input += '{} {}\n'.format(V, a)

    #Create input file with Unix (LF) format
    input_file = open(input_name, 'w+', newline='\n')
    input_file.write(input)
    input_file.close()
    
def get_time() :
    return int(round(time.time()))
    
# Random integer (A, B) inclusive
def get_randint(low, high):
    return numpy.random.randint(low, high + 1, dtype=numpy.int64)

# Random float A, B inclusive / exclusive
def get_randfloat(l_inclusive, low, h_inclusive, high):
    rand = lambda : random.random() * (high - low) + low
    
    res = rand()
    while (l_inclusive and res == low) or (h_inclusive and res == high):
        res = rand()
        
    return res

#Create TC Folder (Hackerrank style)
os.makedirs(TC_INPUT_DIR, exist_ok=True)
os.makedirs(TC_OUTPUT_DIR, exist_ok=True)

#Generate 20 TC
tc = 0
while tc <= 10:
    print('Creating TC {}'.format(tc))
    input_name = os.path.join(TC_INPUT_DIR, f'input{tc}.txt')

    start_time = get_time()
    create_tc(input_name)
    run_time = get_time() - start_time

    print('TC {} successfully created in {}s'.format(tc, run_time))
    
    #Create output file based on solution
    start_time = get_time()
    output_name = os.path.join(TC_INPUT_DIR, f'output{tc}.txt')
    os.system('./a.out < {} > {}'.format(input_name, output_name))  #a is program name with .exe extension
    run_time = get_time() - start_time
    print('TC {} executed in {}s'.format(tc, run_time))
    
    #Change EOL of output file to Unix (LF) format
    content = None
    with open(output_name, 'rb') as open_output:
        content = open_output.read()
    
    if content:
        content = content.replace(WINDOWS_LINE_ENDING, UNIX_LINE_ENDING)
    
    with open(output_name, 'wb') as open_output:
        open_output.write(content)
    
    # Uncomment this code if you want create TC with desired output
    # if 'Tidak Bisa' not in str(content):
    #     print('Output :', str(content))
    #     print('Recreating TC {}'.format(tc))
    # else:
    #     tc += 1

    # Uncomment this code if you want create TC that give TLE with specific complexity of solution
    # if run_time > 1:
    #     tc += 1
    # else:
    #     print('Recreating TC {}'.format(tc))

    tc += 1
    
print('Done')