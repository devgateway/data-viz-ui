import React from "react";
import { Button, Header, Icon, Segment, Image } from "semantic-ui-react";
import { cleanFilter } from "../reducers/data";
import { connect } from "react-redux";

const Messages = (props) => {
  const { data, noDataMsg, app, group, onClean, editing } = props;
  if (data && data.itemsSize && data.itemsSize > 0) {
    return null;
  }

  return (
    <Segment placeholder className="chartNoDataMessage">
      <Header icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="noDataSVG"
          viewBox="0 0 512 512"
        >
          <path
            d="M403.7,96.3c-41-41-95.6-63.6-153.7-63.6c-58,0-112.6,22.6-153.7,63.6c-41,41-63.6,95.6-63.6,153.7
                        c0,58,22.6,112.6,63.6,153.7c41,41,95.6,63.6,153.7,63.6c58,0,112.6-22.6,153.7-63.6c41-41,63.7-95.6,63.7-153.7
                        C467.3,192,444.7,137.4,403.7,96.3z M57.7,250C57.7,144,144,57.7,250,57.7c37.2,0,72,10.6,101.5,29l-63,77.1c-2.8-3.5-6-6.8-9.5-10
                        c-18.2-16.7-39.9-24.5-65.1-23.5c-25.2,1.1-46.2,10.7-62.9,28.9c-16.7,18.2-24.5,39.9-23.5,65.1c1.1,25.2,10.7,46.2,28.9,62.9
                        c6.2,5.7,12.8,10.3,19.8,14l-66,80.8C77.7,347.6,57.7,301.1,57.7,250z M280.2,217.8c0.7,17.3-4.7,32.3-16.3,45
                        c-10.9,11.9-24.3,18.5-40.2,19.9l56.3-68.9C280.1,215.2,280.2,216.5,280.2,217.8z M194.6,278.8c-6.9-2.7-13.3-6.8-19.2-12.2
                        c-12.7-11.6-19.4-26.1-20.1-43.5c-0.7-17.3,4.7-32.4,16.3-45c11.6-12.7,26.1-19.4,43.5-20.1c17.3-0.7,32.3,4.7,45,16.3
                        c4,3.7,7.3,7.6,10.1,11.8L194.6,278.8z M250,442.3c-46,0-88.2-16.2-121.3-43.2l73.1-89.5c6.4,1,13,1.4,19.9,1.1
                        c10.2-0.4,19.7-2.5,28.6-6.1c8.9-3.6,16.7-8.4,23.4-14.2l81,74.4c2.6,2.4,6,3.6,9.3,3.6c3.7,0,7.4-1.5,10.1-4.5
                        c5.1-5.6,4.8-14.3-0.8-19.4l-81-74.4c5.3-7.2,9.3-15.3,12.2-24.5c2.8-9.2,4.1-18.8,3.6-29c-0.5-10.7-2.5-20.6-6-29.8l69.8-85.5
                        c43,35.3,70.5,88.8,70.5,148.7C442.3,356,356,442.3,250,442.3z"
          />
        </svg>

        {editing && (
          <div className="WPnoDataMsg">
            {"Not enough parameters to render the chart"}
          </div>
        )}
        <div className="WPnoDataMsg">{noDataMsg}</div>
      </Header>
      <Button onClick={(e) => onClean({ app, group })}>Clear Filter</Button>
    </Segment>
  );
};

const mapActionCreators = {
  onClean: cleanFilter,
};

export default connect(null, mapActionCreators)(Messages);
