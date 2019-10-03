import { Product } from '../../../../shared/models/product';
import { ProductService } from '../../../../shared/services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {IPayPalConfig, ICreateOrderRequest,ITransactionItem} from 'ngx-paypal';
 
declare var $: any;


@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
	products: Product[];
	date: number;
	totalPrice = 0;
	tax = 6.4;
	showSuccess
	showCancel
	showError
	items=[];



	constructor(private productService: ProductService) {
		/* Hiding Billing Tab Element */
		// document.getElementById('productsTab').style.display = 'none';
		// document.getElementById('shippingTab').style.display = 'none';
		// document.getElementById('billingTab').style.display = 'none';
		// document.getElementById('resultTab').style.display = 'block';

		this.products = productService.getLocalCartProducts();

	    this.products.forEach(p=>{

			let trans:ITransactionItem =  {
				name: p.productName,
				quantity: '1',
				category: 'DIGITAL_GOODS',
				unit_amount: {
					currency_code: 'USD',
					value: p.productPrice.toFixed(2)
				}
			}
			this.items.push(trans);
		}) 

		this.products.forEach((product) => {
			this.totalPrice += product.productPrice;
		});

		console.log(this.products)
		console.log(this.items)

		this.date = Date.now();
	}

	public payPalConfig ? : IPayPalConfig;
 
	ngOnInit(): void {
        this.initConfig();
    }

    private initConfig(): void {
        this.payPalConfig = {
            currency: 'USD',
            clientId: 'ASSxTGb0961mxAaId62jWitolkY_PgarFSjjVCor3Xi9EzGb-BB8-o5IXbhqVAWNjGbDG8pUpFgVuUdm',
			createOrderOnClient: (data) => < ICreateOrderRequest > {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: this.totalPrice.toFixed(2),
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: this.totalPrice.toFixed(2)
                            }
                        }
                    },
                    items: this.items
				}
	
			]
            },
            advanced: {
                commit: 'true'
            },
            style: {
                label: 'paypal',
                layout: 'vertical'
            },
            onApprove: (data, actions) => {
                console.log('onApprove - transaction was approved, but not authorized', data, actions);
                actions.order.get().then(details => {
                    console.log('onApprove - you can get full order details inside onApprove: ', details);
                });

            },
            onClientAuthorization: (data) => {
                console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
                this.showSuccess = true;
            },
            onCancel: (data, actions) => {
                console.log('OnCancel', data, actions);
                this.showCancel = true;

            },
            onError: err => {
                console.log('OnError', err);
                this.showError = true;
            },
            onClick: (data, actions) => {
                console.log('onClick', data, actions);
              //  this.resetStatus();
            }
		};
		
		console.log(this.payPalConfig)
    }

	downloadReceipt() {
		const data = document.getElementById('receipt');
		// console.log(data);

		html2canvas(data).then((canvas) => {
			// Few necessary setting options
			const imgWidth = 208;
			const pageHeight = 295;
			const imgHeight = canvas.height * imgWidth / canvas.width;
			const heightLeft = imgHeight;

			const contentDataURL = canvas.toDataURL('image/png');
			const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
			const position = 0;
			pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
			pdf.save('MyStoro.pdf'); // Generated PDF
		});
	}
}
