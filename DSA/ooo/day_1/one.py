# brute force

def rev_array(a=[]):
    if a==[]:
        print("no element in array")
        return
    b=[]
    for index in range(len(a)-1,-1,-1):
        b.append(a[index])
    
    return b

# 2 pointer in place revarsal
def rev_array(a):
    left, right = 0, len(a) - 1
    while left < right:
        a[left], a[right] = a[right], a[left]
        left += 1
        right -= 1
    return a


def rev_string(s):
    str_arr=list(s)
    left,right=0,len(str_arr)-1
    while left<right:
        str_arr[left],str_arr[right]=str_arr[right],str_arr[left]
        left+=1
        right-=1
    return "".join(str_arr)

input_array=[1,2,3]
print(rev_array(input_array))

input_string = "abc"
print(rev_string(input_string))