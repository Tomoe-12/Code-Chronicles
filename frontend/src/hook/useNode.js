const useNode = () => {
    const insertNode = function (tree, commentId, item) {
      if (tree.id === commentId) {
        tree.items.push({
          _id: new Date().getTime(),
          name: item,
          items: [],
        });
        return tree;
      }
  
      let latestNode = [];
      latestNode = tree.items.map((ob) => {
        return insertNode(ob, commentId, item);
      });
      return { ...tree, items: latestNode };
    };
  
    const editNode = (tree, commentId, value) => {
      if (tree._id === commentId) {
        tree.name = value;
        return tree;
      }
  
      tree.items.map((ob) => {
        return editNode(ob, commentId, value);
      });
  
      return { ...tree };
    };
  
    const deleteNode = (tree, _id) => {
      for (let i = 0; i < tree.items.length; i++) {
        const currentItem = tree.items[i];
        if (currentItem._id === _id) {
          tree.items.splice(i, 1);
          return tree;
        } else {
          deleteNode(currentItem, _id);
        }
      }
      return tree;
    };
  
    return { insertNode, editNode, deleteNode };
  };
  
  export default useNode;