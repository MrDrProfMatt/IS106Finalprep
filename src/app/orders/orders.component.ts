import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlexModalService } from '../shared-components/flex-modal/flex-modal.service';
import { Http } from '@angular/http';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { LayoutModule } from '@angular/cdk/layout';
import { Console } from 'console';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {

  orders:Array<any> = [];

  name = '';
  errorMessage= '';
  confirmMessage='';
  constructor(
    private router: Router,
    private flexModal: FlexModalService,
    private http: Http
  ) {

  }

  async ngOnInit() {
    this.loadDefaultOrders();
  }


  calculate(){
   const total = this.orders.reduce((inc, item,i,array)=>{
      inc += item.price * item.quantity;
      return inc;
    },0);
    const taxAmount = total * .1;

    const subTotal = total - taxAmount;

    console.log('from calculate () total:', total, 'taxAmount',taxAmount,'subTotal', subTotal);
    return{
      total: total,
      taxAmount: taxAmount,
      subTotal: subTotal,
    }
  }
  submit(){
    const commaindex = this.name.indexOf(', ');
    let error =false;


    if(this.name === ''){
      this.errorMessage ='Name must not be empty!';
      error=true;
    } else if (commaindex === -1) {
      this.errorMessage = 'Name must have a comma!';
      error=true;
    }
    if (!error) {
    const firstName = this.name.slice(commaindex + 1, this.name.length);
    const lastName = this.name.slice(0,commaindex);
    const fullName = firstName + ' ' + lastName;

   const caluculation = this.calculate();
   this.confirmMessage= `Thank you for your order ${fullName} Your sub total is:
   ${caluculation.subTotal}. Your tax amount is ${caluculation.taxAmount}. Your grand total is ${caluculation.total}`;
   this.flexModal.openDialog('confirm-modal');
  } else{
      this.flexModal.openDialog('error-modal');
    }

  }
  loadDefaultOrders(){
    this.orders = [{
      "pid": "1",
      "image":"assets/sm_hotdog.jpeg",
      "description": "Hot Dog",
      "price": 5.00,
      "quantity": 2
    }, {
      "pid": "2",
      "image":"assets/sm_hamberger.jpeg",
      "description": "Hamberger",
      "price": 6.00,
      "quantity": 1
    }, {
      "pid": "3",
      "image":"assets/sm_pizza.jpeg",
      "description": "Large Pizza",
      "price": 12.00,
      "quantity": 2
    }];
  }
  delete(index:number){
    this.orders.splice(index,1);
  }
  additem(item:string){
    switch (item) {
      case 'hot dog':
        this.orders.unshift({
          "pid": "1",
          "image":"assets/sm_hotdog.jpeg",
          "description": "Hot Dog",
          "price": 5.00,
          "quantity": 0
        })
        break;
        case 'hamberger':
          this.orders.unshift({
            "pid": "2",
            "image":"assets/sm_hamberger.jpeg",
            "description": "Hamberger",
            "price": 6.00,
            "quantity": 0
          })
          break;
          case 'pizza':
            this.orders.unshift( {
              "pid": "3",
              "image":"assets/sm_pizza.jpeg",
              "description": "Large Pizza",
              "price": 12.00,
              "quantity": 0
            })

            break;
    }

  }

  // prepare result, splice last name, first name

  // Calculate total and perform input validation

  // display the order form with orders from orders.json

  // Clear the orders form

  // Add items 'Hot Dog', 'Hamberger' and 'Pizza' to list when corresponding button is clicked

  // delete line item (order) when delete button is click

  // read in the orders.json file and populate the list table with the initial orders (3)

}
