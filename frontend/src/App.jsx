import React, { useState } from "react";

const reports = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Fortuna Yimer ${i + 1}`,
  date: "Jan 23, 2023",
  age: 23 + i,
  status: i % 2 === 0 ? "Found" : "Missing",
  img: `https://via.placeholder.com/200x200?text=Fortuna+Yimer+${i + 1}`,
}));

const Header = () => (
  <header className="bg-gray-900 text-white flex justify-between items-center p-4 shadow-md">
    <div className="flex items-center text-lg font-bold">
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">Q</div>
      Alajugn
    </div>
    <nav>
      <ul className="flex gap-4 flex-wrap">
        {["Home", "About Us", "Testimonial", "Report Missing", "Post Found", "Recent"].map((item) => (
          <li key={item}>
            <a href="#" className="hover:text-orange-500 transition-colors">{item}</a>
          </li>
        ))}
      </ul>
    </nav>
    <button className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 transition">Sign up</button>
  </header>
);

const Hero = () => (
  <section className="text-center py-10 bg-gradient-to-r from-blue-100 to-orange-100">
    <h1 className="text-4xl md:text-5xl font-bold animate-bounce">
      Search <span className="text-orange-500">Reports</span>
    </h1>
    <p className="mt-2 text-gray-700">Find missing or found reports instantly</p>
  </section>
);

const Toggle = ({ selected, setSelected }) => (
  <div className="text-center my-6">
    {["missing", "found"].map((status) => (
      <span
        key={status}
        onClick={() => setSelected(status)}
        className={`px-5 py-2 rounded-full cursor-pointer font-semibold transition-colors mx-2
          ${selected === status ? "bg-orange-500 text-white shadow-lg" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
        `}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    ))}
  </div>
);

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center gap-4 mb-6 flex-wrap">
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={filters.name}
        onChange={handleChange}
        className="border rounded px-3 py-1 transition focus:ring focus:ring-orange-300"
      />
      <input
        type="number"
        placeholder="Age"
        name="age"
        value={filters.age}
        onChange={handleChange}
        className="border rounded px-3 py-1 transition focus:ring focus:ring-orange-300"
      />
      <select
        name="gender"
        value={filters.gender}
        onChange={handleChange}
        className="border rounded px-3 py-1 transition focus:ring focus:ring-orange-300"
      >
        <option value="">Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <input
        type="text"
        placeholder="Location"
        name="location"
        value={filters.location}
        onChange={handleChange}
        className="border rounded px-3 py-1 transition focus:ring focus:ring-orange-300"
      />
    </div>
  );
};

const Card = ({ report }) => (
  <div className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
    <img src={report.img} alt={report.name} className="w-full h-48 object-cover" />
    <div className="p-4 text-center">
      <h3 className="text-lg font-semibold">{report.name}</h3>
      <p className="text-gray-500 text-sm">{report.date}</p>
      <p className="font-bold">{report.age}</p>
      <div
        className={`mt-1 font-bold ${
          report.status === "Found" ? "text-green-500" : "text-red-500"
        }`}
      >
        {report.status}
      </div>
      <button className="mt-3 bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition">
        Detail
      </button>
    </div>
  </div>
);

const Grid = ({ reports }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
    {reports.map((report) => (
      <Card key={report.id} report={report} />
    ))}
  </div>
);

const Footer = () => (
  <footer className="bg-blue-500 text-white text-center py-6 mt-10">
    <div className="flex justify-center items-center gap-4 flex-wrap">
      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-500 font-bold">
        Q
      </div>
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-500 font-bold">
          FB
        </div>
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-blue-500 font-bold">
          IG
        </div>
      </div>
    </div>
    <p className="mt-2">&copy; 2025 Alajugn. All rights reserved.</p>
  </footer>
);

export default function App() {
  const [selectedToggle, setSelectedToggle] = useState("found");
  const [filters, setFilters] = useState({ name: "", age: "", gender: "", location: "" });

  const filteredReports = reports
    .filter((r) => r.status.toLowerCase() === selectedToggle)
    .filter((r) =>
      r.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (!filters.age || r.age === Number(filters.age))
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <Hero />
      <Toggle selected={selectedToggle} setSelected={setSelectedToggle} />
      <Filters filters={filters} setFilters={setFilters} />
      <Grid reports={filteredReports} />
      <div className="text-center text-orange-500 mt-6 text-2xl">- . . -</div>
      <Footer />
    </div>
  );
}
