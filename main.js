import Tree from './tree.js';
import prettyPrint from './prettyPrint.js';
import generateRandomArray from './randonArrayGenerator.js';



let testArray = generateRandomArray(50,1,100);
let tree = new Tree();
tree.root = tree.buildBalancedTree(testArray);

console.log(`The tree is balanced:` + tree.isBalanced());

console.log("=========== Level Order Traversal ===========");
tree.levelOrderForEach(node => {
  console.log(node.value);
});

console.log("=========== Pre Order Traversal ===========");
tree.preOrderForEach(node => {  
  console.log(node.value);
});

console.log("=========== Post Order Traversal ===========");
tree.postOrderForEach(node => {
  console.log(node.value);
});

console.log("=========== In Order Traversal ===========");

tree.inOrderForEach(node => {
  console.log(node.value);
});

tree.insert(23);
tree.insert(55);
tree.insert(45);
tree.insert(12);
tree.insert(99);
tree.insert(324);
tree.insert(1);
tree.insert(100);
tree.insert(78);
tree.insert(67);
tree.insert(89);

prettyPrint(tree.root);

console.log(`The tree is balanced:` + tree.isBalanced());

tree.reBalance();
console.log(`The tree is balanced after rebalancing:` + tree.isBalanced());

console.log("=========== Level Order Traversal ===========");
tree.levelOrderForEach(node => {
  console.log(node.value);
});

console.log("=========== Pre Order Traversal ===========");
tree.preOrderForEach(node => {  
  console.log(node.value);
});

console.log("=========== Post Order Traversal ===========");
tree.postOrderForEach(node => {
  console.log(node.value);
});

console.log("=========== In Order Traversal ===========");

tree.inOrderForEach(node => {
  console.log(node.value);
});


console.log("=========== Height of the Node with value 324  ===========");
console.log(tree.height(324));
prettyPrint(tree.root);

console.log("=========== Depth of the node with value 23 ===========");
console.log(tree.depth(23));
prettyPrint(tree.root);

console.log(tree.isBalanced());
tree.reBalance();
prettyPrint(tree.root);


