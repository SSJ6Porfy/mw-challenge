// Meltwater Technical Evaluation
// The purpose of this assignment is to get a feel for you how approach 
// technical and programming problems. 
// There is no ‘right’ or ‘wrong’ answer. 
// Think about the problem and do the best you can, and be prepared to talk
// about the process you followed and any questions or problems you encountered.

// You work for the CIA. You are given a software engineering assignment 
// related to processing classified documents.

// Assignment Part 1

// You are given a task to build a function to process classified 
// documents (text format) and remove censored text.

// Definition:

// The function will remove given keywords and phrases from document text
//  and insert XXXX at the locations where text was removed.

// Input parameters:

// 1. String of keywords and phrases: a string of censored keywords and 
// phrases separated by spaces or commas. 
// Phrases will be enclosed in single or double quotes. Some examples:

//      a. Hello world “Boston Red Sox”

//      b. ‘Pepperoni Pizza’, ‘Cheese Pizza’, beer

// 2. Document text – the original document text that needs the provided
//  keywords and phrases removed (masked out).

// Returns:

// Document text with indicated keywords and phrases removed and replaced
//  with XXXX.

// Please design and build this function in a way it can be demoed, 
// in any language you choose. 

// Be prepared to discuss the design issues and trade-offs you considered.
// In designing the function, consider the efficiency and 
// simplicity of your solution. Think about any options you may want to 
// give the caller of the function, beyond the indicated parameters. 
// Think about any questions you may like to get answered 
// (if this was a real world assignment), 
// that would impact your design and implementation. Think about any 
// unanswered questions or problems in the spec.

// Assignment Part 2

// Upon completing the task, you are asked to add a data store capability that will efficiently 
// index and store the processed documents.  What would you recommend? You do  not  need to build this. 
// However, please be prepared to discuss a recommendation for storing the processed documents and why you selected it.


function encryptKeywords(keywordStr, doc) {
    let keywordArr = str.match(/("[^"]+"|[^"\s]+)/g);

    return true;
}

let str = 'Hello World "Boston Red Sox"';

console.log(encryptKeywords(str, "I love the Boston Red Sox"));