def palin(s1):
    left,right=0,len(s1)-1
    while left < right:
        if s1[left]!=s1[right]:
            return "not a palindrome"
        else:
            left+=1
            right-=1 
    return "palindrome"

s1="abca"
print(palin(s1))