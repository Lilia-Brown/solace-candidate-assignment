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
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
            {filteredAdvocates.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-500 py-4">
                  No advocates found.
                </td>
              </tr>
            ) : (
              filteredAdvocates.map((advocate) => (
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
      </div>
    </main>
  );
}
