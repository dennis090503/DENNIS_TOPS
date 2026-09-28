# def move_zeros(a):
#     integer_array,zero_array = [],[] 
#     for element in a:
#         if element==0:
#             zero_array.append(element)
#         else:
#             integer_array.append(element)
#     a=integer_array+zero_array
#     return a

# optimized approach 2 pointer 
def move_zeros(a):
    write = 0
    for index in range(len(a)):
        if a[index]!=0:
            a[write],a[index] = a[index],a[write]
            write+=1
    return a    


print(move_zeros([1,0,4,0,0,6,7,9,0,8]))