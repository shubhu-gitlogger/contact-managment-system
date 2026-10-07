import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
} from "../services/enquiryApi";

function AdminDashboard() {
  
  const [refreshing, setRefreshing] = useState(false);

  const [enquiries, setEnquiries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");


  useEffect(() => {

    loadEnquiries();

  }, []);


const loadEnquiries = async (isRefresh = false) => {
  try {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    const data = await getEnquiries();

    setEnquiries(data);
  } catch (error) {
    setError(error.message);
  } finally {
    if (isRefresh) {
      setRefreshing(false);
    } else {
      setLoading(false);
    }
  }
};


  const handleStatusChange = async (
    id,
    status
  ) => {

    try {

      const updated =
        await updateEnquiryStatus(
          id,
          status
        );

      setEnquiries((prev) =>
        prev.map((item) =>
          item.id === id
            ? updated
            : item
        )
      );

    } catch (error) {

      alert(error.message);
    }
  };


  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this enquiry?"
      );

    if (!confirmed) return;

    try {

      await deleteEnquiry(id);

      setEnquiries((prev) =>
        prev.filter(
          (item) => item.id !== id
        )
      );

    } catch (error) {

      alert(error.message);
    }
  };


  const filteredEnquiries =
    enquiries.filter((enquiry) => {

      const searchText =
        search.toLowerCase();

      const matchesSearch =
        enquiry.name
          ?.toLowerCase()
          .includes(searchText) ||

        enquiry.email
          ?.toLowerCase()
          .includes(searchText) ||

        enquiry.subject
          ?.toLowerCase()
          .includes(searchText);


      const matchesStatus =
        statusFilter === "ALL" ||
        enquiry.status === statusFilter;


      return (
        matchesSearch &&
        matchesStatus
      );
    });


  const total =
    enquiries.length;

  const newCount =
    enquiries.filter(
      (e) => e.status === "NEW"
    ).length;

  const inProgressCount =
    enquiries.filter(
      (e) =>
        e.status === "IN_PROGRESS"
    ).length;

  const resolvedCount =
    enquiries.filter(
      (e) =>
        e.status === "RESOLVED"
    ).length;


  if (loading) {

    return (
      <div>
        Loading enquiries...
      </div>
    );
  }


  return (

<div className="admin-dashboard">

  <div className="dashboard-header">
    <div>
      <h1>Enquiry Dashboard</h1>
      <p>Manage customer enquiries</p>
    </div>

    <button
      className="refresh-button"
      onClick={() => loadEnquiries(true)}
      disabled={refreshing}
    >
      {refreshing ? "↻ Refreshing..." : "↻ Refresh"}
    </button>
  </div>

      {error && (
        <p>{error}</p>
      )}


      {/* STATISTICS */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total</h3>
          <p>{total}</p>
        </div>

        <div className="stat-card">
          <h3>New</h3>
          <p>{newCount}</p>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{inProgressCount}</p>
        </div>

        <div className="stat-card">
          <h3>Resolved</h3>
          <p>{resolvedCount}</p>
        </div>

      </div>


      {/* FILTERS */}

      <div className="filters">

        <input
          type="text"
          placeholder="Search enquiries..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />


        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
        >

          <option value="ALL">
            All
          </option>

          <option value="NEW">
            New
          </option>

          <option value="IN_PROGRESS">
            In Progress
          </option>

          <option value="RESOLVED">
            Resolved
          </option>

          <option value="CLOSED">
            Closed
          </option>

        </select>

      </div>


      {/* TABLE */}

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Subject</th>

              <th>Status</th>

              <th>Date</th>

              <th>Action</th>

            </tr>

          </thead>


          <tbody>

            {filteredEnquiries.map(
              (enquiry) => (

                <tr key={enquiry.id}>

                  <td>
                    {enquiry.name}
                  </td>

                  <td>
                    {enquiry.email}
                  </td>

                  <td>
                    {enquiry.subject}
                  </td>

                  <td>

                    <select
                      value={enquiry.status}
                      onChange={(e) =>
                        handleStatusChange(
                          enquiry.id,
                          e.target.value
                        )
                      }
                    >

                      <option value="NEW">
                        New
                      </option>

                      <option value="IN_PROGRESS">
                        In Progress
                      </option>

                      <option value="RESOLVED">
                        Resolved
                      </option>

                      <option value="CLOSED">
                        Closed
                      </option>

                    </select>

                  </td>

                  <td>
                    {new Date(
                      enquiry.createdAt
                    ).toLocaleString()}
                  </td>

                 <td>
                  <Link
                    to={`/admin/enquiries/${enquiry.id}`}
                  >
                    View
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        enquiry.id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminDashboard;