#include<stdio.h>
//task-1
rev_number(n){
	int temp,n1=0;
	while(n>0){
		temp=n%10;
		n1=(n1*10)+temp;
		n=n/10;
	}
	printf("reversed number:%d",n1);
}
main(){
	int n;
	printf("enter n=");
	scanf("%d",&n);
	rev_number(n);
}
//task-2
//main(){
//	char c;
//	int i,j;
//	for (i=0;i<=3;i++){
//		c='A';
//		for (j=0;j<=i;j++)
//		{
//			printf("%c",c);
//			c++;
//		}
//		printf("\n");
//	}
//}

//task-3
//main(){
//	
//	int a[10],n,i,j,temp;
//	printf("enter n:");
//	scanf("%d",&n);
//	for(i=0;i<n;i++){
//		printf(" enter value of arr:");
//		scanf("%d",&a[i]);
//	}
//	
//	for(i=0;i<n;i++){
//		temp=0;
//		for(j=0;j<i;j++){
//				if (a[i]>a[j]){
//					temp=a[i];
//					a[i]=a[j];
//					a[j]=temp;
//				}
//		}
//	}	
//	for(i=0;i<n;i++){
//		printf(" %d ",a[i]);
//	}
//}
