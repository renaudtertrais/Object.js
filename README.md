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
```javascript
var MyClass = ParentClass.extend( prototype );
```

- `prototype` is obviously the  `prototype` of `MyClass` (i.e an object `{}` of methods). 
- If you define a `constructor`, it will be call as the constructor of your class.
- Even if the `prototype` is empty, it contains `parent()`and `Parent` (see below).
- Now `MyClass` can be extanded too.
- You can pass an empty prototype and define methods after.

```javascript
var MyClass = ParentClass.extend( {} );
// or
var MyClass = ParentClass.extend();

// add methods :
MyClass.prototype.myMethod = function(){ 
  //... 
};

// WARNING : do not override the prototype because it will break the legacy
MyClass.prototype = {
  myMethod : function(){ 
    // THIS IS BAD :)
  }
};
```

Example : 
```javascript
var Simpson = Object.extend({
  constructor : function( name ){
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
```javascript
// attribute
this.Parent.myVar ;

// GrandParent attribute
this.Parent.Parent.myVar ;

// call parent method via Parent
this.Parent.myMethod.call(this, param1 , ... );

// or easier with .parent()
this.parent('myMethod', param1 , ...);
```

Example :
```javascript
var SimpsonChild = Simpson.extend({
  constructor : function( name , age ){
    this.age = age;
    
    // call parent constructor
    this.parent('constructor',name);
  },
  //  overriding parent class
  sayHello : function(){
    return this.parent('sayHello') + ' I am only ' + this.age + ' years old.';
  }
});

var bart = new SimpsonChild('Bart',10);

alert ( bart.sayHello() ); // Hello I am Bart Simpson! I am only 8 years old.
```

