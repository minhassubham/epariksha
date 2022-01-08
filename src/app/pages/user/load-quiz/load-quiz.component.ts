import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizzes:any;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {
    

    this._route.params.subscribe(
      (params)=>{
        this.catId=params['catId'];

        if(this.catId==0){
          console.log("Load all the Quiz");
    
          this._quiz.getActiveQuizzes().subscribe(
            (data:any)=>{
              console.log(data);
              this.quizzes=data;
            },
            (error:any)=>{
              console.log(error);
              alert("Error Occured! in loading all the Quiz");
            }
          );
        }else{
          console.log("Load Quiz of Category: "+this.catId);
          this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
            (data:any)=>{
              console.log(data);
              this.quizzes=data;
            },
            (error:any)=>{
              console.log(error);
              alert("Error Occured! in loading Quiz of Category: "+this.catId);
            }
          );
        }
      },
      (err)=>{
        console.log(err);
      }
    );
    
  }

}
