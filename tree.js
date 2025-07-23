import Node from './node.js';

class Tree {
  constructor() {
    this.root = null;
  }

  buildBalancedTree(array) {
    let sortedArray = array.toSorted((a, b) => a - b);
    let uniqueArray = sortedArray.filter((value, index, self) => self.indexOf(value) === index);
    if (uniqueArray.length === 0) return null;

    const mid = Math.floor(uniqueArray.length / 2);
    const root = new Node(uniqueArray[mid]);

    root.left = this.buildBalancedTree(uniqueArray.slice(0, mid));
    root.right = this.buildBalancedTree(uniqueArray.slice(mid + 1));

    return root;
  }

  insert(value) {
    
    // If the tree is empty, create a new node as the root
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    // Otherwise, insert the new node in the correct position
    let currentNode = this.root;
    while(currentNode) {
      if (value === currentNode.value) {
        return; // Avoid duplicates
      }
      //If the value is less than the current node's value, go left
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } 
      // If the value is greater than the current node's value, go right
      else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
}

  delete(value) {
    let currentNode = this.root;
    let parentNode = null;
    while (currentNode) {
      if (value < currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } 
      
      else if (value > currentNode.value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } 
      
      else {
        // Node to delete found
        if (currentNode.left && currentNode.right) {
        // Node has two children
          let successor = currentNode.right;
          let successorParent = currentNode;
          while (successor.left) {
            successorParent = successor;
            successor = successor.left;
            }
            currentNode.value = successor.value;
            if (successorParent === currentNode) {
              successorParent.right = successor.right;
            }
            else {
              successorParent.left = successor.right;
            }
          
        } 
        
        else {
          // Node has one or no children
          const child = currentNode.left || currentNode.right;
          if (parentNode === null) {
            this.root = child; // Deleting root node
          }
          
          else if (parentNode.left === currentNode) {
            parentNode.left = child;
          }
          
          else {
            parentNode.right = child;
          }
        }
        
        return; // Node deleted
        
      }
      
    }
    
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      }
      else if (value > currentNode.value) {
        currentNode = currentNode.right;
      }
      else {
        return currentNode; // Node found
      }
      
    }
    
  }
  
  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    if (this.root === null) return;

    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current); // Pass the whole node

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      callback(node);
      traverse(node.right);
    };

    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    const traverse = (node) => {
      if (node === null) return;
      callback(node);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('A callback function is required');
    }

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node);
    };

    traverse(this.root);
  }

height(value) {
  const node = this.find(value);
  if (!node) return null;

  const getHeight = (n) => {
    if (n === null) return -1; // base case: empty = -1
    return 1 + Math.max(getHeight(n.left), getHeight(n.right));
  };

  return getHeight(node);
}

depth(value) {
  const node = this.find(value);
  let currentNode = this.root;
  let depth = 0;
  if (!node) return null; // If the node is not found, return null
  if (!currentNode) return -1;  // If the tree is empty, return -1
  while (currentNode) {
    if (value < currentNode.value) {
      currentNode = currentNode.left;
    } else if (value > currentNode.value) {
      currentNode = currentNode.right;
    } else {
      return depth; // Node found, return the depth
    }
    depth++;
  }

}
isBalanced() {
  const checkBalanced = (node) => {
    if (node === null) return 0; // height of empty tree is 0

    const leftHeight = checkBalanced(node.left);
    if (leftHeight === -1) return -1; // left not balanced

    const rightHeight = checkBalanced(node.right);
    if (rightHeight === -1) return -1; // right not balanced

    if (Math.abs(leftHeight - rightHeight) > 1) return -1; // current node not balanced

    return 1 + Math.max(leftHeight, rightHeight); // return height if balanced
  };

  return checkBalanced(this.root) !== -1;
}

reBalance() {
  let reBalancedArray = [];
  this.inOrderForEach(node => {
    reBalancedArray.push(node.value);
  });
  this.root = this.buildBalancedTree(reBalancedArray);
}
  
}
export default Tree;