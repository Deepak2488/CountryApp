import "./styles.css";
import { useState, useEffect } from "react";
export default function App() {
  const [country, setCountry] = useState([
    { name: "None", Iso2: "No", Iso3: "NoN" }
  ]);
  const [selectCountry, setSelectCountry] = useState({
    name: "None",
    Iso2: "No",
    Iso3: "NoN"
  });

  const [state, setState] = useState([{ name: "None", state_code: "NO_NE" }]);
  const [name, setName] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    const gotCountry = country.filter((c) => c.name === e.target.value);
    //console.log(gotCountry);
    setSelectCountry(gotCountry[0]);
    fetch("https://countriesnow.space/api/v0.1/countries/states")
      .then((data) => {
        return data.json();
      })
      .then((allstate) => {
        //console.log(allstate);
        return allstate.data.filter((st) => st.name === e.target.value);
      })
      .then((state) => {
        console.log("state");
        //console.log(state);
        setState((prevState) => {
          console.log([...prevState, ...state[0].states]);
          return [...state[0].states];
        });
      });
  };

  const handleInput = (e) => {
    //console.log(e.target.value);
    setName(e.target.value);
  };
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/iso")
      .then((data) => {
        return data.json();
      })
      .then((countries) => {
        //console.log(countries.data);
        setCountry((prevState) => {
          //console.log([...prevState, ...countries.data]);
          return [...prevState, ...countries.data];
        });
      });
  }, []);
  return (
    <div className="App">
      <h1>Country Detail App</h1>
      <label>
        Select Country:
        <select value={selectCountry.name} onChange={handleChange}>
          {country.map((c) => {
            return (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            );
          })}
        </select>
      </label>
      <br />
      <label>
        Name:
        <input
          value={name}
          placeholder="Enter Name"
          onChange={handleInput}
        ></input>
      </label>
      <p>Country: {selectCountry.name}</p>
      <p>ISO Code: {selectCountry.Iso2}</p>
      <p>Name: {name}</p>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>State Name</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {state.map((st, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{st.name}</td>
              <td>{st.state_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
