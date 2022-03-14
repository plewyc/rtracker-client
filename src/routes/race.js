import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/race.css";
import React from 'react';
import Navbar from "../components/navbar";
import ResultsHeader from "../components/ResultHeader.tsx";
import ResultsTable from "../components/ResultsTable/ResultsTable.tsx";

export default function Races() {
  const [race, setRace] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams()

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this race?")) {
      fetch(`${process.env.REACT_APP_HOST_URL}/races/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('rtracker-jwt-token')}`
        }
      })
      .then(() => navigate("/races"))
    }
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_HOST_URL}/races/${id}`)
    .then(res => res.json())
    .then(res => {
      setRace(res);
      console.log(res);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <div>
      { isLoading &&
      <div>Loading.. please wait!</div>
      }
      { !isLoading &&
        <div>
          <Navbar />
          <div className="container">
            <ResultsHeader race={race} />
            <ResultsTable drivers={race.drivers.sort((a, b) => a.race_pos > b.race_pos ? 1 : -1)} />
            <div style={{paddingTop: "1rem"}}>
              <div style={styles.deleteBtn} onClick={handleDelete}>Delete</div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

const styles = {
  container: {
    margin: "2% 10%",
  },
  deleteBtn: {
    padding: "0.3rem 0.6rem",
    background: "red",
    color: "white",
    display: "inline",
    borderRadius: "0.3rem"
  }
}