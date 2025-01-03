import { useEffect, useState } from "react";

const items = ["Item 1", "Item 2", "Item 3", "Item 4"];

const SortDrag = () => {
  const [sortedItems, setSortedItems] = useState([...items]);
  const [dragIndex, setDragIndex] = useState(-1);
  const [dropIndex, setDropIndex] = useState(-1);

  useEffect(() => {
    if (dropIndex !== -1) {
      const draggedItem = sortedItems[dragIndex];
      let newSortedItems = [...sortedItems]; // create a copy of the array
      newSortedItems.splice(dragIndex, 1); // remove the dragged item
      newSortedItems.splice(dropIndex, 0, draggedItem); // insert the dragged item at the new index
      setSortedItems(newSortedItems); // update the state with the new sorted array
      setDragIndex(-1);
      setDropIndex(-1);
    }
  }, [dropIndex, dragIndex, sortedItems]);

  const handleDragStart = (e, index) => {
    setDragIndex(index);
    // e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  // Function to handle the drop event
  const handleDrop = (e, index) => {
    e.preventDefault();
    setDropIndex(index);

    // const droppedItem = JSON.parse(e.dataTransfer.getData("text/plain"));
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-green-600 mb-8">
        Sortable Drag and Drop
      </h1>

      <ul>
        {sortedItems.map((item, index) => (
          <li
            key={item}
            draggable
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, index)}
            onDragStart={(e) => handleDragStart(e, index)}
            className="bg-gray-100 p-4 my-2 rounded-md shadow-md cursor-drag "
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SortDrag;
