import React, { useEffect } from "react";
import { embedDashboard } from "@superset-ui/embedded-sdk";
import { connect } from "react-redux";

async function fetchAccessToken(supersetUrl) {
  if (!supersetUrl) {
    console.error("Superset URL is missing or blank.");
    return null;
  }

  try {
    const body = {
      username: "token", 
      password: "token",
      provider: "db",
      refresh: true,
    };

    const url = `${supersetUrl}/api/v1/security/login`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch access token", response.statusText);
      return null;
    }

    const jsonResponse = await response.json();
    return jsonResponse?.access_token || null;
  } catch (e) {
    console.error("Error fetching access token:", e);
    return null;
  }
}

async function fetchGuestToken(dashboardId, supersetUrl) {
  if (!dashboardId || !supersetUrl) {
    console.error("Dashboard ID or Superset URL is missing.");
    return null;
  }

  const accessToken = await fetchAccessToken(supersetUrl);
  if (!accessToken) {
    console.error("Access token is missing.");
    return null;
  }

  

  try {
    const data = {
      user: {
        username: "guest",
        first_name: "guest",
        last_name: "guest",
      },
      resources: [
        {
          type: "dashboard",
          id: `${dashboardId}`,
        },
      ],
      rls: [],
    };


    const url = `${supersetUrl}/api/v1/security/guest_token/`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`      
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Failed to fetch guest token", response.statusText);
      return null;
    }

    const jsonResponse = await response.json();
    return jsonResponse?.token || null;
  } catch (error) {
    console.error("Error fetching guest token:", error);
    return null;
  }
}

const Component = (props) => {
  const {
    unique,
   // "data-selected-dashboard-id": selectedDashboardId = "",
    "data-apache-superset-url": apacheSupersetUrl = "",
  } = props;

  const selectedDashboardId = "a33a2445-1bd5-46e8-b752-76e2bb72e973";
  useEffect(() => {
    if (!apacheSupersetUrl) {
      console.error("Superset URL is blank in props.");
      return;
    }

    const embed = async () => {
      try {
        const guestToken = await fetchGuestToken(selectedDashboardId, apacheSupersetUrl);
        if (!guestToken) {
          console.error("Failed to fetch guest token.");
          return;
        }

        const embedDashboardResponse = await embedDashboard({
          id: selectedDashboardId, // given by the Superset embedding UI
          supersetDomain: apacheSupersetUrl,
          mountPoint: document.getElementById(`dashboard-${unique}`), // html element in which iframe renders
          fetchGuestToken: async () => guestToken,
          dashboardUiConfig: {
            hideTitle: true,
            hideChartControls: false,
            hideTab: false,
          },
        });

        //const iframe = findIframeAndSetId(embedDashboardResponse);
       // iframeResizer({ log: false }, `#${iframe.id}`);
      } catch (error) {
        console.error("Error embedding dashboard:", error);
      }
    };

    if (document.getElementById(`dashboard-${unique}`)) {
      embed();
    }
  }, [unique, selectedDashboardId, apacheSupersetUrl]);

  return <div id={`dashboard-${unique}`}></div>;
};

const mapStateToProps = (state, ownProps) => {
  return {};
};
const mapActionCreators = {};

export default connect(mapStateToProps, mapActionCreators)(Component);
