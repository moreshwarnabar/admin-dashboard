import {
  KanbanBoardContainer,
  KanbanBoard,
} from '@/components/tasks/kanban/board';
import KanbanColumn from '@/components/tasks/kanban/column';

export const TaskList = () => {
  return (
    <KanbanBoardContainer>
      <KanbanBoard>
        <KanbanColumn></KanbanColumn>
        <KanbanColumn></KanbanColumn>
      </KanbanBoard>
    </KanbanBoardContainer>
  );
};
