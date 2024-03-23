public with sharing class ToDoController {
@AuraEnabled
public static String saveToDo(String title, Date dueDate){
    try{
        ToDo__c todo = new ToDo__c();
        todo.Title__c = title;
        todo.Due_Date__c = dueDate;
        insert todo;
        return 'Success';
    } catch(Exception e){
        throw new AuraHandledException(e.getMessage());
    }
}

@AuraEnabled(cacheable=true)
public static List<ToDo__c> getToDoList(String taskStatus){
    return [select id, Title__c, Due_Date__c from ToDo__c WHERE Status__c =: taskStatus ORDER BY Due_Date__c];
}

@AuraEnabled
public static string updateToDo(Id toDoId){
    try {
        //List<ToDo__c> updatedTask = new List<ToDo__c>();
        ToDo__c todo = [select Id, Status__c from ToDo__c where Id=: todoId];
        todo.Status__c = 'Completed';
        //updatedTask.add(todo);
        update todo;
        return 'Success';
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}

}