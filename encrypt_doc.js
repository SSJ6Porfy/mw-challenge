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

// I recently integrated Elasticsearch into one of my own projects.  Elasticsearch is a data store
// that enables Full Text Search that delivers superior results to traditional data stores like SQL and NoSQL
// when needing to query a large document. 

// Node Class
function Node(val) {
    this.val = val;
    this.children = {};
    this.completeWord = false;
}

// Using a Prefix Trie
// Using trie will allow for pattern searching
// while iterating thru the document string
function makeTrie(root, part) {
    // If part is empty then set it root to completeWord = true
    if (part === "") {
        root.completeWord = true;
        return root;
    }
    var newNode = new Node(part[0]);
    // If root doesn't have a child "Part[0]" 
    // Then create one
    if (!root.children[part[0]]) {
        root.children[part[0]] = newNode;
    } else {
    // Else retreive the child
        newNode = root.children[part[0]];
    }
    // Make recursive call to continue building trie
    makeTrie(newNode, part.slice(1));
    return root;
}

// Check for child in root
function checkChr(tree, chr) {
    if (!tree) { return false; }
    return tree.children[chr];
}

// Build hash of indexes
function encryptedIndexes(root, doc) {
    var indexes = {};
    // Start/end --- Index pointers
    var start = -1;
    var end = 1;
    var idx = 0;
    while (idx < doc.length) {
        var node = checkChr(root, doc[idx]);
        var last = idx;
        
        // If doc at current idx has a child, enter loop
        while (node) {
            idx += 1;
            // Check if follow idx is also a node
            var nextNode = checkChr(node, doc[idx]);
            // Handle puncuation for completed words 
            var punc = doc[idx] ? doc[idx].match(/[\s\?.,;]/) : false;
    
            if (node.completeWord && (punc || !doc[idx])) {
                // if true then set the starting index of the word in the
                // hash along with the length of the current word
                if (start === -1 || doc[start] === " ") {
                    indexes[start + 1] = end;
                }
            }
            // Check for new line characters
            var newLineChr = doc.charCodeAt(idx) === 10;
            // If next idx is not a node break
            if (!nextNode && !newLineChr) {
                idx = last + 1;
                break;
            }
            // Increment Index by one if new line chr.  Handles
            // phrases that may wrap around to new line. 
            if (newLineChr) {
                idx += 1;
                end += 1;
                node = checkChr(node, doc[idx]);
            } else {
                node = checkChr(node, doc[idx]);
            }
            end += 1;
        }
        start = idx;
        end = 1;
        idx++;    
    }
    return indexes;
}

function encryptKeywords(keywordStr, doc) {
    // Regex handles spaces, commas and allow for inverted 
    // parentheses
    var keywordArr = keywordStr.match(/(\w|\s)*\w((?=')|(?="))|\w+/g);
    var root = new Node(null);

    // Create prefix tree based on dictionary
    for (var i = 0; i < keywordArr.length; i++) {
        makeTrie(root, keywordArr[i]);
    }
 
    // Creating new result string
    var result = "";
    var hash = encryptedIndexes(root, doc);
    var idx = 0;
    // Iterating thru original document.
    // Idx is found... Insert 4 Xs and increment by the length of the
    // original word.
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

// Sample Tests

// var str1 = "Hello World Boston 'Boston Red Sox'";
// var doc1 = "blah blah\n Hello Boston Boston\n Red Sox when World travel Boston Red Sox";

// var str2 = "a b 'aba d f'";
// var doc2 = "a b aba.";

// var str3 = "Bos, Boston, 'Bos Be' 'Boston Red Sox'";
// var doc3 = "Boston Boston Bos Red Sox Boston Boston Red Sox";

// console.log(encryptKeywords(str1, doc1), "1");
// console.log(encryptKeywords(str2, doc2), "2");
// console.log(encryptKeywords(str3, doc3), doc3.length,"3");
