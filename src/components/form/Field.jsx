import React from "react";

export default function Field({ label, children, htmlFor, error }) {
  const id = htmlFor || getChildId(children);
  return (
    <div className="flex flex-col w-full mt-3">
      {label && (
        <label
          className="mb-1 text-gray-800 text-sm sm:text-base font-medium"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="w-full">{children}</div>
      {error && (
        <div className="mt-1 text-red-500 text-xs sm:text-sm">
          {error.message}
        </div>
      )}
    </div>
  );
}

const getChildId = (children) => {
  const child = React.Children.only(children);
  // eslint-disable-next-line no-unsafe-optional-chaining
  if ("id" in child?.props) {
    return child.props.id;
  }
};
