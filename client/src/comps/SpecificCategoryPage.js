import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SpecificCategoryPage() {
  const { label } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data based on the label
    const fetchData = async () => {
      try {
        const response = await fetch(`your-api-url/cates/${label}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [label]);

  return (
    <div>
      <h1>Category: {label}</h1>
      {/* Render your data based on fetched data */}
    </div>
  );
}

export default SpecificCategoryPage;
