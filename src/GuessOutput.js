console.log("string" === new String("string")); // false
console.log("string" == new String("string")); // true

// Event Loop Question ///////////////////////
/////////////////////////////////////////////

console.log('Start');  

setTimeout(() => {
    console.log('Timeout 1');  
}, 0); 

new Promise((resolve) => {
    console.log('Promise 1');  
    resolve('Promise 1 Resolved');
}).then(res => console.log(res)); 

setTimeout(() => {
    console.log('Timeout 2');  
}, 0); 

new Promise((resolve) => {
    console.log('Promise 2');  
    resolve('Promise 2 Resolved');
}).then(res => console.log(res));



////////////////////////

// type of new String("string") is object

function test() {
  console.log(arguments); // { '0': 1, '1': 2, '2': 3, '3': 4 }
}

test(1, 2, 3, 4);

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

let i =0;

for(i=0;i<6;i++){
  console.log('A')
  setTimeout(()=>console.log(i),0)
  console.log('Z')
}

// OutPut ---->> AZ,AZ,AZ,AZ,AZ,AZ,6,6,6,6,6,6

////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

// function creates a new copy of passed variable
var x = 3;

function test2(x) {
  x = 5;
  console.log(x, "inner"); // 5
}
test2(x);
console.log(x, "outer"); // 3

// Array is a mutable object
const arr = [1, 2, 3, 4, 5];
arr.length = 2;
console.log(arr); // [ 1, 2 ]
console.log(arr.length); // 2

// string is immutable
const string = "hello";
string[2] = "j";
console.log(string); // hello

// if you add number as key in object, object eventually will make it a string
const obj = { 1: "one", 2: "two" };
console.log(obj); // { '1': 'one', '2': 'two' }

// we can redclare the var variable in same scope in case of let and var it will throw an error
var number = 10;
var number = 20;

console.log(number); // 20

// freeze make object immutable but in this case shape object refers to the same memory location as box object
const box = { x: 10 };
Object.freeze(box);
const shape = box;
shape.x = 20;
shape.y = 30;
console.log(shape); // { x: 10 }

// age is attached to global object that's why it got deleted and name is not attached to global object. if we decare by using var let it will still not get deleted
const name = "ankit";
age = 26;
console.log(delete namee); // false
console.log(delete age); // true

// Because greetFunc didn't get called in context of person
var person = {
  name: "John",
  greet: function () {
    console.log("Hello, " + this.name);
  },
};

var greetFunc = person.greet;
greetFunc(); // Hello, undefined

let a = {};
let b = { key: "b" };
let c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a);
console.log(a[b]);

// when compaaring two objects it will compare their references
let p = [1, 2, 3];
let y = [1, 2, 3];
let z = y;

console.log(p == y); // false
console.log(p === y); // false
console.log(z == y); // true
console.log(z == p); // false

//  for each updates original object
let f = { x: 1 };
let l = { x: 2 };
let m = { x: 3 };
let d = { x: 4 };
let e = { x: 5 };
let arr2 = [f, b, c, d, e];

arr2.forEach((obj) => (obj.x = obj.x * 2));

console.log(f.x, l.x, m.x, d.x, e.x); // 2,4,6,8,10

// how to sort an object
const sampleObject = {
  a: 3,
  b: 2,
  c: 1,
};
console.log(
  Object.keys(sampleObject).sort(
    (first, second) => sampleObject[first] - sampleObject[second]
  )
);

// convert string to array

console.log("ankit".split(""));

// convert array to string

console.log(["a", "b", "c", 1].join(""));

// i can sort the string with length of string and sort function

console.log(["ankit", "air", "ankit puri"].sort((a, b) => b.length - a.length));
function hello() {
  console.log("outer function");
}

const sampleObj = {
  Name: "raja",
  age: 20,
  hello: function () {
    console.log("hi name");
    // return 4;
  },
  hey: () => {
    this.hello();
    console.log("againFunction");
  },
};

sampleObj.hey();

for (let i = 0; i < 100000000000; i++) {
  console.log("loading" + i);
}
function createIncrementer() {
  let count = 0;
  return () => {
    count += 1;
    return count;
  };
}

