import React from 'react';
import PropTypes from 'prop-types';
import Card from "react-bootstrap/Card";
import "./AgroioWidget.css";

const AgroioWidget = (props) => {
  const DynamicComponent = props.componentsMap[props.config.component];
  return (
    <Card>
      <Card.Title>
        <div className="m-3">
          {props.config.widgetTitle}
        </div>
      </Card.Title>
      <Card.Body>
        <DynamicComponent config={props.config}/>
      </Card.Body>
    </Card>
  );
};

AgroioWidget.propTypes = {};

AgroioWidget.defaultProps = {};

export default AgroioWidget;
