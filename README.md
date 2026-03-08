1.  What is the difference between var, let, and const?

Ans: Below is the difference between var, let, and const--
    ** var : 
    (i) var is the older way to declare variables.
    (ii) It can be redeclared and updated.
    (iii) Sometimes it causes unexpected behavior because it ignores block scope (if, for, etc.).

    for example--> var name = "Rahim";

    ** let : 
    (i) let is a modern variable declaration introduced in ES6.
    (ii) It is block-scoped, meaning it only exists inside the {} block where it is defined.
    (iii) It can be updated, but cannot be redeclared in the same scope.

    for example--> let age = 20;
                    age = 21; // allowed
                    <!-- let age = 22; // not allowed in same scope -->

    ** const : 
    (i) const is also block-scoped.
    (ii) It cannot be updated or redeclared after declaration.
    (iii) It must be assigned a value when created.

    for example--> const city = "Rangpur";
                    <!-- city  = "Dhaka"; // not allowed -->

2. What is the spread operator (...)?

Ans: The spread operator allows us to expand elements from arrays or objects. That is, it spreads the elements. It is commonly used to copy, merge, or pass multiple values easily.

    *Example with Array:
    const numbers = [1, 2, 3];
    const newNumbers = [...numbers, 4, 5];

    *Example with Object:
    const user = { name: "Rahim", age: 20 };
    const updatedUser = {
        ...user,
        city: "Dhaka"
    } ;


3. What is the difference between map(), filter(), and forEach()?

Ans : Below is the difference between map(), filter(), and forEach()--

** map() : 
    (i) Creates a new array by transforming each element.
    
    for example-->  const numbers = [1, 2, 3];
                    const doubled = numbers.map(num => num * 2);

** filter() : 
    (i) Creates a new array with elements that pass a condition.
    
    for example-->  const numbers = [1, 2, 3, 4];
                    const even = numbers.filter(num => num % 2 === 0);

** forEach() : 
    (i) Loops through an array but does not return a new array.
    (ii) Usually used for actions like printing or updating values.
    
    for example-->  const numbers = [1, 2, 3];
                    numbers.forEach(num => {
                        console.log(num);
                    });

4. What is an arrow function?

Ans : An arrow function is a shorter way to write functions in JavaScript. It was introduced in ES6.This allows you to write functions in a very short time.Arrow functions make code shorter and easier to read.

for Example -> const add = (x, y) => x + y;


5. What are template literals?

Ans : Template literals are a way to write strings in JavaScript using backticks ( ` ` ) instead of single (' ') or double (" ") quotes.
They make it easy to add variables inside a string. They also allow multi-line strings.

For Example --> const name = "Rahim";
                const age = 20;

                const message = `My name is ${name} and I am ${age} years old.`;
