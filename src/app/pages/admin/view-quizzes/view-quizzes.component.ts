import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[
    {
      qId:'',
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:'',
      category:{
        title:'',
      }
    },
    
  ]

  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(
      (data:any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) =>{
        console.log(error);
        Swal.fire('Error!',"Error in loading the data",'error');
      }
    )
  }

  // Delete Quiz functionality

  deleteQuiz(qId:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed){

        // delete functionality
        this._quiz.deleteQuiz(qId).subscribe(
          (data:any) => {
            this.quizzes = this.quizzes.filter(quiz => quiz.qId != qId);
            console.log(data);
            Swal.fire('Success!','Quiz deleted successfully','success');
            this.quizzes = this.quizzes.filter(quiz => quiz.qId !== qId);
          },
          (error)=>{
            console.log(error);
            Swal.fire('Error!','Error in deleting the quiz','error');
          });
      }
    })
  }

}
