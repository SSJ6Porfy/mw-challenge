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

// Node Class
function Node(val) {
    this.val = val;
    this.children = {};
    this.completeWord = false;
}


function makeTrie(root, part) {
    if (part === "") {
        root.completeWord = true;
        return root;
    }
    let newNode = new Node(part[0]);
    if (!root.children[part[0]]) {
        root.children[part[0]] = newNode;
    } else {
        newNode = root.children[part[0]];
    }
    makeTrie(newNode, part.slice(1));
    return root;
}

function checkChr(tree, chr) {
    if (!tree) { return false; }
    return tree.children[chr];
}

function encryptedIndexes(root, doc) {
    let coords = {};
    let start = -1;
    let end = 1;
    let i = 0;
    while (i < doc.length) {
        let node = checkChr(root, doc[i]);
        let last = i;
        while (node) {
            i += 1;
            let nextNode = checkChr(node, doc[i]);
            let newLineChr = doc.charCodeAt(i) === 10;
            let punc = doc[i] ? doc[i].match(/[\s\?.,;]/) : false;
            if (node.completeWord && (punc || !doc[i])) {
                if (start === -1 || doc[start] === " ") {
                    coords[start + 1] = end;
                }
            }
            if (!nextNode && !newLineChr) {
                i = last + 1;
                break;
            } 
            if (newLineChr) {
                i += 1;
                end += 1;
                node = checkChr(node, doc[i]);
            } else {
                node = checkChr(node, doc[i]);
            }
            end += 1;
        }
        start = i;
        end = 1;
        i++;    
    }
    return coords;
}

function encryptKeywords(keywordStr, doc) {
    let keywordArr = keywordStr.match(/(\w|\s)*\w((?=')|(?="))|\w+/g);
    let root = new Node(null);

    keywordArr.forEach((keyword) => {
        makeTrie(root, keyword);
    });

    let result = "";
    let hash = encryptedIndexes(root, doc);
    let idx = 0;
    while (idx < doc.length) {
        if (hash[idx]) {
            result += "XXXX";
            idx += hash[idx];
        } else {
            result += doc[idx];
            idx += 1;
        }
    }
    return result;
}

// let str1 = "Hello World Boston 'Boston Red Sox'";
// let doc1 = "blah blah\n Hello Boston Boston\n Red Sox when World travel Boston Red Sox";

// let str2 = "a b 'aba d f'";
// let doc2 = "a b aba.";

// let str3 = "a b c d 'a b c e' 'b c e' 'c d e'";
// let doc3 = "a b c de";

// console.log(encryptKeywords(str1, doc1), "1");
// console.log(encryptKeywords(str2, doc2), "2");
// console.log(encryptKeywords(str3, doc3), "3");
// console.log(encryptKeywords(str4, doc4), doc4.length);

