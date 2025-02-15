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

//main(){
//	int i,j,r,k;
//	printf("enter row:");
//	scanf("%d",&r);
//	
//	for (i=r;i>=1;i--){
//		for (k=1;k<=r-i;k++){
//			printf(" ");
//		}
//		for (j=1;j<=i;j++){
//			printf(" * ");
//		}
//	printf("\n");
//	}
//}

//
//main(){
//	int i,j,r,k;
//	printf("enter row:");
//	scanf("%d",&r);
//	
//	for (i=r;i>=1;i--){
//		for (j=1;j<=i;j++){
//			printf("*");
//		}
//	printf("\n");
//	}
//}



//main(){
//	int i,j,r,k;
//	printf("enter row:");
//	scanf("%d",&r);
//	
//	for (i=r;i>=1;i--){
//		for (k=1;k<=r-i;k++){
//			printf(" ");
//		}
//		for (j=1;j<=i;j++){
//			printf("*");
//		}
//	printf("\n");
//	}
//}


//main(){
//	char n='A';
//	int i,j,r,k;
//	printf("enter row:");
//	scanf("%d",&r);
//	
//	for (i=1;i<=5;i++){
//		for (j=1;j<=i;j++){
//			printf("%c",n);
//			n++;
//		}
//	printf("\n");
//	}
//}

//
//main(){
//	char n='B';
//	
//	switch(n){
//		
//		case 'A':
//			printf("It is vowel");
//			break;
//		
//		case 'E':
//			printf("It is vowel");
//			break;
//		case 'I':
//			printf("It is vowel");
//			break;
//		case 'O':
//			printf("It is vowel");
//			break;
//		case 'U':
//			printf("It is vowel");
//			break;
//		default:
//			printf("It is consonant");
//	}
//}




//main(){
//	int n;
//	printf("enter n:");
//	scanf("%d",&n);
//	switch(n){
//		
//		case 1:
//			printf("jan");
//			break;
//		
//		case 2:
//			printf("feb");
//			break;
//		case 3:
//			printf("mar");
//			break;
//		case 4:
//			printf("apr");
//			break;
//		case 5:
//			printf("may");
//			break;
//		case 6:
//			printf("jun");
//			break;
//		case 7:
//			printf("jul");
//			break;
//		case 8:
//			printf("agu");
//			break;
//		case 9:
//			printf("sept");
//			break;
//		case 10:
//			printf("oct");
//			break;
//		case 11:
//			printf("nov");
//			break;
//		case 12:
//			printf("dec");
//			break;
//		
//		default:
//			printf("enter valid input");
//	}
//}



//main(){
//	int n=20,n1;
//	
//	printf("Welcome to number game");
//	
//	while(1){
//		printf("\nEnter number b/w 1 to 50:");
//		scanf("%d",&n1);
//		
//		if (n==n1){
//			printf(" You won");
//			break;
//		}
//		else if(n1>n){
//			printf("The num is less than your guess");
//			continue;
//		}
//		else if(n1<n){
//			printf("The num is greater than your guess");
//			continue;
//		}
//		else if(n1>n){
//			printf("The entered num is less than your guess");
//			continue;
//		}
//		else{
//			printf("The entered should be b/w 1 and 50");
//			continue;
//		}
//	}
//}

//main(){
//	
//	int a[3][3]={{1,1,1},{1,1,1},{1,1,1}},b[3][3]={{1,1,1},{1,1,1},{1,1,1}},i,j,k,sum,c[3][3];
//	
//	
//	for(i=0;i<3;i++){
//		for(j=0;j<3;j++){
//			sum=0;
//			for (k=0;k<3;k++){
//				sum+=a[i][k]*b[k][j];
//			}
//			c[i][j]=sum;
////			printf("%d",sum);
//		}
//	}		
//	
//	printf("Array a:\n");
//	
//	for(i=0;i<3;i++){
//		for(j=0;j<3;j++){
//		printf("%d ",a[i][j]);
//		}
//		printf("\n");
//	}
//	printf("Array b:\n");
//	
//	for(i=0;i<3;i++){
//		for(j=0;j<3;j++){
//		printf("%d ",b[i][j]);
//		}
//		printf("\n");
//	}
//	printf("multiplication:\n");
//	
//	for(i=0;i<3;i++){
//		for(j=0;j<3;j++){
//		printf("%d ",c[i][j]);
//		}
//		printf("\n");
//	}
//}


main(){
	int n;
	int a[n],temp,i,j;
	
	printf("enter Array length:");
	scanf("%d",&n);
	
	for(i=0;i<n;i++){
		printf(" enter value of arr:");
		scanf("%d",&a[i]);
	}
	
	for(i=0;i<n;i++){
		temp=0;
		for(j=0;j<i;j++){
				if (a[i]<a[j]){
					temp=a[i];
					a[i]=a[j];
					a[j]=temp;
				}
		}
	}		
	printf("\n");
	printf("Array a(sorted):\n");
	
	for(i=0;i<n;i++){
		printf(" %d ",a[i]);
	}
	printf("\n");
	printf("Largest element:%d  \n",a[n-1]);
	printf("2nd Largest element:%d\n",a[n-2]);
	printf("Smallest element:%d",a[0]);
}
