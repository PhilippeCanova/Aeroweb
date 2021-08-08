def shunt(a, b):
    return 'test'

def decorator(f): # decorator est un décorateur
    print(f.__name__)
    print(f)
    return shunt

@decorator
def addition(a, b):
    """Docstring"""
    return a+b

print (addition(1, 2))
print (type(addition(1, 2)))

"""
def multiple(a, b)->int:
    return str(a*b)

multiple(2,3)"""
