
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEnquiry } from "../services/enquiryApi";

function EnquiryDetails() {
  const { id } = useParams();

  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnquiry();
  }, [id]);

  const loadEnquiry = async () => {
    try {
      const data = await getEnquiry(id);
      setEnquiry(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="details-page">
        <div className="details-loading">
          <div className="loading-spinner"></div>
          <p>Loading enquiry...</p>
        </div>
      </div>
    );
  }

  if (!enquiry) {
    return (
      <div className="details-page">
        <div className="not-found-card">
          <div className="not-found-icon">!</div>
          <h2>Enquiry Not Found</h2>
          <p>
            The enquiry you're looking for doesn't exist
            or may have been deleted.
          </p>

          <Link to="/admin" className="back-button">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "NEW":
        return "status-new";

      case "IN_PROGRESS":
        return "status-progress";

      case "RESOLVED":
        return "status-resolved";

      case "CLOSED":
        return "status-closed";

      default:
        return "";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "NEW":
        return "New";

      case "IN_PROGRESS":
        return "In Progress";

      case "RESOLVED":
        return "Resolved";

      case "CLOSED":
        return "Closed";

      default:
        return status;
    }
  };

  return (
    <div className="details-page">

      {/* HEADER */}

      <div className="details-header">

        <div>
          <Link
            to="/admin"
            className="back-link"
          >
            ← Back to Dashboard
          </Link>

          <h1>Enquiry Details</h1>

          <p>
            View complete information about this enquiry.
          </p>
        </div>

        <div className="enquiry-id">
          Enquiry #{enquiry.id}
        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="details-grid">

        {/* LEFT COLUMN */}

        <div className="details-main">

          {/* CUSTOMER INFORMATION */}

          <div className="details-card">

            <div className="card-header">
              <div>
                <h2>Customer Information</h2>
                <p>Contact information provided by the customer</p>
              </div>
            </div>

            <div className="customer-grid">

              <div className="info-item">
                <span className="info-label">
                  Name
                </span>

                <span className="info-value">
                  {enquiry.name || "—"}
                </span>
              </div>


              <div className="info-item">
                <span className="info-label">
                  Email
                </span>

                <a
                  href={`mailto:${enquiry.email}`}
                  className="info-link"
                >
                  {enquiry.email || "—"}
                </a>
              </div>


              <div className="info-item">
                <span className="info-label">
                  Phone
                </span>

                <a
                  href={`tel:${enquiry.phone}`}
                  className="info-link"
                >
                  {enquiry.phone || "—"}
                </a>
              </div>


              <div className="info-item">
                <span className="info-label">
                  Submitted
                </span>

                <span className="info-value">
                  {new Date(
                    enquiry.createdAt
                  ).toLocaleString()}
                </span>
              </div>

            </div>

          </div>


          {/* ENQUIRY INFORMATION */}

          <div className="details-card">

            <div className="card-header">
              <div>
                <h2>Enquiry</h2>
                <p>Message submitted by the customer</p>
              </div>

              <span
                className={`status-badge ${getStatusClass(
                  enquiry.status
                )}`}
              >
                <span className="status-dot"></span>

                {getStatusLabel(enquiry.status)}
              </span>

            </div>


            <div className="subject-section">

              <span className="info-label">
                Subject
              </span>

              <h3>
                {enquiry.subject || "No subject"}
              </h3>

            </div>


            <div className="message-section">

              <span className="info-label">
                Message
              </span>

              <div className="message-box">
                {enquiry.message || "No message provided."}
              </div>

            </div>

          </div>

        </div>


        {/* RIGHT COLUMN */}

        <div className="details-sidebar">

          {/* STATUS CARD */}

          <div className="details-card status-card">

            <div className="card-header">
              <h2>Status</h2>
            </div>

            <div
              className={`large-status ${getStatusClass(
                enquiry.status
              )}`}
            >
              <span className="status-dot"></span>

              {getStatusLabel(enquiry.status)}
            </div>

            <p className="status-description">
              Current status of this enquiry.
            </p>

          </div>


          {/* QUICK ACTIONS */}

          <div className="details-card">

            <div className="card-header">
              <h2>Quick Actions</h2>
            </div>

            <div className="quick-actions">

              <a
                href={`mailto:${enquiry.email}`}
                className="action-button email-action"
              >
                ✉️ Send Email
              </a>

              {enquiry.phone && (
                <a
                  href={`tel:${enquiry.phone}`}
                  className="action-button call-action"
                >
                  📞 Call Customer
                </a>
              )}

              <Link
                to="/admin"
                className="action-button back-action"
              >
                ← Back to Enquiries
              </Link>

            </div>

          </div>


          {/* TIMELINE */}

          <div className="details-card">

            <div className="card-header">
              <h2>Activity</h2>
            </div>

            <div className="timeline">

              <div className="timeline-item">

                <div className="timeline-dot"></div>

                <div>
                  <strong>
                    Enquiry submitted
                  </strong>

                  <p>
                    {new Date(
                      enquiry.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EnquiryDetails;
