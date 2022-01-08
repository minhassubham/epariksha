import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid:any;
  quiz:any;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _router:Router,) { }

  ngOnInit(): void {

    this.qid=this._route.snapshot.params['qid'];
    // console.log(this.qid);
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        console.log(data);
        this.quiz=data;
      },
      (error:any)=>{
        console.log(error);
        alert("Error in loading quiz data!")
      }
    );
  }
  public startQuiz(){
    Swal.fire({
      title: 'Are you sure you want to start the Quiz?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, start quiz!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/start/',this.qid]);
      }else{
        Swal.fire(
          'Cancelled',
          'Quiz not started',
          'error'
        );
      }
    }
    );
  }
}
