def sol(arr, x, y, z):
    busy = []
    wait = 0
    x1 = x
    y1 = y
    z1 = z
    for i in range(len(arr)):
        if(not('x' in busy) and arr[i] <= x):
            x -= arr[i]
            busy.append('x')
        elif(not('y' in busy) and arr[i] <= y):
            y -= arr[i]
            busy.append('y')
        elif(not('z' in busy) and arr[i] <= z):
            z -= arr[i]
            busy.append('z')
        elif(arr[i] <= x):
            wait = max(wait, x1-x)
            x1 = x
            x -= arr[i]
        elif(arr[i] <= y):
            wait = max(wait, y1-y)
            y1 = y
            y -= arr[i]
        elif(arr[i] <= z):
            wait = max(wait, z1-z)
            z1 = z
            z -= arr[i]
        else:
            return -1;
    return wait;

l = [2,8,4,3,2]
print(sol(l, 7, 11, 3))