import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";


@Controller('tasks')
export class TaskController {
    
    constructor(private readonly taskService: TaskService){}

    @Get()
    async getAllTasks(){
        try{
            return await this.taskService.getAllTasks()
        }catch(error){
            throw new BadRequestException(error.message)
        }
    }

    @Post()
    async createTask(@Body() data: Task){
        try{
            const task = await this.taskService.createTask(data)

            if(task){
                return task
            }
            else {
                throw new BadRequestException('Could not create task')
            }
        }catch(error){
            throw new BadRequestException(error.message)
        }
        
    }

    @Get(':id')
    async getTaskById(@Param('id') id:string){
        try{
            const task = await this.taskService.getTaskById(Number(id))
            if(task){
                return task
            }
            else {
                throw new BadRequestException('Task does not exist')
            }
        }catch(error){
            throw new BadRequestException(error.message)
        }
        
    }

    @Delete(':id')
    async deleteTask(@Param('id') id:string){
        try {
            const task = await this.taskService.deleteTask(Number(id))
            return task
        } catch(error) {
            throw new BadRequestException('Could not delete, task does not exist', error.message)
        }
    }

    @Put(':id')
    async updateTask(@Param('id') id:string, @Body() data:Task){
        try{
            const task = await this.taskService.updateTask(data, Number(id))

            if(task){
                return task
            }
            else {
                throw new BadRequestException('Could not update task')
            }
        }catch(error){
            throw new BadRequestException('Not found', error.message)
        }
        
    }
}
