import { useState, useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom';
import './App.css'
import ArtInfo from '../Components/ArtInfo';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label, Legend, ResponsiveContainer } from 'recharts';

function App() {
  //const [list, setList] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  //const [cultures, setCultures] = useState(new Set());

  const testData = [
    {
        culture: "China",
        value: 50,
    },
    {
        culture: "Japan",
        value: 100,
    },
  ];

  const {list, cultures} = useOutletContext(); //getting these data values from Layout.jsx to save them so that when we go from the detailed view back to App.jsx the API calls don't need to be made again

  //const [cultureBreakdown, setCultureBreakdown] = useState([]);
  let chinaNum = 0;
  let japanNum = 0;
  let otherNum = 0;

  for(let i = 0; i < list.length; i++) {
    if(list[i].culture.toLowerCase() == "japan") {
        japanNum++;
    }
    else if(list[i].culture.toLowerCase() == "china") {
        chinaNum++;
    }
    else {
        otherNum++;
    }
  }

  const cultureData = [
    {
        culture: "China",
        value: chinaNum,
    },
    {
        culture: "Japan",
        value: japanNum,
    },
    {
        culture: "Other",
        value: otherNum,
    },
  ];
  //setCultureBreakdown(cultureData);

  let printNum = 0;
  let paintingNum = 0;
  let ceramicsNum = 0;
  let otherTypeNum = 0;
  for(let i = 0; i < list.length; i++) {
    if(list[i].type.toLowerCase() == "paintings") {
        paintingNum++;
    }
    else if(list[i].type.toLowerCase() == "prints") {
        printNum++;
    }
    else if(list[i].type.toLowerCase() == "ceramics") {
        ceramicsNum++;
    }
    else {
        otherTypeNum++;
    }
  }
  const typeData = [
    {
        type: "Prints",
        value: printNum,
    },
    {
        type: "Paintings",
        value: paintingNum,
    },
    {
        type: "Ceramics",
        value: ceramicsNum,
    },
    {
        type: "Other",
        value: otherTypeNum,
    },
  ];

  const searchItems = (inputString) => {
    setSearchQuery(inputString);
    if(inputString != "" || filter != "") {
        const filtered = list.filter((item) => 
            Object.values(item)
              .join("")
              .toLowerCase()
              .includes(inputString.toLowerCase())
            && item.culture.toLowerCase().includes(filter.toLowerCase())
        ); //converts the value into all one big lower case string and sees if searchValue is in it
        //if it's present in the string then it is included in filtered
        setFilteredResults(filtered);
    }
    else {
        setFilteredResults(list);
    }
  };

  const filterItems = (inputString) => {
    setFilter(inputString);
    if(inputString != "" || searchQuery != "") {
        const filtered = list.filter((item) => 
            item.culture.toLowerCase().includes(inputString.toLowerCase())
            && Object.values(item).join("").toLowerCase().includes(searchQuery.toLowerCase())
        ); //converts the value into all one big lower case string and sees if searchValue is in it
        //if it's present in the string then it is included in filtered
        setFilteredResults(filtered);
    }
    else {
        setFilteredResults(list);
    }
  };

  return (
    list.length > 50 ? (
        <div className='whole-page'>
            <h1>Asian Art in the Metropolitan Museum of Art</h1>
            <h3>Randomly generated selection of {list.length} works of art</h3>
            <ResponsiveContainer height={250}>
                <BarChart data={cultureData} width={600} height={350} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="culture" />
                    <YAxis label={{ value: '# of artworks', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8"/>
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer height={250}>
                <BarChart data={typeData} width={600} height={350} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis label={{ value: '# per type', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8"/>
                </BarChart>
            </ResponsiveContainer>
            <h3>Search by keyword:</h3>
            <input type='text' placeholder='Search...' onChange={(inputString) => searchItems(inputString.target.value)}></input>
            <h3>Filter by culture:</h3>
            <select onChange={(select) => filterItems(select.target.value)}>
                <option value="">All</option>
                {[...cultures].map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Medium</th>
                        <th>Culture</th>
                    </tr>
                </thead>
                <tbody>
                    {searchQuery.length > 0 || filter.length > 0 ? 
                        filteredResults.map((art, index) => (
                            <ArtInfo key={art.id} image={art.image} title={art.title} artist={art.artist} medium={art.medium} culture={art.culture} id={art.id}></ArtInfo>    
                            ))
                    : 
                        list ? list.map((art, index) => (
                            <ArtInfo key={art.id} image={art.image} title={art.title} artist={art.artist} medium={art.medium} culture={art.culture} id = {art.id}></ArtInfo>    
                            ))
                        : null
                    }  
                    
                </tbody>
            </table>
        </div>
    )
    :
        (<><h1>Art Incoming...</h1></>)
  )
}

export default App
