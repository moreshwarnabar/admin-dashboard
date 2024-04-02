import { CalendarOutlined } from '@ant-design/icons';
import { Badge, Card, List } from 'antd';
import React, { useState } from 'react';
import { Text } from '../text';
import UpcomingEventsSkeleton from '../skeleton/upcoming-events';

const UpcomingEvents = () => {
  const [isLoading, setIsLoading] = useState(false);

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
        ></List>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={[]}
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
        ></List>
      )}
    </Card>
  );
};

export default UpcomingEvents;
