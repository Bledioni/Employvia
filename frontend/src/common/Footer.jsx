/**
 * Footer Component
 * 
 * This React functional component renders a simple footer section
 * for a website or application. It dynamically displays the current
 * year and includes a copyright notice.
 * 
 * Features:
 * - Dynamically fetches and displays the current year using JavaScript's
 *   Date object.
 * - Center-aligned text with padding and a top border for separation.
 * - Inline styles applied for quick styling; can be moved to a CSS file
 *   for better maintainability.
 * 
 * Usage:
 * <Footer />
 * 
 * Notes:
 * - Purely presentational component.
 * - Can be customized to include links or additional information if needed.
 */

import React from "react";

function Footer() {
  const year = new Date().getFullYear(); // Gets the current year

  return (
    <div 
      style={{ 
        textAlign: "center", 
        paddingBottom: "1rem", 
        background: "#ffffffff", 
        borderTop: '1px solid #ddd' 
      }}
    >
      <p>© {year} EmployVia. All rights reserved.</p>
    </div>
  );
}

export default Footer;
