import { Injectable} from '@angular/core';


@Injectable()

export class SharedDataService {


    testData = [
    { descr : "What is Angular",
           quesNo: 1 ,
           options:[
             {
               descr:"Framework",
               seq:"12"
             },
              {
               descr:"Library",
               seq:"11"
             },
              {
               descr:"Browser",
               seq:"10"
             },
              {
               descr:"Language",
               seq:"9"
             },
             
           ],
           answer: 12
  },
  { descr : "What is name of a special function of class which gets called when object is created and it’s syntax in Typescript?",
           quesNo: 2 ,
           options:[
             {
               descr:"Constructor",
               seq:"20"
             },
              {
               descr:"ngOnInit",
               seq:"21"
             },
              {
               descr:"Injectable",
               seq:"23"
             },
              {
               descr:"Component",
               seq:"24"
             },
             
           ],
           answer: 20
  },
  
  { descr : "What are the basic rules of Decorators?",
           quesNo: 3 ,
           options:[
             {
               descr:"a function which has annotation of @() with optional parameters",
               seq:"25"
             },
              {
               descr:"a function which has annotation of @() with mandatory",
               seq:"26"
             },
              {
               descr:"a function which has callback concept",
               seq:"27"
             },
              {
               descr:"a function which has closure concept",
               seq:"28"
             },
             
           ],
           answer: 20
     } , { descr : "In Angular, you can pass data from child component to parent component using?",
           quesNo: 4 ,
           options:[
             {
               descr:"@Output",
               seq:"29"
             },
              {
               descr:"@Input",
               seq:"30"
             },
              {
               descr:"Input",
               seq:"31"
             },
              {
               descr:"Output",
               seq:"32"
             },
             
           ],
           answer: 20
     }, { descr : "What a syntax for ngFor ?",
           quesNo: 5 ,
           options:[
             {
               descr:"*ngFor=\"let user of users \"",
               seq:"33"
             },
              {
               descr:"ngFor=\"let user of users \"",
               seq:"34"
             },
              {
               descr:"ngFor=\"let user in users \"",
               seq:"35"
             },
              {
               descr:"*ngFor=\"let user in users \"",
               seq:"36"
             },
             
           ],
           answer: 33
     },

      { descr : "We must import ____________ module to use [(ngModel)].",
           quesNo: 6 ,
           options:[
             {
               descr:"FormModule",
               seq:"37"
             },
              {
               descr:"ReactiveFormsModule",
               seq:"38"
             },
              {
               descr:"TemplateFormModule",
               seq:"39"
             },
              {
               descr:"FormsModule",
               seq:"40"
             },
             
           ],
           answer: 40
     },
      { descr : "which example to define custom event with Boolean argument with code and passing data to parent component",
           quesNo: 7 ,
           options:[
             {
               descr:"objEvent = new EventEmitter<boolean>()",
               seq:"41"
             },
              {
               descr:"@Output objEvent = new EventEmitter<boolean>",
               seq:"42"
             },
              {
               descr:"@Input objEvent = new EventEmitter<boolean>()",
               seq:"43"
             },
              {
               descr:"objEvent = new EventEmitter<boolean>",
               seq:"44"
             },
             
           ],
           answer: 40
     },

      { descr : "Import ____________ module to use reactive form.",
           quesNo: 8 ,
           options:[
             {
               descr:"FormModule",
               seq:"37"
             },
              {
               descr:"ReactiveFormsModule",
               seq:"38"
             },
              {
               descr:"TemplateFormModule",
               seq:"39"
             },
              {
               descr:"FormsModule",
               seq:"40"
             },
             
           ],
           answer: 38
     },
     { descr : "Correct  syntax to bind custom CSS class (e.g. highlighted) to a <div> tag.",
           quesNo: 9 ,
           options:[
             {
               descr:"<div [Style]= \"highlighted\"]",
               seq:"41"
             },
              {
               descr:"<div [classStyle]= \"highlighted\"]",
               seq:"42"
             },
              {
               descr:"<div [className]= \"highlighted\"]",
               seq:"43"
             },
              {
               descr:"<div [class]= \"highlighted\"]",
               seq:"44"
             },
             
           ],
           answer: 44
     },
          { descr : "You can access HTML local reference alias in component’s typescript code using ___________ decorator.",
           quesNo: 10,
           options:[
             {
               descr:"@",
               seq:"45"
             },
              {
               descr:"#",
               seq:"46"
             },
              {
               descr:"*",
               seq:"47"
             },
              {
               descr:"&",
               seq:"48"
             }
             
           ],
           answer: 44
     }


  ]


  getExamQuestions(){
    return this.testData;
  }
}