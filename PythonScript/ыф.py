def Foo(n):
    if n == 1:
        return n
    else:
        q = Foo(n - 1)
        q = q + Foo(n - 2)
        print(q)
        return q


i = 0
powr = 1
for b in range(0, 1):
    powr = powr / 10.0
    i = i + powr * Foo(b)

print(i)