import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/customer';
import { CustomerService } from 'src/app/customer.service';


@Component({
  selector: 'app-viewcustomer',
  templateUrl: './viewcustomer.component.html',
  styleUrls: ['./viewcustomer.component.css']
})
export class ViewcustomerComponent implements OnInit {

customer :Customer=new Customer();
customers!:any;
location!:string;
id!:number;

  constructor(private cservice:CustomerService) { }

  ngOnInit(): void {
    this.reloadData();
    
  }

  reloadData() {
  
  this.cservice.getAllCustomer()
  .subscribe(
    data => { console.log(data); 
      this.customers = data ;
      console.log(this.customers);
    },
    error => { console.log(error);  alert(error);}
  );
  }

  detail(cid:number):void{
    this.cservice.getCustomerById(cid)
      .subscribe(
        data => { console.log(data); this.customer=data; this.reloadData(); },
        error => { console.log(error);  alert(error);}
      );
     
  }


  searchById():void{
    if(this.id==null ){
      this.cservice.getAllCustomer().subscribe(mydata =>{
        this.customers=mydata;
  });
    }
    else{
    this.cservice.getCustomerById(this.id).subscribe(data =>{
    this.customer=data; console.log(this.customer); alert('Search found');
    this.customers=[]; this.customers.push(this.customer);
    },
    error => { console.log(error);  alert('Search not found');});
  }
  }

  

  searchByLocation():void{
    if(this.location===null){
      this.reloadData();
  }
    else{
      this.cservice.getAllCustomer()
      .subscribe(
      data => { console.log(data); this.customers=data;
      this.cservice.getCustomerByLocation(this.location)
      .subscribe(mydata =>{
      this.customers=mydata;alert('Search found');},
      error => { console.log(error); });
      },
      error => { console.log(error);  alert('Search not found');});
      
   }
}
}


