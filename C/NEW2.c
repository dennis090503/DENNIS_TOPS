#include<stdio.h>
#include<string.h>
////main(){
////	
////	
////	int n;
////	printf("enter Array length:");
////	scanf("%d",&n);
////	int a[n],temp,i,j;
////	
////	
////	for(i=0;i<n;i++){
////		printf(" enter value of arr:");
////		scanf("%d",&a[i]);
////	}
////	
////	for(i=0;i<n;i++){
////		temp=0;
////		for(j=0;j<i;j++){
////				if (a[i]<a[j]){
////					temp=a[i];
////					a[i]=a[j];
////					a[j]=temp;
////				}
////		}
////	}		
////	printf("\n");
////	printf("Array a(sorted):\n");
////	
////	for(i=0;i<n;i++){
////		printf(" %d ",a[i]);
////	}
////	printf("\n");
////	printf("Largest element:%d  \n",a[n-1]);
////	printf("2nd Largest element:%d\n",a[n-2]);
////	printf("Smallest element:%d",a[0]);
////}
//
////functions
////1.fun defination 
////2.fun calling
////
////types
////1.builtin
////2.userdefined
//
//
//prime(n){
//	
//	int count=0,i;
//	for(i=1;i<=n;i++){
//		if (n%i==0){
//			count++;
//		}
//	}
//	if (count==2){
//		return 1;
//	}
//	else{
//		return 0;
//	}
//}
//
//main(){
//	int n1,result;
//	
//	printf("Enter number:");
//	scanf("%d",&n1);
//	
//	result=prime(n1);
////	printf("%d",result);
//	if (result){
//		printf("number is prime ");
//	}
//	else{
//		printf("number is not prime ");
//		
//	}
//}




//main(){
//	char a[10],b[10],c[20];
//	
//	int i,j,n;
//	
//	printf("ENTER a:");
//	gets(a);
//
//	printf("ENTER b:");
//	gets(b);
//		
//		
//	for (i=0;a[i]!='\0';i++){
//		c[i]=a[i];
//	}
//	c[i]='\0';
////	printf("%d",i);
//	for (j=0;b[j]!='\0';j++){
//		c[i]=b[j];
//		i++;
//	}
//	c[i]='\0';
//	printf("c :%s",c);
//}


//main(){
//	char a[10],b[10];
//	int i,j,k=0;
//	printf("enter s:");
//	gets(a);
//	//monil -> linom
//	for (i=0;a[i]!='\0';i++){  //to get length of string
//	}
//	
//	// i=l+1
//	for (j=i-1;j>=0;j--){
//		b[k]=a[j];
//		k++;
//		}
//	b[k]='\0';
//	printf("rev str:%s",b);
//
//}


//main(){
//	char a[10],b[10];
//	int i,j,k,flag=1;
//	printf("enter s:");
//	gets(a);
//	
//	printf("enter s2:");
//	gets(b);
//		
//	for (i=0;a[i]!='\0';i++){  //to get length of s
//	}
//	for (j=0;b[j]!='\0';j++){  //to get length of s1
//	}
//	
//	// if the length are not equal it will automatically end process if i==j means we can move further
//	if (i==j){         
//		for (k=0;a[k]!='\0';k++){           
//			if (a[k]!=b[k]){  		//eg a=abc ,b=abz  when the pointer is at third position the if condition will be true
//				printf("strings are not equal");
//				flag=0; 			// by default flag is true once if condition is true flag is false
//				break;				//breaks  the loop so that it computation cannot proceed further
//			}
//		}
//		if (flag==1){				//flag=1 means all the char are compared and str a == str b
//			printf("strings are equal");
//		}
//	}
//	else{
//			printf("strings are not equal");
//	}
//}


//main(){
//	char a[10],b[10],c[20];
//	int i,j,r;
//	
//	printf("ENTER a:");
//	gets(a);
//
//	printf("ENTER b:");
//	gets(b);
//	
//	r=strcmp(a,b);
//	
//	if (r==0){
//		printf("str are equal");
//	}
//	else {
//		printf("str are not equal");	
//	}
//}


//struct Student{
//	char n[10];
//	int m;
//	int r_no;
//};
//main(){
//	
//	struct Student s={"Dennis",70,12};
//	printf("Name:%s\n",s.n);
//	printf("Marks:%d\n",s.m);
//	printf("Roll no:%d\n",s.r_no);
//
//}





//struct Array{
//	int num[10];
//	int i,n,j,temp;
//};
//main(){
//	
//	struct Array a;
//	printf("enter how many number you want to enter:");
//	scanf("%d",&a.n);
//	for (a.i=0;a.i<a.n;a.i++){
//		printf("enter value:"),
//		scanf("%d",&a.num[a.i]);	
//	}
//	printf("Array a:");
//	for(a.i=0;a.i<a.n;a.i++){
//		printf(" %d ",a.num[a.i]);
//	}
//	for(a.i=0;a.i<a.n;a.i++){
//		a.temp=0;
//		for(a.j=0;a.j<a.i;a.j++){
//				if (a.num[a.i]<a.num[a.j]){
//					a.temp=a.num[a.i];
//					a.num[a.i]=a.num[a.j];
//					a.num[a.j]=a.temp;
//				}
//		}
//	}		
//	printf("\n");
//	printf("Array a(sorted):");
//	for(a.i=0;a.i<a.n;a.i++){
//		printf(" %d ",a.num[a.i]);
//	}
//}



//union
//union Var{
//	int r,c;
//};
//
//main(){
//	union Var p;
//	int i,j;
//	p.r=4;
//	p.c=4;
//	
//	for (i=0;i<=p.r;i++){
//		for (j=0;j<=i;j++){
//			printf(" * ");
//		}
//		printf("\n");
//	}
//}


#include<stdio.h>
main(){
	FILE *fptr;
	fptr=fopen("test1.txt","w");
	fprintf(fptr,"\nHELLO read");
	fclose(fptr);
}
