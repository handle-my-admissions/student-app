/**
 * -Utilises the Claendar of ant-d
 *
 * - Returns the data bind with the date [Similar to do]
 *   this will be dynamically allocated from the DB or server.
 *   for now its static
 *
 * Written by: Tejas ladhani
 */

 import type { BadgeProps } from 'antd';
 import { Badge, Calendar } from 'antd';
 import type { Moment } from 'moment';
 import React from 'react';
 
 const getListData = (value: Moment) => {
   let listData;
   switch (value.date()) {
     case 8:
       listData = [
         { type: 'warning', content: 'This is warning event.' },
         { type: 'success', content: 'This is usual event.' },
       ];
       break;
     case 10:
       listData = [
         { type: 'warning', content: 'This is warning event.' },
         { type: 'success', content: 'This is usual event.' },
         { type: 'error', content: 'This is error event.' },
       ];
       break;
     case 15:
       listData = [
         { type: 'warning', content: 'This is warning event' },
         { type: 'success', content: 'This is very long usual event。。....' },
         { type: 'error', content: 'This is error event 1.' },
         { type: 'error', content: 'This is error event 2.' },
         { type: 'error', content: 'This is error event 3.' },
         { type: 'error', content: 'This is error event 4.' },
       ];
       break;
     default:
   }
   return listData || [];
 };
 
 const getMonthData = (value: Moment) => {
   if (value.month() === 8) {
     return 1394;
   }
 };
 
 const App: React.FC = () => {
   const monthCellRender = (value: Moment) => {
     const num = getMonthData(value);
     return num ? (
       <div className="notes-month">
         <section>{num}</section>
         <span>Backlog number</span>
       </div>
     ) : null;
   };
 
   const dateCellRender = (value: Moment) => {
     const listData = getListData(value);
     return (
       <ul className="events">
         {listData.map(item => (
           <li key={item.content}>
             <Badge status={item.type as BadgeProps['status']} text={item.content} />
           </li>
         ))}
       </ul>
     );
   };
 
   return <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />;
 };
 
 export default App;

// here dateCellRender and MonthCelRender is built in in the calendar module of ant-d.
// we need to define its behavior only.
// date and its value will be passed by the Calendar component only
//  (which it will get from the UI button present on the right-top)
