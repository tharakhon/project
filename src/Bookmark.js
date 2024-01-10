import React from "react";
function Bookmark({ bookmarks }) {
    if (!bookmarks) {
        return <p>No bookmarks available</p>;
      }
    
      return (
        <div>
          <h2>Bookmarks</h2>
          <ul>
            {bookmarks.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
          
        </div>
      );
    };
export default Bookmark;