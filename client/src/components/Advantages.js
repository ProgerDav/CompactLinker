
import React from "react";

export const Advantages = () => {
  const data = [
    {
      icon: "link",
      title: "Shorten links",
      body:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id oditaspernatur facere quisquam debitis laborum ad laboriosam a mollitiaducimus repudiandae, nobis explicabo inventore, provident illodoloremque excepturi quos ipsam.",
    },
    {
      icon: "star",
      title: "Manage bookmarks",
      body:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id oditaspernatur facere quisquam debitis laborum ad laboriosam a mollitiaducimus repudiandae, nobis explicabo inventore, provident illodoloremque excepturi quos ipsam.",
    },
    {
      icon: "share",
      title: "Share with anybody",
      body:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id oditaspernatur facere quisquam debitis laborum ad laboriosam a mollitiaducimus repudiandae, nobis explicabo inventore, provident illodoloremque excepturi quos ipsam.",
    },
  ];

  const items = data.map((item, index) => (
    <div key={index} className="col s12 m4 icon-block">
      <h2 className="center blue-text">
        <i className="material-icons">{item.icon}</i>
      </h2>
      <h5 className="center">{item.title}</h5>
      <p className="light flow-text">{item.body}</p>
    </div>
  ));

  return (
    <div className="container">
      <div className="row">{items}</div>
    </div>
  );
};
