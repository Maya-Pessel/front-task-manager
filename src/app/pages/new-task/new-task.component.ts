import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Task} from "../../models/task.model";
import {relativeToRootDirs} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  listId : string | null;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
    this.listId = this.route.snapshot.paramMap.get('listId')!;
  }


  ngOnInit(): void {
    //this.createTask()
  }

  createTask(title: string){
    this.taskService.createTask(title, this.listId).subscribe((newTask: any)=>{
      this.router.navigate(['../'], {relativeTo: this.route})
    });
  }
}
