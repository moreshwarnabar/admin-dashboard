import { useState } from 'react';
import { CalendarOutlined } from '@ant-design/icons';
import { Badge, Card, List } from 'antd';
import { useList } from '@refinedev/core';
import dayjs from 'dayjs';

import { Text } from '../text';
import UpcomingEventsSkeleton from '../skeleton/upcoming-events';
import { DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY } from '@/graphql/queries';
import { getDate } from '@/utils/helpers';

const UpcomingEvents = () => {
  const { data, isLoading } = useList({
    resource: 'events',
    pagination: { pageSize: 5 },
    sorters: [{ field: 'startDate', order: 'asc' }],
    filters: [
      {
        field: 'startDate',
        operator: 'gte',
        value: dayjs().format('YYY-MM-DD'),
      },
    ],
    meta: {
      gqlQuery: DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY,
    },
  });

  const styles = {
    header: { padding: '8px 16px' },
    body: { padding: '0 1rem' },
  };

  return (
    <Card
      style={{ height: '100%' }}
      styles={styles}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CalendarOutlined />
          <Text size="sm" style={{ marginLeft: '0.7rem' }}>
            Upcoming Events
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, i) => ({
            id: i,
          }))}
          renderItem={() => <UpcomingEventsSkeleton />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={data?.data || []}
          renderItem={i => {
            const renderDate = getDate(i.startDate, i.endDate);

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Badge color={i.color} />}
                  title={<Text size="xs">{renderDate}</Text>}
                  description={
                    <Text ellipsis={{ tooltip: true }} strong>
                      {i.title}
                    </Text>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}

      {!isLoading && data?.data.length === 0 && (
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '220px',
          }}
        >
          No Upcoming Events
        </span>
      )}
    </Card>
  );
};

export default UpcomingEvents;
