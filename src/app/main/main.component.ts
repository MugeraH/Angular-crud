import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  color: Array<any> = [
    '#ffd31d',
    '#42240c',
    '#6a097d',
    '#9a1f40',
    '#007892',
    '#63b7af',
    '#abf0e9',
    '#c81912',
    '#f64b3c',
    '#fdba9a',
    '#45046a',
    '#5c2a9d',
    '#b5076b',
    '#f1ebbb',
    '#5fdde5',
  ];
  category: string = '';
  product: string = '';
  region: string;
  information: string;
  info: Array<any>;

  constructor(public service: CrudService) {}

  ngOnInit(): void {
    this.service.loadInformation().subscribe((data) => {
      this.info = data;

  
    });
  }

  onSumbit(dataForm: NgForm) {
    //create a random number generator function
    let randomNumber = Math.floor(Math.random() * this.color.length);
    let category = dataForm.value.category;
    let infoCategory = {
      category: dataForm.value.category,
      product: dataForm.value.product,
      region: dataForm.value.region,
      information: dataForm.value.information,
      colorCode: this.color[randomNumber],
      categoryCount: 0,
    };

    // console.log(infoCategory);

    this.service.saveInfromation(category, infoCategory);
  }

  onDelete(category: string, id: string) {
   

    this.service.deleteCategory(category, id);
  }
}
