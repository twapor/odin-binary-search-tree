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
            } else if (value > currentNode.value) {
                parentNode = currentNode;
                currentNode = currentNode.right;
            } else {
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
                    } else {
                        successorParent.left = successor.right;
                    }
                } else {
                    // Node has one or no children
                    const child = currentNode.left || currentNode.right;
                    if (parentNode === null) {
                        this.root = child; // Deleting root node
                    } else if (parentNode.left === currentNode) {
                        parentNode.left = child;
                    } else {
                        parentNode.right = child;
                    }
                }
                return; // Node deleted
            }
        }
    }
}
export default Tree;