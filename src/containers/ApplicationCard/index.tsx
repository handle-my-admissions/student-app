import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import {
  SubCard,
  ApplicationDownloadPanel,
  ApplicationSteps,
} from '../../components';
import './style.css';

type applicationCardPropsType = {
  title: string,
  subCardData: {
    title: string,
    subtitle: string,
  }[],
}

export default function ApplicationCard({ title, subCardData }: applicationCardPropsType) {
  return (
    <div className="ApplicationCard">
      <div className="ApplicationCard_inner">
        <div className="ApplicationCard_Title">
          <Link to={`/s/myapplications/${subCardData[0].subtitle}`}>
            <Typography.Title level={4}>{title}</Typography.Title>
          </Link>
        </div>
        <div className="ApplicationCard_Details_SubCards_Container">
          {subCardData.map((data) => (
            <SubCard data={data} />
          ))}
        </div>

        <div className="ApplicationCard_Details_DownloadPanel">
          <ApplicationDownloadPanel />
        </div>

        <div className="ApplicationCard_stepsContainer">
          {/* <hr/> */}
          <ApplicationSteps />
        </div>
      </div>
    </div>
  );
}
