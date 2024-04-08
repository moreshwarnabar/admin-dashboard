import { KanbanColumnSkeleton, ProjectCardSkeleton } from '@/components';
import { KanbanAddCardButton } from '@/components/tasks/kanban/add-card-button';
import {
  KanbanBoardContainer,
  KanbanBoard,
} from '@/components/tasks/kanban/board';
import ProjectCard, { ProjectCardMemo } from '@/components/tasks/kanban/card';
import KanbanColumn from '@/components/tasks/kanban/column';
import KanbanItem from '@/components/tasks/kanban/item';
import { UPDATE_TASK_STAGE_MUTATION } from '@/graphql/mutations';
import { TASKS_QUERY, TASK_STAGES_QUERY } from '@/graphql/queries';
import { TaskStagesQuery, TasksQuery } from '@/graphql/types';
import { DragEndEvent } from '@dnd-kit/core';
import { useList, useNavigation, useUpdate } from '@refinedev/core';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import React from 'react';

type Task = GetFieldsFromList<TasksQuery>;
type TaskStage = GetFieldsFromList<TaskStagesQuery> & { tasks: Task[] };

export const TaskList = ({ children }: React.PropsWithChildren) => {
  const { replace } = useNavigation();
  const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
    resource: 'taskStages',
    filters: [
      {
        field: 'title',
        operator: 'in',
        value: ['TODO', 'IN PROGRESS', 'IN REVIEW', 'DONE'],
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
  const { mutate: updateTask } = useUpdate();

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

  const handleAddCard = (args: { stageId: string }) => {
    const path =
      args.stageId === 'unassigned'
        ? '/tasks/new'
        : `/tasks/new?stageId=${args.stageId}`;

    replace(path);
  };

  const handleOnDragEnd = (event: DragEndEvent) => {
    let stageId = event.over?.id as undefined | string | null;
    const taskId = event.active.id as string;
    const taskStageId = event.active.data.current?.stageId;

    if (taskStageId === stageId) return;

    if (stageId === 'unassigned') stageId = null;

    updateTask({
      resource: 'tasks',
      id: taskId,
      values: {
        stageId,
      },
      successNotification: false,
      mutationMode: 'optimistic',
      meta: {
        gqlMutation: UPDATE_TASK_STAGE_MUTATION,
      },
    });
  };

  const isLoading = isLoadingStages || isLoadingTasks;

  if (isLoading) return <PageSkeleton />;

  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
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

          {taskStages.columns?.map(col => (
            <KanbanColumn
              key={col.id}
              id={col.id}
              title={col.title}
              count={col.tasks.length}
              onAddClick={() => handleAddCard({ stageId: col.id })}
            >
              {!isLoading &&
                col.tasks.map(t => (
                  <KanbanItem key={t.id} id={t.id} data={t}>
                    <ProjectCardMemo {...t} dueDate={t.dueDate || undefined} />
                  </KanbanItem>
                ))}
              {!col.tasks.length && (
                <KanbanAddCardButton
                  onClick={() => handleAddCard({ stageId: col.id })}
                />
              )}
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  );
};

const PageSkeleton = () => {
  const colCount = 6;
  const itemCount = 4;

  return (
    <KanbanBoardContainer>
      {Array.from({ length: colCount }).map((_, i) => (
        <KanbanColumnSkeleton key={i}>
          {Array.from({ length: itemCount }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </KanbanColumnSkeleton>
      ))}
    </KanbanBoardContainer>
  );
};
