
class DependencyManager {

constructor(){
    this.tasks = new Map();
    this.executionQueue = [];
}


addTask(taskId, callback, dependencies = []){
    if(this.tasks.has(taskId)){
        throw new Error(`Tasks with the ${taskId}, already exists`)
    }

    this.tasks.set(taskId, {
        callback,
        dependencies: new Set(dependencies)})

  
    if(dependencies.length === 0){
       this.enqueueTask(taskId)
    }


}


resolvedDependency(taskId){
  
    this.tasks.forEach((task, key)=>{
        if(task.dependencies.has(taskId)){

         
            task.dependencies.delete(taskId) 
            if(task.dependencies.size === 0){
                this.enqueueTask(key)
            }

        }
    })
}

enqueueTask(taskId){
    this.executionQueue.push(taskId)
    process.nextTick(()=>this.executeTasks());
}

executeTasks(){
    while(this.executionQueue.length>0){
        const taskId = this.executionQueue.shift();
        const task = this.tasks.get(taskId)

        if(task){
            try{
                task.callback();
                this.tasks.delete(taskId)
            }
            catch(e){
                console.error(`error executing tasks ${taskId}, with the error ${e.message}`)
            }
        }
    }

}

// hasCircularDependency(taskId){
//     const visited = new Set();
//     const stack = new Set();

//     const visit = (currentTaskId)=>{

//        if (stack.has(currentTaskId))
//     {
//         return true;
//     }
   

//     if (visited.has(currentTaskUD))


    
    
//     }
// }


}

module.exports = DependencyManager