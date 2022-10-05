const data = [
  {
    name: 'subject',
    label: 'Subject',
    rules: [
      {
        required: true,
        message: 'Please input the Subject !',
      },
    ],
    haveOption: false,

  },
  {
    name: 'description',
    label: 'Description',
    rules: [
      {
        required: true,
        message: 'Please input the Description !',
      },
    ],
    haveOption: false,
    isDescriptive: true,

  },
];

export default data;
