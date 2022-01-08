import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor=ClassicEditor;
  qId:any;
  qTitle:any;
  question={
    quiz:{
      qId:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };
  
  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _router:Router) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params['title'];
    console.log(this.qId);
    this.question.quiz['qId']=this.qId;
  }

  formSubmit(){
    // alert("Testing");
    if(this.question.content.trim()=='' || this.question.content.trim()==null){
      alert("Question content is required");
      return;
    }

    if(this.question.option1.trim()=='' || this.question.option1.trim()==null){
      alert("Option 1 is required");
      return;
    }

    if(this.question.option2.trim()=='' || this.question.option2.trim()==null){
      alert("Option 2 is required");
      return;
    }

    // Else submit the form

    this._question.addQuestion(this.question).subscribe(
      (data:any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Question added successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          this._router.navigate(['/admin/view-questions/'+this.qId+'/'+this.qTitle]);
        });
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';
        console.log(data);
      },
      (error:any) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(error);
      }
    );
  }
    
}
