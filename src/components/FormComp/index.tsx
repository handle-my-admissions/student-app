/* eslint-disable react/prop-types */
/**
 * TODO: Dynamic content
 * TODO: Make it reusable
 * TODO: save, edit & display.
 * Written By: Shrey Makwana
 */
import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
} from 'antd';
import './style.css';

const { Option } = Select;

// helper function
function camelCase(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())).replace(/\s+/g, '');
}
type formCompPropType = {
  from?: string,
  data: any,
  apiFunc: any,
  formState: any
}
export default function FormComp({
  data, apiFunc, formState,
}: formCompPropType) {
  const [form, setForm] = useState(formState);

  // eslint-disable-next-line no-unused-vars
  const handleFormChange = (event: React.FormEvent<any>) => {
    setForm({
      ...form,
    });
  };

  return (

    <Form onFinish={apiFunc} id="ProfileForm">
      {
        data.map((item: any) => (
          <Form.Item
            name={item.name}
            label={item.label}
            rules={item.rules}
          >
            {!item.haveOption
              ? (
                <Input.TextArea
                  placeholder={item.label}
                  value={form[camelCase(item.name)]}
                  onChange={handleFormChange}
                  rows={item.isDescriptive ? 4 : 1}
                />
              )
              : (
                <Select placeholder="select your gender" value={form.Gender} onChange={handleFormChange}>
                  {
                    item.options.map((i: any) => <Option value={i}>{i}</Option>)
                  }
                </Select>
              )}

          </Form.Item>
        ))
      }

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>

  );
}
