import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Playlist = ({
  videos,
  currentVideoIndex,
  onVideoClick,
  onVideoDragEnd,
}) => {
  return (
    <DragDropContext onDragEnd={onVideoDragEnd}>
      <Droppable droppableId="playlist">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            className="list-none p-4"
            {...provided.droppableProps}
          >
            {videos.map((video, index) => (
              <Draggable
                key={video.title}
                draggableId={video.title}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-2 cursor-pointer ${
                      currentVideoIndex === index ? "bg-gray-200" : ""
                    }`}
                    onClick={() => onVideoClick(index)}
                  >
                    {video.title}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Playlist;
