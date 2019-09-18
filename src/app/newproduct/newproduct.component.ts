import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';
import { ImageCroppedEvent } from 'ngx-image-cropper';


declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require('shortid');
const moment = require('moment');

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.scss']
})
export class NewproductComponent implements OnInit {

	product: Product = new Product();
	constructor(private productService: ProductService) {}

	ngOnInit() {}
	imageChangedEvent: any = '';
    croppedImage: any = '';
    
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
		this.croppedImage = event.base64
		//console.log(this.croppedImage)
    }
    imageLoaded() {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }
	createProduct(productForm: NgForm) {
		productForm.value['productId'] = 'PROD_' + shortId.generate();
		productForm.value['productAdded'] = moment().unix();
		productForm.value['ratings'] = Math.floor(Math.random() * 5 + 1);
		productForm.value['productImageUrl'] = this.croppedImage;
		// if (productForm.value['productImageUrl'] === undefined) {
		// 	productForm.value['productImageUrl'] = 'http://via.placeholder.com/640x360/007bff/ffffff';
		// }

		productForm.value['favourite'] = false;

		const date = productForm.value['productAdded'];

		this.productService.createProduct(productForm.value);

		this.product = new Product();

		$('#exampleModalLong').modal('hide');

		toastr.success('product ' + productForm.value['productName'] + 'is added successfully', 'Product Creation');
	}

}
