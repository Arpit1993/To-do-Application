export const optionsList = [
  {
    content: function () {
      return (
        <div className={'options-content-wrapper'}>
          <div className={'pending'}></div>
          <p>Pending</p>
        </div>
      );
    },
    value: 'pending',
  },
  {
    content: function () {
      return (
        <div className={'options-content-wrapper'}>
          <div className={'in-progress'}></div>
          <p>In Progress</p>
        </div>
      );
    },
    value: 'in_progress',
  },
  {
    content: function () {
      return (
        <div className={'options-content-wrapper'}>
          <div className={'completed'}></div>
          <p>Completed</p>
        </div>
      );
    },
    value: 'completed',
  },
];
