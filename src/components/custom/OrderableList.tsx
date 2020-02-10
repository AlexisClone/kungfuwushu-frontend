import React, { FC } from 'react';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const OrderableList: FC<{
    items: any[];
    renderItem: (item: any, index: number) => {};
    onReorder: (items: any[], startIndex: number, endIndex: number) => void;
    className?: string;
}> = ({ items, renderItem, onReorder, className }) => {
    const handleSortEnd = ({ source, destination }: any) => {
        if (!destination) {
            return;
        }

        const reordered = Array.from(items);
        const [removed] = reordered.splice(source.index, 1);
        reordered.splice(destination.index, 0, removed);

        onReorder(
            reordered,
            source.index,
            destination.index
        );
    }
    const draggableItems = items.map((item, index) => ({
        ...item,
        draggableId: index+1
    }));

    return (
        <DragDropContext onDragEnd={handleSortEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={className}
                    >
                        {draggableItems.map((item, index) => (
                            <Draggable key={index} draggableId={item.draggableId} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`${snapshot.isDragging ? "dragged" : "draggable"}`}
                                    >
                                        {renderItem(item, index)}
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default OrderableList;