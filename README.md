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
  construct : fucntion( name ){
    this.name = name;
  },
  sayHello : function(){
    alert('Hello I am ' + name + ' Simpson!');
  }
});

var homer = new Simpson('Homer');

homer.sayHello();
```
