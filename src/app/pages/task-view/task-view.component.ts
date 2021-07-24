import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../task.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Task} from "../../models/task.model";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: any;
  tasks: any;

  selectedListId: any

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        if(params.listId){
          this.selectedListId = params.listId;
          this.taskService.getTasks(params.listId).subscribe((tasks: any)=>{
          this.tasks = tasks;
          })
        }else {
          this.tasks = undefined
        }
      }
    )
    this.taskService.getLists().subscribe((lists: any)=>{
      this.lists = lists;
    })
  }

  onTaskClick(task: Task) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      console.log("Completed successfully!");
      // the task has been set to completed successfully
      task.completed = !task.completed
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
       this.router.navigate(['/lists']);
       console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter((val: { _id: string; }) => val._id !== id)
      console.log(res);
    })
  }

}
