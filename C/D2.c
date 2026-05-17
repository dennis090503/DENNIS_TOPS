#include<stdio.h>
//
//main(){
//	int n;
//	
//	printf("enter age:");
//	scanf("%d",&n);
//	
//	if (n>100){
//		printf("invalid input");
//	}
//	else if(n>=18){
//		printf("eligible");
//	}
//	else{
//		printf("not eligible");
//	}
//}


//
//main(){
//	int n;
//	printf("enter number:");
//	scanf("%d",&n);
//	if (n==0){
//		printf("0 neither even nor odd");
//	}
//	else if(n%2==0){
//		printf("even");
//	}
//	else{
//		printf("odd");
//	}
//}



//main(){
//	int n1,n2;
//	printf("enter number1:");
//	scanf("%d",&n1);
//	printf("enter number2:");
//	scanf("%d",&n2);
//	
//	if (n1>n2){
//		printf("Max no:%d",n1);
//	}
//	else if(n2>n1){
//		printf("Max no:%d",n2);
//	}
//	else{
//		printf("both are equal");
//	}
//}




//main(){
//	int c1,c2,total,seat_type,n;
//	printf("1. APPLE\n2. MIRAJ \n");
//	printf("enter choice (1 or 2):");
//	scanf("%d",&c1);
//	
//	if (c1==1){
//		printf("welcome to apple choose your ticket preference:\n1. Recliner \n2. Normal seat:\n");
//		printf("Enter choice:");
//		scanf("%d",&seat_type);
//		if (seat_type==1){
//			printf("enter person count :");
//			scanf("%d",&n);
//			total=n*300;
//		}
//		else if(seat_type==2){
//			printf("enter person count :");
//			scanf("%d",&n);
//			total=n*150;
//		}
//	}
//	else if (c1==2){
//		printf("welcome to miraj choose your ticket preference:\n1. Recliner \n2. Normal seat:\n");
//		printf("Enter choice:");
//		scanf("%d",&seat_type);
//		if (seat_type==1){
//			printf("enter person count :");
//			scanf("%d",&n);
//			total=n*350;
//		}
//		else if(seat_type==2){
//			printf("enter person count :");
//			scanf("%d",&n);
//			total=n*220;
//		}
//	}
//printf("Bill amount:%d",total);
//}

//loops

//1.entry control loops:=for ,while
//2.exit control loop:=do while;

//components of loop:initialization,condition and increment

main(){
	int n;
	int sum=0;
	printf("enter n:");
	scanf("%d",&n);
	while(n<0){
		sum=sum+n;
//		printf("%d",n);
		n-=1;
	}	
	printf("%d",sum);
}