const increment = createIncrementer();

function hey(n) {
  return setTimeout(() => {
    return n * n;
  }, 1000);
}

const res = hey(4);
console.log(res);

console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3

////////////////////////////////////// 
//////////////////////////////////////////////
////////////////////////////////////////////////
// Promise.All polyfill

function myPromiseAll(promises) {
  let result = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then((value) => {

        result.push(value)
        console.log(result, value)
        if (result.length === promises.length) {
          resolve(result)
        }
      }).catch((error) => {
        reject(error)
      })
    })
  })

}


const promise1 = Promise.resolve(1);
const promise2 = new Promise((resolve) => setTimeout(() => resolve(2), 1000));
const promise3 = new Promise((resolve, reject) => setTimeout(() => reject('Error'), 500));

myPromiseAll([promise1, promise2, promise3])
  .then((values) => console.log('Fulfilled:', values))
  .catch((reason) => console.error('Rejected:', reason));

//////////////////////////////////////////////
////////////////////////////////////////////////
//////////////////////////////////////////////
////////////////////////////////////////////////
// Deep copy 

function makeDeepCopy(obj) {

  if (typeof obj !== 'object' || typeof obj === null) {
    return obj
  }

  var copiedValue = Array.isArray ? [] : {}

  var keys = Object.keys(obj)

  for (let i = 0; i < keys.length; i++) {
    copiedValue[keys[i]] = makeDeepCopy(obj(keys[i]))
  }

  return copiedValue
}


//////////////////////////////////////////////
// debounce 

const debounce = (fn, timer) => {
  let timer;
  return (...args) => {

    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, timer)
  }


}

////////////////////////////////////// 
//////////////////////////////////////////////
////////////////////////////////////////////////
// Flatten an array

const arr = [1, 2, [3, [4], [5, 6]]];

function flattenArray(arr) {
    // Start with an empty array
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            // Recursively flatten the nested array and concatenate it
            result = result.concat(flattenArray(arr[i]));
        } else {
            // Push the non-array element to the result
            result.push(arr[i]);
        }
    }
    return result;
}

console.log(flattenArray(arr)); // Output: [1, 2, 3, 4, 5, 6]

////////////////////////////////////// 
//////////////////////////////////////////////
////////////////////////////////////////////////

function memoize(fn) {
  const cache = {};
  return function (...args) {
      const key = JSON.stringify(args);
      if (cache[key]) {
          console.log("Fetching from cache:", key);
          return cache[key];
      }
      console.log("Calculating result:", key);
      const result = fn(...args);
      cache[key] = result;
      return result;
  };
}


////////////////////////////////////// 
//////////////////////////////////////////////
////////////////////////////////////////////////

function createLRUCache(capacity) {
  const cache = new Map();

  function get(key) {
    if (!cache.has(key)) {
      return -1; // Key not found
    }
    const value = cache.get(key); // Get the value
    cache.delete(key); // Remove the key to update its order
    cache.set(key, value); // Re-insert it to mark it as recently used
    return value;
  }

  function put(key, value) {
    if (cache.has(key)) {
      cache.delete(key); // Remove the existing key to update its order
    }
    cache.set(key, value); // Add the new key-value pair
    if (cache.size > capacity) {
      const oldestKey = cache.keys().next().value; // Get the oldest key
      cache.delete(oldestKey); // Remove the oldest key-value pair
    }
  }

  return { get, put };
}


const lru = createLRUCache(3);

lru.put(1, 10); // Cache: {1: 10}
lru.put(2, 20); // Cache: {1: 10, 2: 20}
lru.put(3, 30); // Cache: {1: 10, 2: 20, 3: 30}

console.log(lru.get(1)); // Output: 10 (Cache order: {2: 20, 3: 30, 1: 10})
lru.put(4, 40); // Cache: {3: 30, 1: 10, 4: 40}, 2 is evicted
console.log(lru.get(2)); // Output: -1 (2 has been evicted)
console.log(lru.get(3)); // Output: 30

////////////////////////////////////// 
//////////////////////////////////////////////
////////////////////////////////////////////////
