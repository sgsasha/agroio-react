import React, {useEffect, useState} from 'react';
import RGL, { WidthProvider } from "react-grid-layout";
import { isArrayEqual } from "../../helpers/utils";
import AgroioWidget from "./AgroioWidget/AgroioWidget";

const ReactGridLayout = WidthProvider(RGL);

const AgroioDashboard = (props) => {
  const defaultConfig  = {
    isDraggable: props.editMode,
    isResizable: props.editMode,
    items: 20,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12
  };

  const [layout, setLayout] = useState([]);

  useEffect(() => {
    transformWidgetsToLayout();
  });

  /**
   * Transforming widgets map to layout array consumed by grid layout.
   */
  function transformWidgetsToLayout () {
    const newLayout = [];
    const widgetKeys = Object.keys(props.widgets);
    // looping in reverse so new widgets will be added to top
    for (let i = widgetKeys.length; i--;) {
      const widgetLayout = {...props.widgets[widgetKeys[i]].layout};
      widgetLayout.i = widgetKeys[i].toString();
      newLayout.push(widgetLayout);
    }
    if (!isArrayEqual(layout, newLayout)) {
      setLayout(newLayout);
    }
  }

  /**
   * Transforming widget layout which emitted from grid layout to widgets map.
   * @param layout
   * @returns {*}
   */
  function getWidgetsFromLayout (layout) {
    return [...layout].reduce((res, curr) => {
      res[curr.i] = {
        layout: {
          "x": curr.x, "y": curr.y, "w": curr.w, "h": curr.h
        },
        config: props.widgets[curr.i].config
      };
      return res;
    }, {});
  }

  /**
   * Handling change of layout and emitting new widgets map on layout change.
   * @param event
   */
  function onLayoutChange (event) {
    props.widgetsChanged(getWidgetsFromLayout(event));
  }

  return (
    <div>
      <ReactGridLayout
        layout={layout}
        {...defaultConfig}
        onLayoutChange={onLayoutChange}
      >
        {layout.map(l => {
          return <div key={l.i} data-grid={l}>
            <AgroioWidget
              config={props.widgets[l.i].config}
              componentsMap={props.componentsMap}
            />
          </div>
        })}

      </ReactGridLayout>
    </div>
  );
};

AgroioDashboard.propTypes = {};

AgroioDashboard.defaultProps = {};

export default AgroioDashboard;
