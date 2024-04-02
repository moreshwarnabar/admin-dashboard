import { Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { Edit, useForm, useSelect } from '@refinedev/antd';
import { UPDATE_COMPANY_MUTATION } from '@/graphql/mutations';
import CustomAvatar from '@/components/custom-avatar';
import { getNameInitials } from '@/utils';
import SelectOptionWithAvatar from '@/components/select-option-with-avatar';
import { USERS_SELECT_QUERY } from '@/graphql/queries';
import { UsersSelectQuery } from '@/graphql/types';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import {
  businessTypeOptions,
  companySizeOptions,
  industryOptions,
} from '@/constants';

export const EditPage = () => {
  const {
    saveButtonProps,
    formProps,
    formLoading,
    queryResult: formQueryResult,
  } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  const { avatarUrl, name } = formQueryResult?.data?.data || {};

  const { selectProps, queryResult } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: 'users',
    optionLabel: 'name',
    pagination: {
      mode: 'off',
    },
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
          >
            <Form {...formProps}>
              <CustomAvatar
                shape="square"
                src={avatarUrl}
                name={getNameInitials(name || '')}
                style={{ width: 96, height: 96, marginBottom: '24px' }}
              />
              <Form.Item
                label="Sales Owner"
                name="salesOwnerId"
                initialValue={formProps.initialValues?.salesOwnerId}
              >
                <Select
                  placeholder="Please select a sales owner"
                  {...selectProps}
                  options={
                    queryResult?.data?.data.map(u => ({
                      value: u.id,
                      label: (
                        <SelectOptionWithAvatar
                          name={u.name}
                          url={u.avatarUrl ?? undefined}
                          shape="circle"
                        />
                      ),
                    })) ?? []
                  }
                />
              </Form.Item>
              <Form.Item label="Company Size">
                <Select options={companySizeOptions} />
              </Form.Item>
              <Form.Item label="Total Revenue">
                <InputNumber
                  autoFocus
                  addonBefore="$"
                  min={0}
                  placeholder="0,00"
                />
              </Form.Item>
              <Form.Item label="Industry">
                <Select options={industryOptions} />
              </Form.Item>
              <Form.Item label="Business Type">
                <Select options={businessTypeOptions} />
              </Form.Item>
              <Form.Item label="Country" name="country">
                <Input placeholder="Country" />
              </Form.Item>
              <Form.Item label="Website" name="website">
                <Input placeholder="Website" />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};
