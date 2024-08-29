import React from 'react';

// LayoutSelector component
// Props:
//   - currentLayout: the currently selected layout
//   - onLayoutChange: function to call when a new layout is selected
function LayoutSelector({ currentLayout, onLayoutChange }) {
  // Array of available layout options
  const layoutOptions = [
    { id: 'middle', label: 'Cover in Middle' },
    { id: 'bottom', label: 'Cover at Bottom' },
    // Add more layout options here as needed
  ];

  return (
    <div className="layout-selector">
      <h3>Choose Layout</h3>
      {/* Map through layout options to create radio buttons */}
      {layoutOptions.map((option) => (
        <label key={option.id}>
          <input
            type="radio"
            value={option.id}
            checked={currentLayout === option.id}
            onChange={() => onLayoutChange(option.id)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

export default LayoutSelector;