import Tree from './tree.js';
import prettyPrint from './prettyPrint.js';

let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree();
tree.root = tree.buildBalancedTree(testArray);


tree.insert(10);
prettyPrint(tree.root);
tree.insert(5);
prettyPrint(tree.root);
tree.insert(2);
tree.delete(67);
prettyPrint(tree.root);



