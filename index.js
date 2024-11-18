const DependencyManager = require('./DependencyManager')


const manager = new DependencyManager();

manager.addTask('task1', ()=>console.log(`task one has been executed`), ['task3'])
manager.addTask('task2', ()=>console.log(`task two has been executed`), [`task1`])
manager.addTask('task3', ()=>console.log(`task three has been executed`))



setTimeout(()=>{
    console.log('resolving task 3   ');
    manager.resolvedDependency('task3');
},1000)

setTimeout(()=>{
    console.log('resolving task 1');
    manager.resolvedDependency('task1')
},1000)