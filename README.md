Object.js
=========

Give an extend capacity to Object class. OOP in javascript is more convenient now ! (I hope)

## What's in there ?

1. `Object.prototype` get 2 extra things :
  - `Parent` : A pointer to parent's prototype. In the case of `Object` : `Parent = null`, because it is the super class
  - `parent()`: An helper to call parent's methods.
2. `Object` get a static method call `extend` which allow to extend this super class.

Actually all the futur classes will have thoses methodes and attributes.

## Create a class

Use :
```
var MyClass = ParentClass.extend( prototype );
```

Example : 
```
var Simpson = Object.extend({
  construct : function( name ){
    this.name = name;
  },
  sayHello : function(){
    return 'Hello I am ' + name + ' Simpson!';
  }
});

var homer = new Simpson('Homer');

alert( homer.sayHello() ); // Hello I am Homer Simpson!
```

## Access to parent class
Use (inside the class) :
```
// atribute
this.Parent.myVar ;

// GrandParent attribute
this.Parent.Parent.myVar ;

// call parent method via Parent
this.Parent.myMethod.call(this, param1 , ... );

// or easier with .parent()
this.parent('myMethod', param1 , ...);
```

Example :
```
var SimpsonChild = Simpson.extend({
  construct : function( name , age ){
    this.name = age;
    
    // call parent constructor
    this.parent('construct',name);
  },
  //  overriding parent class
  sayHello : function(){
    return this.parent('sayHello') + ' I am only ' + this.age + ' years old.';
  }
});

var bart = new SimpsonChild('Bart',8);

alert ( bart.sayHello() ); // Hello I am Bart Simpson! I am only 8 years old.
```

