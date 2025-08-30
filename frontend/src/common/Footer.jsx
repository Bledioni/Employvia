import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <div style={{ textAlign: "center", paddingBottom: "1rem", background: "#ffffffff" , borderTop: '1px solid #ddd'}}>
      <p>© {year} EmployVia. All rights reserved.</p>
    </div>
  );
}

export default Footer;
