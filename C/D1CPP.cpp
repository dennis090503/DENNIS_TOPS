#include<iostream>

using namespace std;

//1
//main(){
//	
//	int n[10]={1,2,3,4,5},i,sum=0;
//	for (i=0;i<=4;i++){
//		sum+=n[i];
//	}
//	cout<<"sum:"<<sum;
//}


//2

//class MyClass{
//	public:
//		
//		MyClass(){
//			cout<<"Welcome\n";
//		}
//		
//		~MyClass(){
//			cout<<"Thankyou";
//		}
//		
//		void triangle(){
//			int i;
//			for (i=0;i<=5;i++){
//				cout<<"hello";
//				cout<<"\n";
//			}
//		}
//};
//main(){
//	
//	MyClass obj;
//	obj.triangle();
//}




class MyClass{
	public:
		
		MyClass(){
			cout<<"Welcome to hotel\n";
		}
		
		~MyClass(){
			cout<<"Thankyou visit again";
		}
		
		void menu(){
			int choice,sum=0;
			while(1){
				cout<<"1.dosa\n2.idli\n3.utaapa\n4.Exit\n";
				cout<<"ENTER CHOICE:";
				cin>>choice;
				if (choice==1){
					sum+=100;
				}
				else if(choice==2){
					sum+=50;
				}
				else if(choice==3){
					sum+=90;
				}
				else if(choice==4){
					break;
				}
				else {
					cout<<"enter valid choice\n";	
				}
			}
			cout<<"Total:"<<sum<<"\n";	
		}
};
main(){
	
	MyClass obj;
	obj.menu();
}
