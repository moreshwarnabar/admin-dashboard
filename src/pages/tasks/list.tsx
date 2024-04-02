import { KanbanAddCardButton } from '@/components/tasks/kanban/add-card-button';
import {
  KanbanBoardContainer,
  KanbanBoard,
} from '@/components/tasks/kanban/board';
import ProjectCard, { ProjectCardMemo } from '@/components/tasks/kanban/card';
import KanbanColumn from '@/components/tasks/kanban/column';
import KanbanItem from '@/components/tasks/kanban/item';
import { TASKS_QUERY, TASK_STAGES_QUERY } from '@/graphql/queries';
import { TaskStage } from '@/graphql/schema.types';
import { TasksQuery } from '@/graphql/types';
import { useList } from '@refinedev/core';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import React from 'react';

export const TaskList = () => {
  const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
    resource: 'taskStages',
    filters: [
      {
        field: 'title',
        operator: 'in',
        value: ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'],
      },
    ],
    sorters: [{ field: 'createdAt', order: 'asc' }],
    meta: {
      gqlQuery: TASK_STAGES_QUERY,
    },
  });
  const { data: tasks, isLoading: isLoadingTasks } = useList<
    GetFieldsFromList<TasksQuery>
  >({
    resource: 'tasks',
    sorters: [{ field: 'dueDate', order: 'asc' }],
    queryOptions: { enabled: !!stages },
    pagination: { mode: 'off' },
    meta: {
      gqlQuery: TASKS_QUERY,
    },
  });

  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return { unassignedStage: [], stages: [] };
    }

    const unassignedStage = tasks.data.filter(t => t.stageId === null);

    const grouped: TaskStage[] = stages.data.map(s => ({
      ...s,
      tasks: tasks.data.filter(t => t.stageId?.toString() === s.id),
    }));

    return { unassignedStage, columns: grouped };
  }, [stages, tasks]);

  const handleAddCard = (args: { stageId: string }) => {};

  return (
    <KanbanBoardContainer>
      <KanbanBoard>
        <KanbanColumn
          id="unassigned"
          title="unassigned"
          count={taskStages.unassignedStage.length || 0}
          onAddClick={() => handleAddCard({ stageId: 'unassigned' })}
        >
          {taskStages.unassignedStage.map(t => (
            <KanbanItem
              key={t.id}
              id={t.id}
              data={{ ...t, stageId: 'unassigned' }}
            >
              <ProjectCardMemo {...t} dueDate={t.dueDate || undefined} />
            </KanbanItem>
          ))}

          {!taskStages.unassignedStage.length && (
            <KanbanAddCardButton
              onClick={() => handleAddCard({ stageId: 'unassigned' })}
            />
          )}
        </KanbanColumn>
      </KanbanBoard>
    </KanbanBoardContainer>
  );
};
