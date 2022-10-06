import React, { useState } from 'react'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import './style.css'

export default function Documents (): JSX.Element {
  const { Dragger } = Upload
  const [, setselectedFile] = useState()

  const handleChange = (e: any): void => {
    if (typeof (e) === 'object' && e.target.files !== undefined && e.target.files[0] !== undefined) {
      // if user has selected multiple files, we want 1st one only.
      setselectedFile(e.target.files[0])
    }
  }

  const props = {
    name: 'file',
    accept: '.pdf',
    headers: {
      'content-type': 'application/pdf'
    },
    multiple: false,
    action:
      `${process.env.REACT_APP_API_BASE_URL}/studentupload`,

    onChange (info: any) {
      console.log(info)
    },
    onDrop (e: any) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }

  return (
    <div className="Documents" style={{ marginTop: '1.5em' }}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <input
        id="fileinput"
        type="file"
        accept=".gif,.jpg,.jpeg,.png"
        onChange={handleChange}
      />
    </div>
  )
}
