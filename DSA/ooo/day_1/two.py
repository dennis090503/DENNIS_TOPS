# brute
def second_largest_element(a):
    for i in range(0,len(a)):
        for j in range(i,len(a)):
            if a[i]>a[j]:
                a[i],a[j] = a[j],a[i]

    print(a)
    return a[len(a)-2]

# optimized
def second_largest(a):
    if len(a) < 2:
        return None  

    first = second = float('-inf')
    for x in a:
        if x > first:
            second = first
            first = x
        elif x > second and x != first:
            second = x

    return second if second != float('-inf') else None


arr_1=[5,2,3,1,4]
print(f"second largest element in array is:{second_largest_element(arr_1)}")