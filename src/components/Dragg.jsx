import { useState } from "react";

const Dragg = () => {
  // State for items in Box 1
  const [box1Items, setBox1Items] = useState([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
    { id: 4, text: "Item 4" },
    { id: 5, text: "Item 5" },
  ]);

  // State for items in Box 2
  const [box2Items, setBox2Items] = useState([]);

  const handleDragStart = (e, item) => {
    // Set the data being dragged as text/plain with the serialized item
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  // Function to handle the drop event
  const handleDrop = (e, targetBox) => {
    e.preventDefault();

    // Parse the dropped item from the dataTransfer
    const droppedItem = JSON.parse(e.dataTransfer.getData("text/plain"));

    // Check the target box and update the state accordingly
    if (targetBox === "box1") {
      // Check if the same item is already present in Box 1
      let isSameItemPresent = box1Items.some(
        (item) => item.id === droppedItem.id && item.text === droppedItem.text
      );

      // Update the state of Box 1
      // and remove the item from Box 2
      setBox1Items((prevItems) =>
        //If the same item is already present in Box 1 then
        //again don't add that item
        // else add the new item in Box 1
        isSameItemPresent ? [...prevItems] : [...prevItems, droppedItem]
      );
      setBox2Items((prevItems) =>
        //Remove the dragged item from Box 2
        prevItems.filter((item) => item.id !== droppedItem.id)
      );
    } else if (targetBox === "box2") {
      // Check if the same item is already present in Box 2
      let isSameItemPresent = box2Items.some(
        (item) => item.id === droppedItem.id && item.text === droppedItem.text
      );

      // Update the state of Box 2 and remove the item from Box 1
      setBox2Items((prevItems) =>
        //If the same item is already
        // present in Box 2 then
        //again don't add that item
        // else add the new item in Box 2
        isSameItemPresent ? [...prevItems] : [...prevItems, droppedItem]
      );
      setBox1Items((prevItems) =>
        //Remove the dragged item from Box 1
        prevItems.filter((item) => item.id !== droppedItem.id)
      );
    }
  };

  return (
    <>
      <h1>Drag and Drop Example</h1>
      <div className="container">
        <div
          className="box"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "box1")}
        >
          <h3>Box 1</h3>
          <ul>
            {box1Items.map((item) => (
              <li
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="box"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, "box2")}
        >
          <h3>Box 2</h3>
          <ul>
            {box2Items.map((item) => (
              <li
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dragg;
