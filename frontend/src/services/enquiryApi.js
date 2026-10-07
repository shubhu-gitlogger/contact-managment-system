const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8080";


// ===============================
// AUTH HELPER
// ===============================

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};


// ===============================
// UNAUTHORIZED HANDLER
// ===============================

const handleUnauthorized = (response) => {
  if (
    response.status === 401 ||
    response.status === 403
  ) {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    localStorage.removeItem("adminRole");

    window.location.href = "/admin/login";

    return true;
  }

  return false;
};


// ===============================
// CREATE ENQUIRY
// PUBLIC
// ===============================

export async function submitEnquiry(data) {
  const response = await fetch(
    `${API_URL}/api/enquiries`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to submit enquiry"
    );
  }

  return result;
}


// ===============================
// GET ALL ENQUIRIES
// PROTECTED
// ===============================

export async function getEnquiries() {
  const response = await fetch(
    `${API_URL}/api/enquiries`,
    {
      method: "GET",

      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  if (handleUnauthorized(response)) {
    throw new Error("Unauthorized");
  }

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to fetch enquiries"
    );
  }

  return result;
}


// ===============================
// GET ONE ENQUIRY
// PROTECTED
// ===============================

export async function getEnquiry(id) {
  const response = await fetch(
    `${API_URL}/api/enquiries/${id}`,
    {
      method: "GET",

      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  if (handleUnauthorized(response)) {
    throw new Error("Unauthorized");
  }

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to fetch enquiry"
    );
  }

  return result;
}


// ===============================
// UPDATE STATUS
// PROTECTED
// ===============================

export async function updateEnquiryStatus(
  id,
  status
) {
  const response = await fetch(
    `${API_URL}/api/enquiries/${id}/status?status=${encodeURIComponent(status)}`,
    {
      method: "PUT",

      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  if (handleUnauthorized(response)) {
    throw new Error("Unauthorized");
  }

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to update status"
    );
  }

  return result;
}


// ===============================
// DELETE ENQUIRY
// PROTECTED
// ===============================

export async function deleteEnquiry(id) {
  const response = await fetch(
    `${API_URL}/api/enquiries/${id}`,
    {
      method: "DELETE",

      headers: {
        ...getAuthHeaders(),
      },
    }
  );

  if (handleUnauthorized(response)) {
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    let message =
      "Failed to delete enquiry";

    try {
      const result = await response.json();

      message =
        result.message || message;
    } catch {
      // DELETE may return empty response
    }

    throw new Error(message);
  }

  return true;
}