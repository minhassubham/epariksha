import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid:any;
  questions:any;

  // variables that will monitor quiz
  marksGot=0;
  correctAnswers=0;
  attempted=0;
  isSubmit=false;

  timer:any;


  constructor(private _location:LocationStrategy,private _route:ActivatedRoute,private _question:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    this.loadQuestions();
  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        this.questions=data;
        this.timer=this.questions.length*2*60;

        this.questions.forEach((q:any) => {
            q['givenAnswer'] = '';
        });
        console.log(this.questions);
        this.startTimer();
      },
      (error:any)=>{
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'Error in loading questions!',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }

  public preventBackButton(){
    history.pushState(null,"", location.href);
    this._location.onPopState(()=>{
      history.pushState(null,"", location.href);

    });
  }

  public submitQuiz(){
    Swal.fire({
      title: 'Are you sure you want to submit the Quiz?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit quiz!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.evaluateQuiz();
        };
      }
    );
  }

  startTimer() {
    let timer=setInterval(()=>{
      this.timer--;
      if(this.timer==0){
        clearInterval(timer);
        this.evaluateQuiz();
      }
    },1000);
  }

  getFormattedTime(){
    let hours=Math.floor(this.timer/3600);
    let min=Math.floor(this.timer/60);
    let sec=this.timer%60;
    return `${hours}h: ${min}m: ${sec}s`;
  }

  evaluateQuiz(){
          this.isSubmit=true;
          // console.log(this.questions);
          this.questions.forEach((q:any) => {
            if(q.givenAnswer == q.answer){
              this.correctAnswers++;
              let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
              // this.marksGot+=marksSingle;
              let marksGot=this.marksGot+marksSingle;
              this.marksGot=parseFloat(marksGot.toFixed(2));
            }
            if(q.givenAnswer.trim() != ''){
              this.attempted++;
            }
          });
          console.log("Correct Answers: "+this.correctAnswers);
          console.log("Marks Got: "+this.marksGot);
          console.log(this.questions);
          console.log(this.attempted);
      }

    public printPage(){
      window.print();
    }
}
