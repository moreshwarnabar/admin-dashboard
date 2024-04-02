import {
  KanbanBoardContainer,
  KanbanBoard,
} from '@/components/tasks/kanban/board';
import KanbanColumn from '@/components/tasks/kanban/column';
import KanbanItem from '@/components/tasks/kanban/item';

export const TaskList = () => {
  return (
    <KanbanBoardContainer>
      <KanbanBoard>
        <KanbanColumn>
          <KanbanItem></KanbanItem>
        </KanbanColumn>
        <KanbanColumn></KanbanColumn>
      </KanbanBoard>
    </KanbanBoardContainer>
  );
};
