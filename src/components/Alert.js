import React from "react";

export default function Alert({ alert, showAlert, list }) {
  const { type, msg } = alert;
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 2500);
    return () => {
      clearTimeout(timeout);
    };
  });
  return (
    <div>
      <h1
        className={`bg-${type}-500 text-${type}-200 rounded px-3 inline-block mt-2 text-xl uppercase`}
      >
        {msg}
      </h1>
    </div>
  );
}
