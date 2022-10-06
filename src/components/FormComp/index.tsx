/**
 * TODO: Dynamic content
 * TODO: Make it reusable
 * TODO: save, edit & display.
 * Written By: Shrey Makwana
 */
import React, { useState } from 'react'
import {
  Form,
  Input,
  Select,
  Button
} from 'antd'
import './style.css'

const { Option } = Select

// helper function
function camelCase (str: string): string {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())).replace(/\s+/g, '')
}
interface formCompPropType {
  from?: string
  data: any
  apiFunc: any
  formState: any
}
export default function FormComp ({
  data, apiFunc, formState
}: formCompPropType): JSX.Element {
  const [form, setForm] = useState(formState)

  const handleFormChange = (event: React.FormEvent<any>): void => {
    setForm({
      ...form
    })
  }

  return (

    <Form onFinish={apiFunc} id="ProfileForm">
      {
        data.map((item: any, index: number) => (
          <Form.Item
            key={index}
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
                    item.options.map((i: any, index: number) => <Option key={index} value={i}>{i}</Option>)
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

  )
}
