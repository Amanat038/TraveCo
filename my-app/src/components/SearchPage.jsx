import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4600/search?query=${query}`);
       
       
        console.log("API Response:", response);
        setResults(response.data); // Axios automatically parses JSON
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  const handleBuyPackage = (resultId) => {
    if (!isAuthenticated) {
      alert("You need to log in to purchase a package.");
      navigate("/login");
    } else {
      navigate(`/packageinfo/${resultId}`);
    }
  };

  return (
    <div className="container h-auto px-4 py-10 mx-auto text-center">
      <h1 className="mb-6 text-3xl font-bold">
        Search Results for: <span className="text-teal-500">{query}</span>
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="md:text-center w-[40%] m-auto">
          {results.map((result) => (
            <div
              key={result._id}
              className="p-4 overflow-hidden bg-red-100 rounded-lg shadow-lg"
            >
              <img
                src={result.image || "default-image.jpg"}
                alt={result.title || "No title"}
                className="object-cover w-full h-48 rounded"
              />
              <h2 className="mt-4 text-xl font-bold text-teal-700 uppercase md:text-2xl">
                {result.title || "Untitled"}
              </h2>
              <p className="mt-1 text-lg">{result.description || "No description available."}</p>
              {/* <p className="mt-2 text-xl font-semibold">
                ${result.price || "N/A"}
              </p> */}
              <button
                onClick={() => handleBuyPackage(result._id)}
                className="w-full px-4 py-2 mt-4 text-white bg-teal-500 rounded hover:bg-teal-600"
              >
                View {result.title || "Details"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
