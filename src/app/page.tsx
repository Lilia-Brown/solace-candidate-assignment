"use client";

import { useEffect, useState } from "react";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
};

export default function Home() {
  const ROWS_PER_PAGE = 10;
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastRow = currentPage * ROWS_PER_PAGE;
  const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
  const currentRows = filteredAdvocates.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredAdvocates.length / ROWS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  useEffect(() => {
    const filteredAdvocates = advocates.filter((advocate) => {
      const withoutCaseIncludes = (source: string, search: string): boolean => {
        return source.toLowerCase().includes(search.toLowerCase());
      };

      return (
        withoutCaseIncludes(advocate.firstName, searchTerm) ||
        withoutCaseIncludes(advocate.lastName, searchTerm) ||
        withoutCaseIncludes(advocate.city, searchTerm) ||
        withoutCaseIncludes(advocate.degree, searchTerm) ||
        advocate.specialties.some((s) => withoutCaseIncludes(s, searchTerm)) ||
        withoutCaseIncludes(advocate.yearsOfExperience.toString(), searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
    setCurrentPage(1);
  }, [searchTerm, advocates]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onClick = () => {
    setSearchTerm("");
  };

  return (
    <main className="main">
      <h1 className="page-header">Solace Advocates</h1>
      <div className="search-box">
        <p className="search-header">Search</p>
        <p className="search-subheader">
          Searching for: <span>{searchTerm}</span>
        </p>
        <div className="search-box-controls">
          <input
            className="search-input"
            onChange={onChange}
            placeholder="Search advocates..."
            value={searchTerm} />
          <button
            className="search-reset-button"
            onClick={onClick}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="table-wrapper">
        <table className="advocates-table">
          <thead className="bg-primary text-white">
            <tr>
              <th className="table-header">First Name</th>
              <th className="table-header">Last Name</th>
              <th className="table-header">City</th>
              <th className="table-header">Degree</th>
              <th className="table-header">Specialties</th>
              <th className="table-header">Years of Experience</th>
              <th className="table-header">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-4">
                  No advocates found.
                </td>
              </tr>
            ) : (
              currentRows.map((advocate) => (
                <tr key={`${advocate.firstName}-${advocate.lastName}`} className="hover:bg-gray-100">
                  <td className="table-cell">{advocate.firstName}</td>
                  <td className="table-cell">{advocate.lastName}</td>
                  <td className="table-cell">{advocate.city}</td>
                  <td className="table-cell">{advocate.degree}</td>
                  <td className="table-cell">
                    {advocate.specialties.map((s) => (
                      <div key={s}>{s}</div>
                    ))}
                  </td>
                  <td className="table-cell">{advocate.yearsOfExperience}</td>
                  <td className="table-cell">{advocate.phoneNumber}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
          <button
            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
