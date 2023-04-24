import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import {ResultPage} from '../result/result';
import { SharedDataService } from '../../shared/shared-data-service'


  /**
   *@author acharyaks90
   *@description test Page Copponent
   *@Component Class
   */


@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {
  test: string = "NG test";
  relationship = '';
  t1 = new Date(0);
  timerInterval: any;
  timer = 0;
  score = 0;
  user = {};
  currentQuestion = 1;
  questionList = [];
  ques = { descr : "What is Angular Js",
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
           answer: 12,
           answerFilled:''
  }

  /**
 * @description Initialize function
 * @constructor
 * @param {object} NavController - The title of the book.
 * @param {object} NavParams - The author of the book.
 */
  constructor( public navCtrl: NavController,
               public navParams: NavParams,
               public sharedDataService: SharedDataService ) {
                this.user = this.navParams.get('data');
                this.questionList = sharedDataService.getExamQuestions();
                this.questionList.map((item)=>{
                  item.answerFilled='';
                })
                this.loadQuestion();
                this.t1.setHours( 0,20,0,0);
                this.timer = this.t1.getTime() ;
                this.timerInterval =setInterval(()=>{
                  this.timer = this.timer  -1000;
                },1000)

                setTimeout(()=>{
                     this.completeTest(); 
                },720000)
  
  }
   /**
    * @author acharyaks90
    * @description Finish the test
    * @method
    */
  completeTest(){
    this.selectedAnswer();
    this.navCtrl.push(ResultPage,{
      data: {
        user:this.user,
        test:{seq:12,
             score:this.score}
      }
    });
  }

  /**
    * @author acharyaks90
    * @description Load Questions from test DB
    * @method loadQuestion
    */

  loadQuestion(){
    this.ques = this.questionList[this.currentQuestion-1];
  }

    /**
    * @author acharyaks90
    * Load Previous Question
    * @method previousQuestion
    */

  previousQuestion(){
    if(this.currentQuestion > 1){
      --this.currentQuestion;
      this.loadQuestion()
    }
  }

  /**
    * @author acharyaks90
    * @description Load Next Question
    * @method nextQuestion
    */
   nextQuestion(){
    if(this.currentQuestion < this.questionList.length){
      ++this.currentQuestion;
      this.loadQuestion()
    }
  }

  /**
    * @author acharyaks90
    * @description Event fired on answering the question
    * @method nextQuestion
    */
  
  selectedAnswer(){
        this.score =0;
      this.questionList.forEach((item)=>{
        if(item.answerFilled && item.answer == item.answerFilled ){
          this.score = this.score + 5;
        }
      })
  }

   /**
    * @author acharyaks90
    * @description Event fired on answering the question
    * @method ngOnDestroy
    */

  ngOnDestroy() {
     window.clearInterval(this.timerInterval);
  }

}
