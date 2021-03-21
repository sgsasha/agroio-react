import { DONUT_CHART_WIDGET, LINE_CHART_WIDGET } from "../../constants/widgets";
import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';
import AgroioDashboard from "../../components/AgroioDashboard/AgroioDashboard";
import LineChartWidget from "../../components/LineChartWidget/LineChartWidget";
import DonutChartWidget from "../../components/DonutChartWidget/DonutChartWidget";
import Button from "react-bootstrap/Button";

const defaultWidgetsConfig = {
  1: {
    layout: {
      "x": 0,
      "y": 0,
      "w": 12,
      "h": 9,
      minH: 4
    },
    config: {
      component: LINE_CHART_WIDGET,
      widgetTitle: "Average water level"
    }
  },
  2: {
    layout: {
      "x":0,
      "y":9,
      "w":8,
      "h":9,
      minH: 4
    },
    config: {
      component: LINE_CHART_WIDGET,
      widgetTitle: "Average moisture level"
    }
  },
  3: {
    layout: {
      "x":9,
      "y":8,
      "w":4,
      "h":9,
      minH: 4
    },
    config: {
      component: DONUT_CHART_WIDGET,
      widgetTitle: "Online/Offline devices"
    }
  },
};


const DashboardPage = () => {
  const savedWidgets = localStorage.getItem("agroioWidgets");
  const componentsMap = {
    [LINE_CHART_WIDGET]: LineChartWidget,
    [DONUT_CHART_WIDGET]: DonutChartWidget
  };
  const [editMode, setEditMode] = useState(false);
  const [config, setConfig] = useState(savedWidgets ? JSON.parse(savedWidgets): defaultWidgetsConfig);

  function handleOnChange(val) {
    setEditMode(!editMode);
  }

  function layoutChanged (newWidgets) {
    localStorage.setItem("agroioWidgets", JSON.stringify(newWidgets));
    setConfig(newWidgets);
  }

  function resetWidgetsToDefault () {
    layoutChanged(defaultWidgetsConfig);
  }

  return (
    <div className="p-5">
      <Form className="ml-2 d-inline-flex align-items-center justify-content-between w-100">
        <Form.Check
          type="switch"
          id="custom-switch"
          checked={editMode}
          onChange={handleOnChange}
          label="Edit Dashboard"
        />
        {editMode ? <span>
          <Button className="ml-3" onClick={resetWidgetsToDefault}>Reset to default</Button>
          {/*<Button className="ml-3" onClick={resetWidgetsToDefault}>Add widget</Button>*/}
        </span> : null}
      </Form>
      <AgroioDashboard
        widgets={config}
        editMode={editMode}
        componentsMap={componentsMap}
        widgetsChanged={layoutChanged}
      />
    </div>
  );
};

DashboardPage.propTypes = {};

DashboardPage.defaultProps = {};

export default DashboardPage;
