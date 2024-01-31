import React from "react";

const NoDataComponent = () => {
  return (
    <div style={
      {
        "display": "flex",
        "justifyContent": "center",
        "alignItems": "center",
        "width": "100vw",
        "boxSizing": "border-box",
        "gridArea": "span 2 / span 2",
      }  
    }>
      <h2>No Data Found</h2>
    </div>
  );
};

export default NoDataComponent;