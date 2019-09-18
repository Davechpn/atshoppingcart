import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  elements: any = [
    {id: 1, customer_name: 'Mark Anthony', time: '5 June 22:10', delivery_address: '15 harrel', status: 'delivered'},
    {id: 1, customer_name: 'Mark Anthony', time: '5 June 22:10', delivery_address: '15 harrel', status: 'processing'},
    {id: 1, customer_name: 'Mark Anthony', time: '5 June 22:10', delivery_address: '15 harrel', status: 'delivered'},

  ];

  headElements = ['ID', 'Customer Name', 'Time', 'Delivery Address', 'Status'];
  constructor() { }

  ngOnInit() {
  }

}
