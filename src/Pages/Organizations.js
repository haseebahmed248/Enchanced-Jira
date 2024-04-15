import * as React from 'react';
import { useEffect, useState } from 'react';
import OrgCard from './Components/OrgCard';

const ORG_URI = "http://localhost:4000/organization/all";

export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetch(ORG_URI)
    .then(response => response.json())
    .then(data => setOrganizations(data))
    .catch(error => console.error(error));
  }, []);

  return (
    <OrgCard organizations={organizations}  />
  );

}